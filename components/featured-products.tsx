"use client"
import { motion } from "framer-motion"
import { Reveal } from "./reveal"

const featuredProductions = [
  {
    id: "1",
    name: "Brand Campaign 2024",
    category: "Commercial",
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
  },
]

export function FeaturedProducts() {
  return (
    <section className="py-20 lg:py-32" id="featured-products">
      <div className="container-custom">
        <Reveal>
          <div className="text-left mb-16">
            <h2 className="text-4xl text-neutral-900 mb-4 lg:text-6xl">
              Featured <span className="italic font-light">Productions</span>
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl">
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
                <div className="bg-neutral-100 rounded-2xl p-8 h-64 flex flex-col justify-center items-center text-center hover:bg-neutral-200 transition-colors duration-300">
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">{production.name}</h3>
                  <p className="text-neutral-600">{production.category}</p>
                  <div className="mt-4 text-sm text-neutral-500">Video coming soon</div>
                </div>
              </Reveal>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
