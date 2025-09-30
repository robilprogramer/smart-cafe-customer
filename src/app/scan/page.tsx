'use client';

import { useState, useRef, useEffect } from 'react';
import {
  Camera,
  QrCode,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Loader,
  Coffee,
} from 'lucide-react';

export default function CafeQRScanner() {
  const [scanning, setScanning] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [error, setError] = useState<string>('');
  const [stream, setStream] = useState<MediaStream | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        0%, 100% { transform: translateY(0) translateX(0); }
        25% { transform: translateY(-30px) translateX(15px); }
        50% { transform: translateY(-15px) translateX(-15px); }
        75% { transform: translateY(-25px) translateX(10px); }
      }
      @keyframes float-slow {
        0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); }
        33% { transform: translateY(-40px) translateX(20px) rotate(15deg); }
        66% { transform: translateY(-20px) translateX(-20px) rotate(-15deg); }
      }
      @keyframes wave {
        0%, 100% { transform: translateX(0); }
        50% { transform: translateX(100%); }
      }
      @keyframes pulse-ring {
        0% { transform: scale(0.95); opacity: 1; }
        50% { transform: scale(1.05); opacity: 0.7; }
        100% { transform: scale(0.95); opacity: 1; }
      }
      @keyframes shimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }
      @keyframes bounce-slow {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-20px); }
      }
      @keyframes scan-line {
        0% { top: 0%; }
        50% { top: 100%; }
        100% { top: 0%; }
      }
      .animate-float { animation: float ease-in-out infinite; }
      .animate-float-slow { animation: float-slow ease-in-out infinite; }
      .animate-wave { animation: wave 3s ease-in-out infinite; }
      .animate-pulse-ring { animation: pulse-ring 2s ease-in-out infinite; }
      .animate-shimmer { 
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
        background-size: 200% 100%;
        animation: shimmer 2s infinite;
      }
      .animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }
      .animate-scan-line { animation: scan-line 2s ease-in-out infinite; }
    `;
    document.head.appendChild(style);

    return () => {
      stopScanning();
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  const startScanning = async () => {
    try {
      setError('');
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment',
          width: { ideal: 640 },
          height: { ideal: 480 },
        },
      });

      setStream(mediaStream);
      setHasPermission(true);
      setScanning(true);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.setAttribute('playsinline', 'true');
        videoRef.current.setAttribute('autoplay', 'true');
        videoRef.current.setAttribute('muted', 'true');

        videoRef.current.onloadedmetadata = async () => {
          try {
            await videoRef.current?.play();
            animationFrameRef.current = requestAnimationFrame(tick);
          } catch (playErr) {
            console.error('Play error:', playErr);
          }
        };

        setTimeout(async () => {
          try {
            await videoRef.current?.play();
          } catch (e) {
            console.log('Delayed play attempt:', e);
          }
        }, 100);
      }
    } catch (err: any) {
      console.error('Camera error:', err);
      setHasPermission(false);
      if (err.name === 'NotAllowedError') {
        setError(
          'Izin kamera ditolak. Mohon izinkan akses kamera di pengaturan browser Anda.'
        );
      } else if (err.name === 'NotFoundError') {
        setError('Kamera tidak ditemukan. Pastikan perangkat Anda memiliki kamera.');
      } else {
        setError('Gagal mengakses kamera: ' + err.message);
      }
    }
  };

  const tick = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (video && canvas && video.readyState === HTMLMediaElement.HAVE_ENOUGH_DATA) {
      canvas.height = video.videoHeight;
      canvas.width = video.videoWidth;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        // Real implementation would use jsQR library here
      }

      if (scanning) {
        animationFrameRef.current = requestAnimationFrame(tick);
      }
    } else {
      if (scanning) {
        animationFrameRef.current = requestAnimationFrame(tick);
      }
    }
  };

  const stopScanning = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setScanning(false);
  };

  const handleScanSuccess = (tableNumber: string) => {
    setScannedData(tableNumber);
    stopScanning();

    setTimeout(() => {
      window.location.href = `/menu?table=${tableNumber}`;
    }, 1500);
  };

  const simulateScan = () => {
    const tableNumber = 'MEJA-05';
    handleScanSuccess(tableNumber);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-200 via-green-300 to-teal-300 flex items-center justify-center p-3 sm:p-4 md:p-6 relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-72 h-72 bg-emerald-300/40 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-green-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-teal-200/35 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-emerald-100/25 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-green-100/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(25)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute rounded-full animate-float"
            style={{
              width: `${4 + Math.random() * 8}px`,
              height: `${4 + Math.random() * 8}px`,
              background: `rgba(255, 255, 255, ${0.3 + Math.random() * 0.4})`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 6}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Coffee Icons Floating */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <Coffee
            key={`coffee-${i}`}
            className="absolute text-white/25 animate-float-slow"
            style={{
              left: `${(i * 12) % 100}%`,
              top: `${(i * 15) % 100}%`,
              width: `${20 + Math.random() * 20}px`,
              height: `${20 + Math.random() * 20}px`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${7 + Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Sparkles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <Sparkles
            key={`sparkle-${i}`}
            className="absolute text-yellow-200/40 animate-bounce-slow"
            style={{
              left: `${10 + (i * 10) % 80}%`,
              top: `${10 + (i * 13) % 80}%`,
              width: `${15 + Math.random() * 15}px`,
              height: `${15 + Math.random() * 15}px`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Animated Waves */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-emerald-400/30 to-transparent animate-wave"></div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-green-300/30 to-transparent animate-wave" style={{ animationDelay: '1s' }}></div>
      </div>
      
      {/* Watermark Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-emerald-400/8 font-bold select-none whitespace-nowrap"
            style={{
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              transform: `rotate(-45deg) translateX(-50%)`,
              left: `${(i % 4) * 30}%`,
              top: `${Math.floor(i / 4) * 20}%`,
            }}
          >
            Madani Cafe
          </div>
        ))}
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.3) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255, 255, 255, 0.3) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}></div>
      </div>
      
      <div className="max-w-md w-full mx-auto relative z-10">
        {/* Card Utama */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden transform transition-all hover:scale-105 hover:shadow-[0_20px_60px_rgba(16,185,129,0.3)]">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-400 to-green-500 p-4 sm:p-6 md:p-8 text-white text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
            <div className="absolute inset-0 animate-shimmer"></div>
            
            <div className="relative z-10">
              <div className="relative inline-block">
                <QrCode className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 animate-bounce relative z-10" />
                <div className="absolute inset-0 bg-white/20 rounded-lg blur-xl animate-pulse-ring"></div>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold mb-2 relative z-10 drop-shadow-lg">Scan QR Meja</h1>
              <p className="text-emerald-50 text-sm sm:text-base relative z-10">Scan kode QR di meja untuk melihat menu</p>
            </div>
          </div>

          {/* Konten */}
          <div className="p-4 sm:p-6 md:p-8">
            {!scanning && !scannedData && (
              <div className="space-y-3 sm:space-y-4">
                <button
                  onClick={startScanning}
                  className="w-full bg-gradient-to-r from-emerald-400 to-green-500 text-white py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg flex items-center justify-center gap-2 sm:gap-3 hover:from-emerald-500 hover:to-green-600 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl hover:shadow-emerald-300/50 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  <Camera className="w-5 h-5 sm:w-6 sm:h-6 relative z-10" />
                  <span className="relative z-10">Mulai Scan</span>
                </button>
                
                <button
                  onClick={simulateScan}
                  className="w-full bg-emerald-50 text-emerald-700 py-2.5 sm:py-3 rounded-xl font-semibold text-sm sm:text-base hover:bg-emerald-100 transition-all transform hover:scale-105 border-2 border-emerald-200 hover:border-emerald-300"
                >
                  Demo Scan (Meja 05)
                </button>

                <div className="text-center text-gray-500 text-xs sm:text-sm mt-4 sm:mt-6 flex items-center justify-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-500 animate-pulse" />
                  Arahkan kamera ke QR code di meja Anda
                </div>
              </div>
            )}

            {scanning && (
              <div className="space-y-3 sm:space-y-4">
                {/* Video Preview */}
                <div className="relative bg-black rounded-xl overflow-hidden aspect-square shadow-2xl">
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    playsInline
                    autoPlay
                    muted
                  />
                  
                  {/* Overlay dengan border animasi */}
                  <div className="absolute inset-0 border-2 sm:border-4 border-emerald-400 animate-pulse pointer-events-none" />
                  
                  {/* Target scan box */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="relative w-36 h-36 sm:w-48 sm:h-48">
                      <div className="absolute inset-0 border-2 sm:border-4 border-emerald-400 rounded-lg animate-pulse-ring"></div>
                      {/* Corner decorations */}
                      <div className="absolute top-0 left-0 w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-l-2 sm:border-t-4 sm:border-l-4 border-white rounded-tl-lg"></div>
                      <div className="absolute top-0 right-0 w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-r-2 sm:border-t-4 sm:border-r-4 border-white rounded-tr-lg"></div>
                      <div className="absolute bottom-0 left-0 w-6 h-6 sm:w-8 sm:h-8 border-b-2 border-l-2 sm:border-b-4 sm:border-l-4 border-white rounded-bl-lg"></div>
                      <div className="absolute bottom-0 right-0 w-6 h-6 sm:w-8 sm:h-8 border-b-2 border-r-2 sm:border-b-4 sm:border-r-4 border-white rounded-br-lg"></div>
                      
                      {/* Scanning line */}
                      <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute left-0 right-0 h-0.5 sm:h-1 bg-emerald-400 animate-scan-line shadow-lg shadow-emerald-400/50"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <canvas ref={canvasRef} className="hidden" />
                
                <button
                  onClick={stopScanning}
                  className="w-full bg-red-500 text-white py-2.5 sm:py-3 rounded-xl font-semibold text-sm sm:text-base hover:bg-red-600 transition-all transform hover:scale-105 shadow-lg"
                >
                  Berhenti Scan
                </button>

                <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-2.5 sm:p-3 text-center">
                  <p className="text-emerald-700 text-xs sm:text-sm font-medium flex items-center justify-center gap-2">
                    <Loader className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin" />
                    Mencari QR Code...
                  </p>
                </div>
              </div>
            )}

            {scannedData && (
              <div className="text-center space-y-3 sm:space-y-4">
                <div className="relative">
                  <CheckCircle className="w-16 h-16 sm:w-20 sm:h-20 text-emerald-500 mx-auto animate-bounce" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-emerald-400/30 rounded-full animate-ping"></div>
                  </div>
                </div>
                <p className="text-lg sm:text-xl font-bold text-emerald-700">Scan Berhasil!</p>
                <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-3 sm:p-4">
                  <p className="text-gray-600 text-xs sm:text-sm mb-1">Nomor Meja</p>
                  <p className="text-xl sm:text-2xl font-bold text-emerald-700">{scannedData}</p>
                </div>
                <div className="flex items-center justify-center gap-2 text-gray-500 text-xs sm:text-sm">
                  <Loader className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin" />
                  Mengalihkan ke menu...
                </div>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-red-700 font-semibold text-sm">Akses Kamera Gagal</p>
                  <p className="text-red-600 text-xs mt-1">{error}</p>
                </div>
              </div>
            )}

            {hasPermission === false && !error && (
              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4">
                <p className="text-yellow-800 text-sm text-center">
                  ⚠️ Aplikasi memerlukan izin kamera untuk scan QR code
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Tips Card */}
        <div className="mt-4 sm:mt-6 text-center">
          <div className="bg-white/30 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 text-emerald-900 shadow-lg border border-white/40">
            <p className="text-xs sm:text-sm font-semibold flex items-center justify-center gap-2">
              <Coffee className="w-4 h-4" />
              Tips Penggunaan
            </p>
            <p className="text-[10px] sm:text-xs mt-1 text-emerald-800">Pastikan QR code terlihat jelas di kamera</p>
            <p className="text-[10px] sm:text-xs text-emerald-800">dan cahaya cukup terang</p>
          </div>
        </div>
      </div>
    </div>
  );
}