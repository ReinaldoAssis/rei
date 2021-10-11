import { useEffect, useState, useRef } from 'react'
import { useTheme } from 'next-themes'
import { motion, useCycle } from 'framer-motion'

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()

  const [height, setHeight] = useState(0)
  const [effectOpen, ToggleEffect] = useCycle(false, true)
  const btnTheme = useRef(null)

  // When mounted on client, now we can show the UI
  useEffect(() => {
    setMounted(true)
    setHeight(window.innerHeight)
    function handlerResize() {
      setHeight(window.innerHeight)
    }
    window.addEventListener('resize', handlerResize)
    return () => window.removeEventListener('resize', handlerResize)
  }, [])
  // const [scroll, setScroll] = useState(0)
  useEffect(() => {
    // window.addEventListener('scroll', () => {
    //   setScroll(window.scrollY)
    // })
  })

  // const effect = {
  //   open: () => ({
  //     clipPath: `circle(100% at 90% 0%})`,
  //     transition: {
  //       type: 'spring',
  //       stiffness: 20,
  //       restDelta: 2,
  //       duration: 2,
  //     },
  //   }),
  //   closed: {
  //     clipPath: `circle(1% at 90% 90%)`,
  //     transition: {
  //       delay: 0.2,
  //       type: 'spring',
  //       stiffness: 400,
  //       damping: 40,
  //     },
  //   },
  //   ontop: {
  //     background: 'transparent',
  //   },
  // }

  return (
    <div>
      {/* <motion.div
        className={effectOpen ? 'bg-white' : 'bg-gray-900'}
        initial={false}
        variants={effect}
        animate={effectOpen ? 'open' : 'closed'}
        style={{
          width: '100vw',
          top: '0',
          right: '0',
          height: '100vh',
          position: 'fixed',
          zIndex: -1,
        }}
      /> */}
      <button
        ref={btnTheme}
        aria-label="Toggle Dark Mode"
        type="button"
        className="w-8 h-8 p-1 ml-1 mr-1 rounded sm:ml-4"
        onClick={() => {
          ToggleEffect()
          setTimeout(
            () => setTheme(theme === 'dark' || resolvedTheme === 'dark' ? 'light' : 'dark'),
            0
          )
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="text-gray-900 dark:text-gray-100"
        >
          {mounted && (theme === 'dark' || resolvedTheme === 'dark') ? (
            <path
              fillRule="evenodd"
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              clipRule="evenodd"
            />
          ) : (
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          )}
        </svg>
      </button>
    </div>
  )
}

export default ThemeSwitch
