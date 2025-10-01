"use client";

import { useRouter } from "next/navigation";
import { Camera, X, AlertCircle, CheckCircle, Smartphone } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { BrowserMultiFormatReader, VideoInputDevice } from "@zxing/browser";
import { NotFoundException } from "@zxing/library";

const ScanPage = () => {
  const router = useRouter();
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string>("");
  const [scannedData, setScannedData] = useState<string>("");
  const [cameraReady, setCameraReady] = useState(false);
  const [debugInfo, setDebugInfo] = useState<string>("");
  const [isMounted, setIsMounted] = useState(false);
  const [protocol, setProtocol] = useState<string>("");

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // REF UNTUK MENYIMPAN INSTANCE Zxing Reader (Gunakan BrowserMultiFormatReader)
  const codeReaderRef = useRef<BrowserMultiFormatReader | null>(null);
  // controlsRef DIHAPUS karena tidak lagi diekspor dan tidak diperlukan di promise API

  // Handle hydration - set mounted state
  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== "undefined") {
      setProtocol(window.location.protocol);
    }
  }, []);

  // Cleanup function untuk stop kamera DAN scanner Zxing
  const stopCamera = () => {
    // Stop Zxing scanner (PENTING untuk menghentikan proses decoding)
    if (codeReaderRef.current) {
      // Menggunakan reset() untuk menghentikan internal controls Zxing
      codeReaderRef.current.reset();
      codeReaderRef.current = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        track.stop();
      });
      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
      videoRef.current.pause();
    }

    setIsScanning(false);
    setCameraReady(false);
  };

  // Cleanup saat component unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  // Handler ketika QR code terdeteksi (DIPANGGIL OLEH Zxing)
  const handleQRDetected = (data: string) => {
    console.log("QR Detected:", data);

    if (scannedData) return;

    setScannedData(data);

    if ("vibrate" in navigator) {
      navigator.vibrate(200);
    }

    setTimeout(() => {
      stopCamera();
      router.push(`/menu?table=${data}`);
    }, 1500);
  };

  const startZxingDetection = async (videoElement: HTMLVideoElement) => {
  const reader = new BrowserMultiFormatReader();
  const devices: VideoInputDevice[] =
    await BrowserMultiFormatReader.listVideoInputDevices();

  const backCamera = devices.find((d) =>
    d.label.toLowerCase().includes("back")
  );
  const selectedId = backCamera?.deviceId || devices[0].deviceId;

  reader.decodeFromVideoDevice(
    selectedId,
    videoElement,
    (result, err) => {
      if (result) {
        console.log("Barcode:", result.getText());
      }
      if (err && !(err instanceof NotFoundException)) {
        console.error("Error:", err.message);
      }
    }
  );
};


  // Function untuk start scanning (diperbarui untuk memanggil Zxing)
  const startScanning = async () => {
    setError("");
    setScannedData("");
    setDebugInfo("Memulai...");

    try {
      if (typeof window !== "undefined") {
        const isSecure = window.location.protocol === "https:";
        const isLocalhost =
          window.location.hostname === "localhost" ||
          window.location.hostname === "127.0.0.1";

        if (!isSecure && !isLocalhost) {
          setError(
            "⚠️ Kamera memerlukan HTTPS! Saat ini menggunakan HTTP. Gunakan HTTPS atau localhost untuk akses kamera."
          );
          return;
        }
      }

      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setError(
          "Browser Anda tidak mendukung akses kamera. Gunakan browser modern seperti Chrome, Firefox, atau Safari."
        );
        return;
      }

      setIsScanning(true);
      setDebugInfo("Rendering video element...");

      await new Promise((resolve) => setTimeout(resolve, 100));

      setDebugInfo("Meminta izin kamera...");

      let constraints: MediaStreamConstraints = {
        video: {
          facingMode: "environment",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      };

      let stream: MediaStream;

      try {
        stream = await navigator.mediaDevices.getUserMedia(constraints);
      } catch (err) {
        setDebugInfo("Mencoba dengan setting kamera alternatif...");
        constraints = {
          video: true,
          audio: false,
        };
        stream = await navigator.mediaDevices.getUserMedia(constraints);
      }

      setDebugInfo("Kamera berhasil diakses!");
      streamRef.current = stream;

      await new Promise((resolve) => setTimeout(resolve, 100));

      const videoElement = videoRef.current;

      if (!videoElement) {
        setError("Video element tidak ditemukan. Coba refresh halaman.");
        setDebugInfo("ERROR: Video ref is null!");
        return;
      }

      setDebugInfo("Menghubungkan stream ke video...");

      videoElement.srcObject = stream;

      // Setup event listeners SEBELUM play
      const handleVideoReady = async () => {
        // Hanya panggil startZxingDetection sekali setelah ready
        if (!cameraReady) {
          setCameraReady(true);
          startZxingDetection(videoElement); // MULAI Zxing DETECTION
          setDebugInfo("Video playing and Zxing started!");
        }
      };

      videoElement.onloadedmetadata = async () => {
        setDebugInfo("Video metadata loaded");
        if (videoElement.readyState >= 2) {
          try {
            await videoElement.play();
            handleVideoReady();
          } catch (playErr) {
            setTimeout(async () => {
              if (videoElement) {
                try {
                  await videoElement.play();
                  handleVideoReady();
                } catch (e) {
                  setError(
                    "Tidak dapat memutar video. Coba tap layar atau refresh halaman."
                  );
                  setDebugInfo("Play failed after retry");
                }
              }
            }, 500);
          }
        }
      };

      videoElement.oncanplay = handleVideoReady;
      videoElement.onplay = handleVideoReady;
      videoElement.onerror = (e) => {
        console.error("Video error:", e);
        setError("Error pada video stream");
        setDebugInfo("Video error event");
      };

      // Manual trigger play jika autoplay gagal
      try {
        await videoElement.play();
        setDebugInfo("Manual play successful");
      } catch (playErr) {
        setDebugInfo("Waiting for user interaction...");
      }
    } catch (err) {
      console.error("Camera error:", err);

      const error = err as Error & { name?: string };
      let errorMessage = "";

      if (
        error.name === "NotAllowedError" ||
        error.name === "PermissionDeniedError"
      ) {
        errorMessage =
          '❌ Izin kamera ditolak!\n\nCara mengaktifkan:\n\n📱 HP:\n1. Buka Settings browser\n2. Cari "Site settings" atau "Izin"\n3. Aktifkan Camera untuk situs ini\n\n💻 Laptop:\n1. Klik ikon kunci/info di address bar\n2. Aktifkan Camera permission\n3. Refresh halaman';
      } else if (
        error.name === "NotFoundError" ||
        error.name === "DevicesNotFoundError"
      ) {
        errorMessage = "Kamera tidak ditemukan di perangkat Anda.";
      } else if (
        error.name === "NotReadableError" ||
        error.name === "TrackStartError"
      ) {
        errorMessage =
          "Kamera sedang digunakan oleh aplikasi lain. Tutup aplikasi tersebut dan coba lagi.";
      } else if (error.name === "OverconstrainedError") {
        errorMessage =
          "Kamera tidak mendukung resolusi yang diminta. Mencoba dengan setting lain...";
      } else {
        errorMessage = `Error: ${
          error.message || "Tidak dapat mengakses kamera"
        }`;
      }

      setError(errorMessage);
      setDebugInfo(`Error: ${error.name || "Unknown"}`);
    }
  };

  // Simulasi scan barcode (untuk testing Zxing)
  const simulateScan = () => {
    if (scannedData) return;
    const mockTableNumber =
      "TABLE-" +
      Math.floor(Math.random() * 100)
        .toString()
        .padStart(3, "0");
    handleQRDetected(mockTableNumber);
  };

  // Handler untuk cancel scanning
  const handleCancel = () => {
    stopCamera();
    setError("");
    setScannedData("");
    setDebugInfo("");
  };

  // Manual play untuk fallback jika autoplay tidak jalan
  const handleManualPlay = async () => {
    const videoElement = videoRef.current;
    if (videoElement) {
      try {
        await videoElement.play();
        setDebugInfo("Manual play by user successful!");
      } catch (err) {
        console.error("Manual play failed:", err);
        setError("Gagal memutar video. Coba refresh halaman.");
      }
    }
  };

  // Prevent hydration mismatch - don't render protocol until mounted
  if (!isMounted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4 py-8">
        <div className="flex flex-col items-center max-w-md w-full">
          <div className="mb-8 p-8 bg-white rounded-full shadow-xl">
            <Camera className="w-16 h-16 text-blue-600" strokeWidth={1.5} />
          </div>
          <h1 className="text-3xl font-bold mb-3 text-gray-800 text-center">
            Scan Barcode Meja
          </h1>
          <p className="text-gray-600 mb-8 text-center leading-relaxed">
            Memuat...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4 py-8">
      {!isScanning ? (
        // Initial State
        <div className="flex flex-col items-center max-w-md w-full">
          <div className="mb-8 p-8 bg-white rounded-full shadow-xl">
            <Camera className="w-16 h-16 text-blue-600" strokeWidth={1.5} />
          </div>

          <h1 className="text-3xl font-bold mb-3 text-gray-800 text-center">
            Scan Barcode Meja
          </h1>
          <p className="text-gray-600 mb-8 text-center leading-relaxed">
            Arahkan kamera ke barcode pada meja untuk memulai pemesanan
          </p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl w-full">
              <div className="flex items-start gap-3 mb-2">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-red-800 whitespace-pre-line font-medium">
                    {error}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Info Box */}
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl w-full">
            <div className="flex items-start gap-3">
              <Smartphone className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-semibold mb-1">Pastikan:</p>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Menggunakan HTTPS atau localhost</li>
                  <li>Izin kamera sudah diaktifkan</li>
                  <li>Kamera tidak dipakai aplikasi lain</li>
                </ul>
              </div>
            </div>
          </div>

          {debugInfo && (
            <div className="mb-4 p-3 bg-gray-100 rounded-lg w-full">
              <p className="text-xs text-gray-600 font-mono">{debugInfo}</p>
            </div>
          )}

          <button
            onClick={startScanning}
            className="group relative flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 active:scale-95 w-full justify-center"
          >
            <Camera className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
            Buka Kamera
            <div className="absolute inset-0 rounded-2xl bg-white opacity-0 group-hover:opacity-10 transition duration-300"></div>
          </button>

          {protocol && (
            <p className="mt-4 text-xs text-gray-500 text-center">
              Protocol: {protocol}
            </p>
          )}
        </div>
      ) : (
        // Scanning State
        <div className="flex flex-col items-center w-full max-w-2xl">
          <div className="relative w-full aspect-square max-w-md mb-6 rounded-3xl overflow-hidden shadow-2xl bg-gray-900">
            {/* Debug Video State */}
            <div className="absolute top-4 left-4 right-4 z-20 p-3 bg-black/80 rounded-lg text-white text-xs font-mono">
              <div>Status: {debugInfo}</div>
              <div>Ready: {cameraReady ? "✅ Yes" : "❌ No"}</div>
              <div>Stream: {streamRef.current ? "✅ Active" : "❌ None"}</div>
              <div>
                Zxing: {codeReaderRef.current ? "✅ Active" : "❌ Init"}
              </div>
            </div>

            {/* Video Stream */}
            <video
              ref={videoRef}
              className="w-full h-full object-cover scale-x-[-1]"
              autoPlay
              playsInline
              muted
              controls={false}
            />

            {/* Loading Overlay + Manual Play Button */}
            {!cameraReady && streamRef.current && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm z-10">
                <div className="text-center text-white mb-6">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                  <p className="text-sm mb-2">
                    {debugInfo || "Memuat kamera..."}
                  </p>
                  <p className="text-xs text-gray-300">
                    Jika video tidak muncul, klik tombol di bawah
                  </p>
                </div>

                {/* Manual Play Button - jika autoplay gagal */}
                <button
                  onClick={handleManualPlay}
                  className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full font-semibold transition shadow-lg"
                >
                  ▶️ Putar Video
                </button>
              </div>
            )}

            {/* Scanning Overlay */}
            {cameraReady && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-5">
                <div className="relative w-64 h-64">
                  <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-green-500 rounded-tl-2xl"></div>
                  <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-green-500 rounded-tr-2xl"></div>
                  <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-green-500 rounded-bl-2xl"></div>
                  <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-green-500 rounded-br-2xl"></div>

                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent animate-scan"></div>
                  </div>
                </div>
              </div>
            )}

            {/* Close Button */}
            <button
              onClick={handleCancel}
              className="absolute top-4 right-4 p-3 bg-red-500/90 backdrop-blur-sm rounded-full text-white hover:bg-red-600 transition z-30 shadow-lg"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Test Button */}
            {cameraReady && !scannedData && (
              <button
                onClick={simulateScan}
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-3 bg-green-500 text-white text-sm font-semibold rounded-full hover:bg-green-600 transition z-30 shadow-lg"
              >
                🧪 Test Scan (Simulasi)
              </button>
            )}
          </div>

          {scannedData ? (
            <div className="text-center animate-fade-in">
              <div className="mb-4 p-5 bg-green-50 border-2 border-green-300 rounded-2xl flex items-center gap-3 justify-center">
                <CheckCircle className="w-8 h-8 text-green-600" />
                <div className="text-left">
                  <p className="text-green-800 font-bold text-lg">Berhasil!</p>
                  <p className="text-green-700 text-sm">{scannedData}</p>
                </div>
              </div>
              <p className="text-gray-600 animate-pulse font-medium">
                Membuka menu...
              </p>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-xl font-bold text-gray-800 mb-2">
                {cameraReady ? "📷 Arahkan ke Barcode" : "⏳ Memuat Kamera..."}
              </p>
              <p className="text-gray-600 text-sm mb-4">
                {cameraReady
                  ? "Deteksi otomatis saat barcode terlihat"
                  : debugInfo}
              </p>
              {cameraReady && (
                <div className="flex items-center justify-center gap-2 text-xs text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="font-semibold">Kamera Aktif</span>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <style jsx>{`
        @keyframes scan {
          0%,
          100% {
            top: 0;
          }
          50% {
            top: 100%;
          }
        }
        .animate-scan {
          animation: scan 2s ease-in-out infinite;
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ScanPage;
