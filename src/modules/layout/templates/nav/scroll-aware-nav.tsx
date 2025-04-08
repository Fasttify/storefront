"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

export default function ScrollAwareNav({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  // Check if we're on the homepage, accounting for region prefixes
  const isHomePage =
    pathname === "/" ||
    pathname === "" ||
    /^\/[a-z]{2}(-[a-z]{2})?\/?(\/)?$/.test(pathname)

  // Initialize scrolled state based on current scroll position
  const [scrolled, setScrolled] = useState(() => {
    // When running on the client, check the actual scroll position
    if (typeof window !== "undefined") {
      return window.scrollY > 20
    }
    // Default to false for server-side rendering
    return false
  })

  useEffect(() => {
    // Reset scrolled state when pathname changes and we're on homepage
    if (isHomePage && window.scrollY <= 20) {
      setScrolled(false)
    } else if (!isHomePage) {
      setScrolled(true)
    }

    const handleScroll = () => {
      const isScrolled = window.scrollY > 20
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    // Only add scroll listener if we're on the homepage
    if (isHomePage) {
      window.addEventListener("scroll", handleScroll, { passive: true })
      // Force a check on mount
      handleScroll()
    } else {
      // If not on homepage, always consider as scrolled (normal nav appearance)
      setScrolled(true)
    }

    return () => {
      if (isHomePage) {
        window.removeEventListener("scroll", handleScroll)
      }
    }
  }, [scrolled, isHomePage, pathname])

  return (
    <div
      className={`sticky top-0 inset-x-0 z-50 group transition-all duration-300 ${
        !scrolled && isHomePage ? "nav-transparent" : ""
      }`}
    >
      {children}
    </div>
  )
}
