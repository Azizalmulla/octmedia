"use client"

import { useEffect, useState } from "react"
import "./loader.css"

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Hide loader after 5 seconds (matching the animation duration)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="loader">
        <div className="box">
          <div className="top-side"></div>
          <div className="bottom-side"></div>
          <div className="screen">
            <div className="lightray-limit">
              <div className="lightray"></div>
            </div>
            <div className="loader-box">
              <div className="progress"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
