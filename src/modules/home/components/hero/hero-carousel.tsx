"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"

// Custom classNames utility function to replace cn from shadcn
function classNames(
  ...classes: (string | boolean | undefined | null)[]
): string {
  return classes.filter(Boolean).join(" ")
}

interface CarouselItem {
  image: string
  alt: string
  title: string
  description: string
}

interface HeroCarouselProps {
  items: CarouselItem[]
  autoPlaySpeed?: number
  height?: string
  enableAutoPlay?: boolean
  imageQuality?: number
}

export function HeroCarousel({
  items = [],
  autoPlaySpeed = 5000,
  height = "600px",
  enableAutoPlay = true,
  imageQuality = 85, // Added quality parameter with default value
}: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(enableAutoPlay)
  const [isHovering, setIsHovering] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length)
  }

  const goToPrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + items.length) % items.length
    )
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  // Handle touch events for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      goToNext()
    }
    if (isRightSwipe) {
      goToPrevious()
    }

    setTouchStart(null)
    setTouchEnd(null)
  }

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying && !isHovering) {
      autoPlayRef.current = setInterval(goToNext, autoPlaySpeed)
    } else if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current)
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [isAutoPlaying, isHovering, autoPlaySpeed])

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Carousel slides */}
      <div
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {items.map((item, index) => (
          <div key={index} className="relative min-w-full h-full">
            <Image
              src={item.image || "/placeholder.svg"}
              alt={item.alt}
              fill
              className="object-cover"
              priority={index === 0 || index === 1} // Priorizar las primeras dos imágenes
              quality={imageQuality} // Usar el parámetro de calidad
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw" // Optimizado para diferentes tamaños de pantalla
              loading={index <= 1 ? "eager" : "lazy"} // Cargar inmediatamente las primeras imágenes
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
            <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-8 lg:p-12 text-white">
              <div className="max-w-4xl mx-auto md:mx-0">
                <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold mb-2 md:mb-4 animate-fade-in">
                  {item.title}
                </h2>
                <p className="text-sm md:text-base lg:text-xl max-w-2xl animate-fade-in-delay opacity-0">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows - hidden on mobile, visible on larger screens */}
      <div className="hidden md:block">
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
          aria-label="Previous slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
          aria-label="Next slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-3 z-10">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={classNames(
              "w-2.5 h-2.5 md:w-3.5 md:h-3.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50",
              currentIndex === index
                ? "bg-white scale-110"
                : "bg-white/40 hover:bg-white/60"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
