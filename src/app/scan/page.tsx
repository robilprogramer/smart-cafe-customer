"use client";

import { useRouter } from "next/navigation";
import { Camera, X, AlertCircle, CheckCircle, Smartphone } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import jsQR from "jsqr";

const ScanPage = () => {
  const router = useRouter();
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string>("");
  const [scannedData, setScannedData] = useState<string>("");
  const [cameraReady, setCameraReady] = useState(false);
  const [debugInfo, setDebugInfo] = useState<string>("");
  const [isMounted, setIsMounted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationId = useRef<number | null>(null);
  const isScanningRef = useRef(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleQRDetected = useCallback(
    (data: string) => {
      console.log("QR Detected:", data);
      setScannedData(data);

      if ("vibrate" in navigator) {
        navigator.vibrate(200);
      }

      isScanningRef.current = false;

      setTimeout(() => {
        stopCamera();
        // if (data.startsWith('MEJA-') || data.startsWith('TABLE-')) {
        //   router.push(`/menu?table=${data}`);
        // } else if (data.startsWith('http')) {
        //   window.location.href = data;
        // } else {
        //   alert(`QR Code: ${data}`);
        // }
        const parsed = JSON.parse(data);

        if (
          parsed.id &&
          (parsed.id.startsWith("meja_") || parsed.id.startsWith("table_"))
        ) {
          router.push(`/menu?table=${parsed.id}`);
        }
      }, 1500);
    },
    [router]
  );

  const scanQRCode = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas || !isScanningRef.current) {
      return;
    }

    try {
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        if (
          canvas.width !== video.videoWidth ||
          canvas.height !== video.videoHeight
        ) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
        }

        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const code = jsQR(imageData.data, imageData.width, imageData.height, {
            inversionAttempts: "dontInvert",
          });

          if (code) {
            console.log("QR Code found!", code.data);

            const loc = code.location;
            ctx.strokeStyle = "#10B981";
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.moveTo(loc.topLeftCorner.x, loc.topLeftCorner.y);
            ctx.lineTo(loc.topRightCorner.x, loc.topRightCorner.y);
            ctx.lineTo(loc.bottomRightCorner.x, loc.bottomRightCorner.y);
            ctx.lineTo(loc.bottomLeftCorner.x, loc.bottomLeftCorner.y);
            ctx.closePath();
            ctx.stroke();

            handleQRDetected(code.data);
            return;
          }
        }
      }
    } catch (err) {
      console.error("Scan error:", err);
    }

    animationId.current = requestAnimationFrame(scanQRCode);
  }, [handleQRDetected]);

  const stopCamera = useCallback(() => {
    console.log("Stopping camera...");
    isScanningRef.current = false;

    if (animationId.current) {
      cancelAnimationFrame(animationId.current);
      animationId.current = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        track.stop();
        console.log("Track stopped:", track.label);
      });
      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
      videoRef.current.pause();
    }

    setIsScanning(false);
    setCameraReady(false);
  }, []);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

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
          setError("Kamera memerlukan HTTPS! Gunakan HTTPS atau localhost.");
          return;
        }
      }

      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setError("Browser tidak mendukung akses kamera.");
        return;
      }

      setIsScanning(true);
      isScanningRef.current = true;
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
        console.log("Camera accessed with rear camera");
      } catch (err) {
        console.log("Trying fallback camera...");
        setDebugInfo("Mencoba kamera alternatif...");
        constraints = { video: true, audio: false };
        stream = await navigator.mediaDevices.getUserMedia(constraints);
      }

      setDebugInfo("Kamera berhasil diakses!");
      streamRef.current = stream;

      if (!videoRef.current) {
        setError("Video element tidak ditemukan.");
        return;
      }

      videoRef.current.srcObject = stream;

      videoRef.current.onloadedmetadata = async () => {
        console.log("Video metadata loaded");
        setDebugInfo("Video siap...");

        if (videoRef.current) {
          try {
            await videoRef.current.play();
            console.log("Video playing!");
            setDebugInfo("Video playing!");
            setCameraReady(true);

            setTimeout(() => {
              if (isScanningRef.current) {
                animationId.current = requestAnimationFrame(scanQRCode);
              }
            }, 100);
          } catch (playErr) {
            console.error("Play error:", playErr);
            setDebugInfo('Klik tombol "Putar Video" untuk memulai');
          }
        }
      };
    } catch (err) {
      console.error("Camera error:", err);
      isScanningRef.current = false;
      const error = err as Error & { name?: string };
      let errorMessage = "";

      if (
        error.name === "NotAllowedError" ||
        error.name === "PermissionDeniedError"
      ) {
        errorMessage =
          "Izin kamera ditolak! Aktifkan izin kamera di pengaturan browser.";
      } else if (error.name === "NotFoundError") {
        errorMessage = "Kamera tidak ditemukan.";
      } else if (error.name === "NotReadableError") {
        errorMessage = "Kamera sedang digunakan aplikasi lain.";
      } else {
        errorMessage = `Error: ${
          error.message || "Tidak dapat mengakses kamera"
        }`;
      }

      setError(errorMessage);
      setIsScanning(false);
    }
  };

  const handleCancel = () => {
    stopCamera();
    setError("");
    setScannedData("");
    setDebugInfo("");
  };

  const handleManualPlay = async () => {
    if (videoRef.current) {
      try {
        await videoRef.current.play();
        setCameraReady(true);
        setDebugInfo("Manual play successful!");

        setTimeout(() => {
          if (isScanningRef.current) {
            animationId.current = requestAnimationFrame(scanQRCode);
          }
        }, 100);
      } catch (err) {
        console.error("Manual play error:", err);
        setError("Gagal memutar video.");
      }
    }
  };

  if (!isMounted) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-emerald-400 via-green-500 to-teal-400">
        <div className="text-center">
          <Camera className="w-16 h-16 text-white mx-auto mb-4" />
          <p className="text-white font-semibold">Memuat...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-emerald-400 via-green-500 to-teal-400 px-4 py-8">
      {!isScanning ? (
        <div className="flex flex-col items-center max-w-md w-full">
          <div className="mb-8 p-8 bg-white rounded-full shadow-xl">
            <Camera className="w-16 h-16 text-emerald-600" />
          </div>

          <h1 className="text-3xl font-bold mb-3 text-white text-center">
            Scan QR Meja
          </h1>
          <p className="text-emerald-100 mb-8 text-center">
            Arahkan kamera ke QR code untuk melihat menu
          </p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl w-full">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <p className="text-sm text-red-800 font-medium">{error}</p>
              </div>
            </div>
          )}

          <div className="mb-6 p-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl w-full">
            <div className="flex items-start gap-3">
              <Smartphone className="w-5 h-5 text-white flex-shrink-0" />
              <div className="text-sm text-white">
                <p className="font-semibold mb-1">Pastikan:</p>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Menggunakan HTTPS atau localhost</li>
                  <li>Izin kamera sudah diaktifkan</li>
                  <li>Cahaya cukup terang</li>
                  <li>QR code tidak terlalu jauh/dekat</li>
                </ul>
              </div>
            </div>
          </div>

          <button
            onClick={startScanning}
            className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-white text-emerald-600 font-bold shadow-lg transition-all hover:shadow-xl hover:scale-105 active:scale-95 w-full justify-center"
          >
            <Camera className="w-6 h-6" />
            Mulai Scan
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center w-full max-w-md">
          <div className="relative w-full aspect-square mb-6 rounded-3xl overflow-hidden shadow-2xl bg-gray-900">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              autoPlay
              playsInline
              muted
            />

            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ opacity: 0 }}
            />

            {!cameraReady && streamRef.current && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm z-10">
                <div className="text-center text-white mb-6">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                  <p className="text-sm mb-2">{debugInfo}</p>
                  <p className="text-xs text-gray-300">
                    Jika video tidak muncul, klik tombol di bawah
                  </p>
                </div>

                <button
                  onClick={handleManualPlay}
                  className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full font-semibold transition shadow-lg"
                >
                  Putar Video
                </button>
              </div>
            )}

            {cameraReady && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="relative w-48 h-48">
                  <div className="absolute inset-0 border-2 border-emerald-400/50 rounded-lg"></div>
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white"></div>
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-white"></div>
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-white"></div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white"></div>
                </div>
              </div>
            )}

            <button
              onClick={handleCancel}
              className="absolute top-4 right-4 p-3 bg-red-500/90 rounded-full text-white hover:bg-red-600 transition z-30 shadow-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {scannedData ? (
            <div className="text-center">
              <div className="mb-4 p-5 bg-white rounded-2xl flex items-center gap-3 justify-center shadow-xl">
                <CheckCircle className="w-8 h-8 text-emerald-600" />
                <div className="text-left">
                  <p className="text-gray-800 font-bold text-lg">Berhasil!</p>
                  <p className="text-gray-600 text-sm break-all">
                    {scannedData}
                  </p>
                </div>
              </div>
              <p className="text-white animate-pulse font-medium">
                Mengalihkan...
              </p>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-xl font-bold text-white mb-2">
                {cameraReady ? "Arahkan ke QR Code" : "Memuat Kamera..."}
              </p>
              <p className="text-emerald-100 text-sm">
                {cameraReady ? "Deteksi otomatis saat QR terlihat" : debugInfo}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ScanPage;
