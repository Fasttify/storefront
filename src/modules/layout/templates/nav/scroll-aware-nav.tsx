"use client"

import { useEffect, useState } from "react"

export default function ScrollAwareNav({
  children,
}: {
  children: React.ReactNode
}) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [scrolled])

  return (
    <div
      className={`sticky top-0 inset-x-0 z-50 group transition-all duration-300 ${
        scrolled ? "" : "nav-transparent"
      }`}
    >
      {children}
    </div>
  )
}
