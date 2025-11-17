'use client'
import { ReactLenis } from '@studio-freight/react-lenis'

function SmoothScroll({children}) {
  return (
    <ReactLenis root options={{ lerp: 0.06, duration: 1.7, smoothTouch: true }}>
      { children }
    </ReactLenis>
  )
}

export default SmoothScroll