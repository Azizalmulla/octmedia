"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { Reveal } from "./reveal"

const services = [
  {
    id: "commercial-production",
    name: "COMMERCIAL PRODUCTION",
    image: "/modern-armchair-pillows.png",
    count: "Full service",
  },
  {
    id: "documentary-films",
    name: "DOCUMENTARY FILMS",
    image: "/modular-cushion-bench.png",
    count: "Storytelling",
  },
  {
    id: "brand-campaigns",
    name: "BRAND CAMPAIGNS",
    image: "/cloud-white-sofa.png",
    count: "Creative direction",
  },
  {
    id: "music-videos",
    name: "MUSIC VIDEOS",
    image: "/distressed-artistic-chair.png",
    count: "Artistic vision",
  },
  {
    id: "corporate-videos",
    name: "CORPORATE VIDEOS",
    image: "/green-modular-loveseat.png",
    count: "Professional",
  },
  {
    id: "event-coverage",
    name: "EVENT COVERAGE",
    image: "/braided-rope-loveseat.png",
    count: "Live capture",
  },
  {
    id: "post-production",
    name: "POST-PRODUCTION",
    image: "/colorful-patchwork-sofa.png",
    count: "Full editing",
  },
  {
    id: "motion-graphics",
    name: "MOTION GRAPHICS",
    image: "/minimalist-boucle-loveseat.png",
    count: "Animation",
  },
  {
    id: "social-content",
    name: "SOCIAL CONTENT",
    image: "/abstract-artistic-sofa.png",
    count: "Digital first",
  },
  {
    id: "creative-consulting",
    name: "CREATIVE CONSULTING",
    image: "/textured-cream-loveseat.png",
    count: "Strategy",
  },
]

export function CollectionStrip() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const x = useTransform(scrollYProgress, [0, 1], [0, -100])

  const itemWidth = 320 // 320px (w-80) + 32px gap = 352px per item
  const totalWidth = services.length * (itemWidth + 32) - 32 // subtract last gap
  const containerWidth = typeof window !== "undefined" ? window.innerWidth : 1200
  const maxDrag = Math.max(0, totalWidth - containerWidth + 48) // add padding

  return (
    <section ref={containerRef} className="py-20 lg:py-32 overflow-hidden bg-neutral-50">
      <div className="mb-12">
        <Reveal>
          <div className="container-custom text-center">
            <h2 className="text-black mb-4 text-6xl font-normal">Our Services</h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Explore our comprehensive production services, each delivered with creativity, precision, and professional
              excellence.
            </p>
          </div>
        </Reveal>
      </div>

      <div className="relative">
        <motion.div
          className="flex gap-8 px-6"
          style={{ x }}
          drag="x"
          dragConstraints={{ left: -maxDrag, right: 0 }}
          dragElastic={0.1}
        >
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className="flex-shrink-0 w-80 group cursor-pointer"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-4">
                <motion.div
                  className="relative w-full h-full"
                  whileHover={{ filter: "blur(1px)" }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={service.image || "/placeholder.svg"}
                    alt={service.name}
                    fill
                    className="object-cover"
                    sizes="320px"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300" />
                </motion.div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="text-center text-white"
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1, scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-3xl font-bold tracking-wider mb-2">{service.name}</h3>
                    <p className="text-sm opacity-90">{service.count}</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="text-center mt-8">
        <p className="text-sm text-neutral-500">← Drag to explore services →</p>
      </div>
    </section>
  )
}
