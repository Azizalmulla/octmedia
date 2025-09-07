"use client"
import { motion } from "framer-motion"
import type React from "react"

import { Reveal } from "./reveal"
import { useState, useRef } from "react"

const featuredProductions = [
  {
    id: "1",
    name: "Brand Campaign 2024",
    category: "Commercial",
    video: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/new%20lays-perY8aDb74dO1dsvLqRkJUPMhrny6v.mp4",
  },
  {
    id: "2",
    name: "Documentary Series",
    category: "Documentary",
  },
  {
    id: "3",
    name: "Product Launch Video",
    category: "Marketing",
    video: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/X80%20Unboxing%20Full%20%281%29%20%282%29-jjNCzJkiuD5ul6q7cTHJnf7ib1UVJ8.mp4",
  },
]

const Volume2Icon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
  </svg>
)

const VolumeXIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
    <line x1="23" y1="9" x2="17" y2="15"></line>
    <line x1="17" y1="9" x2="23" y2="15"></line>
  </svg>
)

const MaximizeIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
  </svg>
)

export function FeaturedProducts() {
  const [volume, setVolume] = useState(0)
  const [isMuted, setIsMuted] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number.parseFloat(e.target.value)
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
    if (videoRef.current) {
      videoRef.current.volume = newVolume
      videoRef.current.muted = newVolume === 0
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      const newMuted = !isMuted
      setIsMuted(newMuted)
      videoRef.current.muted = newMuted
      if (newMuted) {
        setVolume(0)
        videoRef.current.volume = 0
      } else {
        setVolume(0.5)
        videoRef.current.volume = 0.5
      }
    }
  }

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen()
      }
    }
  }

  return (
    <section className="py-20 lg:py-32" style={{ backgroundColor: "#ffffff" }} id="featured-products">
      <div className="container-custom">
        <Reveal>
          <div className="text-left mb-16">
            <h2 className="text-4xl mb-4 lg:text-6xl" style={{ color: "#000000" }}>
              Featured{" "}
              <span className="italic font-light" style={{ color: "#000000" }}>
                Productions
              </span>
            </h2>
            <p className="text-lg max-w-2xl" style={{ color: "#666666" }}>
              Explore our most recent productions — each crafted with creativity, precision, and storytelling that
              lasts.
            </p>
          </div>
        </Reveal>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.3,
              },
            },
          }}
        >
          {featuredProductions.map((production, index) => (
            <motion.div
              key={production.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.8,
                    ease: [0.21, 0.47, 0.32, 0.98],
                  },
                },
              }}
            >
              <Reveal delay={index * 0.1}>
                {production.video ? (
                  <div className="bg-neutral-100 rounded-2xl overflow-hidden relative group">
                    <video ref={videoRef} className="w-full h-64 object-cover" autoPlay loop muted playsInline>
                      <source src={production.video} type="video/mp4" />
                    </video>

                    {/* Video Controls */}
                    <div className="absolute top-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {/* Volume Control */}
                      <div className="flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded-full px-3 py-2">
                        <button onClick={toggleMute} className="text-white hover:text-gray-300 transition-colors">
                          {isMuted ? <VolumeXIcon /> : <Volume2Icon />}
                        </button>
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.1"
                          value={volume}
                          onChange={handleVolumeChange}
                          className="w-16 h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer slider"
                        />
                      </div>

                      {/* Fullscreen Button */}
                      <button
                        onClick={toggleFullscreen}
                        className="bg-black/50 backdrop-blur-sm rounded-full p-2 text-white hover:text-gray-300 transition-colors"
                      >
                        <MaximizeIcon />
                      </button>
                    </div>

                    {/* Video Info Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                      <h3 className="text-xl font-semibold text-white mb-2">{production.name}</h3>
                      <p className="text-gray-200">{production.category}</p>
                    </div>
                  </div>
                ) : (
                  <div
                    className="rounded-2xl p-8 h-64 flex flex-col justify-center items-center text-center hover:bg-neutral-50 transition-colors duration-300"
                    style={{
                      backgroundColor: "#ffffff !important",
                      border: "2px solid #e5e5e5",
                      color: "#000000",
                    }}
                  >
                    <h3 className="text-xl font-semibold mb-2" style={{ color: "#000000 !important" }}>
                      {production.name}
                    </h3>
                    <p style={{ color: "#666666 !important" }}>{production.category}</p>
                    <div className="mt-4 text-sm" style={{ color: "#999999 !important" }}>
                      Video coming soon
                    </div>
                  </div>
                )}
              </Reveal>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
