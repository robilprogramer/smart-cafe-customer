"use client"
import React, { useEffect, useState } from "react"

interface FlyingItem {
  id: string
  name: string
  image: string
  startX: number
  startY: number
}

interface FlyingItemAnimationProps {
  flyingItem: FlyingItem | null
}

export function FlyingItemAnimation({ flyingItem }: FlyingItemAnimationProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (flyingItem) {
      setIsAnimating(true)
      
      // Trigger cart bounce animation
      const cartButton = document.getElementById('cart-button')
      if (cartButton) {
        cartButton.classList.add('cart-bounce-effect')
        setTimeout(() => {
          cartButton.classList.remove('cart-bounce-effect')
        }, 600)
      }

      const timer = setTimeout(() => {
        setIsAnimating(false)
      }, 1000)
      
      return () => clearTimeout(timer)
    }
  }, [flyingItem])

  if (!flyingItem || !isAnimating) return null

  // Calculate cart position (top-right corner)
  const endX = typeof window !== 'undefined' ? window.innerWidth - 60 : 300
  const endY = 60

  const deltaX = endX - flyingItem.startX
  const deltaY = endY - flyingItem.startY

  return (
    <>
      {/* Main Flying Item */}
      <div
        className="flying-item-wrapper"
        style={{
          position: 'fixed',
          left: `${flyingItem.startX}px`,
          top: `${flyingItem.startY}px`,
          zIndex: 9999,
          pointerEvents: 'none',
          transform: 'translate(-50%, -50%)',
        }}
      >
        {/* Item Card with Image */}
        <div className="flying-card">
          <img 
            src={flyingItem.image}
            alt={flyingItem.name}
            className="flying-image"
          />
          
          {/* Plus Badge */}
          <div className="flying-badge">
            +1
          </div>

          {/* Sparkles */}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="sparkle"
              style={{
                '--angle': `${i * 60}deg`,
                '--delay': `${i * 0.05}s`,
              } as React.CSSProperties}
            />
          ))}
        </div>

        {/* Success Notification */}
        <div className="success-popup">
          <div className="success-icon">✓</div>
          <div className="success-text">{flyingItem.name}</div>
        </div>
      </div>

      <style jsx>{`
        .flying-item-wrapper {
          animation: flyToCart 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        .flying-card {
          position: relative;
          width: 60px;
          height: 60px;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
          border: 3px solid #10b981;
          background: white;
          animation: cardPulse 0.8s ease-out;
        }

        .flying-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .flying-badge {
          position: absolute;
          top: -8px;
          right: -8px;
          width: 28px;
          height: 28px;
          background: linear-gradient(135deg, #10b981, #059669);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 700;
          font-size: 14px;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
          border: 2px solid white;
          animation: badgePop 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        .sparkle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: #10b981;
          border-radius: 50%;
          top: 50%;
          left: 50%;
          animation: sparkleMove 0.6s ease-out forwards;
          animation-delay: var(--delay);
        }

        .success-popup {
          position: absolute;
          top: -60px;
          left: 50%;
          transform: translateX(-50%);
          background: white;
          padding: 8px 16px;
          border-radius: 20px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
          display: flex;
          align-items: center;
          gap: 8px;
          border: 2px solid #10b981;
          white-space: nowrap;
          animation: popupSlide 0.5s ease-out;
          max-width: 200px;
          overflow: hidden;
        }

        .success-icon {
          width: 24px;
          height: 24px;
          background: linear-gradient(135deg, #10b981, #059669);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 14px;
          flex-shrink: 0;
        }

        .success-text {
          color: #065f46;
          font-weight: 600;
          font-size: 12px;
          text-overflow: ellipsis;
          overflow: hidden;
        }

        @keyframes flyToCart {
          0% {
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
            opacity: 1;
          }
          20% {
            transform: translate(calc(-50% + ${deltaX * 0.1}px), calc(-50% + ${deltaY * 0.1}px)) scale(1.15) rotate(5deg);
          }
          50% {
            transform: translate(calc(-50% + ${deltaX * 0.5}px), calc(-50% + ${deltaY * 0.5}px - 30px)) scale(0.9) rotate(-3deg);
          }
          80% {
            transform: translate(calc(-50% + ${deltaX * 0.9}px), calc(-50% + ${deltaY * 0.9}px)) scale(0.4) rotate(0deg);
            opacity: 0.8;
          }
          100% {
            transform: translate(calc(-50% + ${deltaX}px), calc(-50% + ${deltaY}px)) scale(0.1) rotate(0deg);
            opacity: 0;
          }
        }

        @keyframes cardPulse {
          0%, 100% {
            transform: scale(1);
          }
          30% {
            transform: scale(1.1);
          }
          60% {
            transform: scale(0.95);
          }
        }

        @keyframes badgePop {
          0% {
            transform: scale(0) rotate(-180deg);
            opacity: 0;
          }
          70% {
            transform: scale(1.2) rotate(10deg);
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }

        @keyframes sparkleMove {
          0% {
            transform: translate(-50%, -50%) rotate(var(--angle)) translateX(0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) rotate(var(--angle)) translateX(40px) scale(0);
            opacity: 0;
          }
        }

        @keyframes popupSlide {
          0% {
            opacity: 0;
            transform: translateX(-50%) translateY(-10px);
          }
          50% {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateX(-50%) translateY(5px);
          }
        }

        /* Cart Bounce Effect (applied globally) */
        :global(.cart-bounce-effect) {
          animation: cartBounce 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) !important;
        }

        @keyframes cartBounce {
          0%, 100% {
            transform: scale(1);
          }
          25% {
            transform: scale(1.3) rotate(-5deg);
          }
          50% {
            transform: scale(0.9) rotate(5deg);
          }
          75% {
            transform: scale(1.15) rotate(-2deg);
          }
        }

        /* Responsive untuk mobile */
        @media (max-width: 640px) {
          .flying-card {
            width: 50px;
            height: 50px;
            border-radius: 10px;
            border-width: 2px;
          }

          .flying-badge {
            width: 24px;
            height: 24px;
            top: -6px;
            right: -6px;
            font-size: 12px;
          }

          .sparkle {
            width: 3px;
            height: 3px;
          }

          .success-popup {
            padding: 6px 12px;
            top: -50px;
          }

          .success-icon {
            width: 20px;
            height: 20px;
            font-size: 12px;
          }

          .success-text {
            font-size: 11px;
          }
        }
      `}</style>
    </>
  )
}