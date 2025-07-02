// components/AnimatedLink.tsx
'use client'

import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'
import { playTransitionIn } from './Transitions'
import { Link } from '@/i18n/navigation'

type Props = {
  href: string
  children?: ReactNode
  className?: string
  rel?: string
  target?: string
}

export default function AnimatedLink({ href, children, className, rel, target }: Props) {
  const router = useRouter()

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault()
    await playTransitionIn() // Espera la animación
    router.push(href)        // Luego navega
  }

  return (
    <Link href={href} onClick={handleClick} className={className} rel={rel} target={target}>
      {children}
    </Link>
  )
}
