"use client"

import type React from "react"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useState } from "react"
import { Play, Camera, Film, Volume2, VolumeX } from "lucide-react"
import { Reveal } from "./reveal"
import { BlurPanel } from "./blur-panel"
import "./volume-slider.css"

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [volume, setVolume] = useState(0)
  const [isMuted, setIsMuted] = useState(true)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const videoScale = useTransform(scrollYProgress, [0, 1], [1.05, 0.95])
  const videoY = useTransform(scrollYProgress, [0, 1], [0, -50])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 100])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number.parseFloat(e.target.value)
    setVolume(newVolume)
    if (videoRef.current) {
      videoRef.current.volume = newVolume
      videoRef.current.muted = newVolume === 0
      setIsMuted(newVolume === 0)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      if (isMuted) {
        videoRef.current.muted = false
        videoRef.current.volume = volume > 0 ? volume : 0.5
        setVolume(volume > 0 ? volume : 0.5)
        setIsMuted(false)
      } else {
        videoRef.current.muted = true
        setIsMuted(true)
      }
    }
  }

  const AnimatedText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
    return (
      <span>
        {text.split("").map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: delay + index * 0.03,
              ease: [0.21, 0.47, 0.32, 0.98],
            }}
            style={{ display: char === " " ? "inline" : "inline-block" }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </span>
    )
  }

  return (
    <section ref={containerRef} className="relative h-screen overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{ scale: videoScale, y: videoY }}
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2, ease: [0.21, 0.47, 0.32, 0.98] }}
      >
        <video ref={videoRef} autoPlay muted loop playsInline className="w-full h-full object-cover">
          <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/new%20main%20%281%29-hjc7kjzw3pnlywJj0Q1nNMZvRLADKg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/30" />
      </motion.div>

      <motion.div
        className="absolute top-16 lg:top-20 right-6 z-30"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1.5 }}
      >
        <div className="slider">
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
            className="level"
          />
          <button onClick={toggleMute} className="volume text-white/80 hover:text-white transition-colors">
            {isMuted ? <VolumeX size={25} /> : <Volume2 size={25} />}
          </button>
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 h-full flex items-center justify-center"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <div className="container-custom text-center text-white">
          <Reveal>
            <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-none tracking-tight mb-6">
              <AnimatedText text="Creative production for" delay={0.5} />
              <br />
              <span className="italic font-light">
                <AnimatedText text="stories that inspire." delay={1.1} />
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <motion.p
              className="text-lg md:text-xl text-white/90 mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              Based in Kuwait, producing content that lasts — timeless stories for modern audiences.
            </motion.p>
          </Reveal>
        </div>
      </motion.div>

      {/* Info Strip */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-20 flex justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2, ease: [0.21, 0.47, 0.32, 0.98] }}
      >
        <BlurPanel className="mx-6 mb-6 px-6 py-4 bg-black/24 backdrop-blur-md border-white/20">
          <div className="flex items-center justify-center gap-6 text-white/90">
            <div className="flex items-center gap-2">
              <Camera className="w-4 h-4 text-blue-400" />
              <span className="text-sm">Full production</span>
            </div>
            <div className="flex items-center gap-2">
              <Film className="w-4 h-4 text-purple-400" />
              <span className="text-sm">Post-production</span>
            </div>
            <div className="flex items-center gap-2">
              <Play className="w-4 h-4 text-green-400" />
              <span className="text-sm">Creative direction</span>
            </div>
          </div>
        </BlurPanel>
      </motion.div>
    </section>
  )
}
