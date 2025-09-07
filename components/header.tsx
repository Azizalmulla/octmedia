"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import Image from "next/image"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        "backdrop-blur-md border-b border-white/[0.02]",
        isScrolled ? "bg-white/[0.02]" : "bg-white/[0.02]",
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-12 lg:h-16 relative">
          {/* Logo on far left */}
          <motion.div className="flex-shrink-0" whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
            <Image
              src="/octomedia-logo.png"
              alt="OctoMedia Logo"
              width={48}
              height={48}
              className="w-12 h-12 lg:w-16 lg:h-16"
            />
          </motion.div>

          {/* Centered OctoMedia text */}
          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2 flex-shrink-0"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <a
              href="#"
              className={cn(
                "text-xl lg:text-2xl font-black italic tracking-tight transition-colors font-sans",
                isScrolled ? "text-neutral-900 hover:text-neutral-700" : "text-white hover:text-white/80",
              )}
              aria-label="OctoMedia Home"
            >
              OctoMedia
            </a>
          </motion.div>

          {/* Empty div for balance */}
          <div className="flex-shrink-0 w-12 h-12 lg:w-16 lg:h-16"></div>
        </div>
      </div>
    </motion.header>
  )
}
