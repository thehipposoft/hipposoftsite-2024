'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import gsap from 'gsap'

export default function Transitions() {
  const pathname = usePathname()
  const layersRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const layers = layersRef.current

    gsap.to(layers, {
      y: '-100%',
      duration: .7,
      ease: 'power4.inOut',
      stagger: 0.1,
    })
  }, [pathname])

  return (
    <div className="fixed inset-0 z-50 pointer-events-none flex">
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) layersRef.current[i] = el
          }}
          className="w-1/4 h-full bg-[#221b35] transition-layer"
          style={{ left: `${i * 25}%`, position: 'absolute' }}
        />
      ))}
    </div>
  )
}

// ✅ Exportamos con acceso directo a los elementos para la animación de entrada
export const playTransitionIn = (): Promise<void> => {
  return new Promise((resolve) => {
    const layers = document.querySelectorAll('.transition-layer') as NodeListOf<HTMLElement>
    if (!layers.length) {
      resolve()
      return
    }

    const tl = gsap.timeline({ onComplete: () => resolve() })

    tl.set(layers, { y: '100%' }) // comienza desde abajo
    tl.to(layers, {
      y: '0%',
      duration: .7,
      ease: 'power4.inOut',
      stagger: 0.1,
    })
  })
}
