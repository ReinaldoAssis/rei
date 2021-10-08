import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import { motion, useCycle } from 'framer-motion'
// import useWindowDimensions, { useDimensions } from './use-dimensions'
import { MenuToggle } from './MenuToggle'
import { height } from 'tailwindcss/defaultTheme'

// const { height } = useWindowDimensions()

export const AnimatedMobileNav = () => {
  const [isOpen, toggleOpen] = useCycle(false, true)
  const containerRef = useRef(null)

  const [height, setHeight] = useState(0)
  useEffect(() => {
    setHeight(window.innerHeight)
  })

  const sidebar = {
    open: () => ({
      clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
      transition: {
        type: 'spring',
        stiffness: 20,
        restDelta: 2,
      },
    }),
    closed: {
      clipPath: 'circle(30px at 260px 50px)',
      transition: {
        delay: 0.2,
        type: 'spring',
        stiffness: 400,
        damping: 40,
      },
    },
  }

  return (
    <motion.nav
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
      ref={containerRef}
      id="animmobilenav"
      custom={height}
    >
      <motion.div className="background" variants={sidebar} />
      {/* <Navigation /> */}
      <MenuToggle toggle={() => toggleOpen()} />
    </motion.nav>
  )
}
