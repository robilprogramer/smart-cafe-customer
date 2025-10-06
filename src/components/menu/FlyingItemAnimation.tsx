"use client"
import React from "react"
import { FlyingItem } from "@/types/menu"

interface FlyingItemAnimationProps {
  flyingItem: FlyingItem | null
}

export function FlyingItemAnimation({ flyingItem }: FlyingItemAnimationProps) {
  if (!flyingItem) return null
  
  return (
    <>
      <div
        className="fixed z-[9999] pointer-events-none"
        style={{
          left: flyingItem.x,
          top: flyingItem.y,
          animation: 'flyToCart 0.8s cubic-bezier(0.4, 0.0, 0.2, 1) forwards'
        }}
      >
        <div className="bg-green-500 text-white px-4 py-2 rounded-full shadow-lg font-medium text-sm whitespace-nowrap">
          +1 {flyingItem.name}
        </div>
      </div>
     
      {/* eslint-disable-next-line */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes flyToCart {
          0% {
            transform: scale(1) translateY(0);
            opacity: 1;
          }
          50% {
            transform: scale(0.8) translateY(-100px);
            opacity: 0.8;
          }
          100% {
            transform: scale(0.3) translate(${typeof window !== 'undefined' ? window.innerWidth - 100 : 300}px, -${typeof window !== 'undefined' ? window.innerHeight - 100 : 500}px);
            opacity: 0;
          }
        }
       
        .cart-bounce {
          animation: cartBounce 0.5s ease-in-out;
        }
       
        @keyframes cartBounce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
      `}} />
    </>
  )
}
