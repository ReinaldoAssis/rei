import '@/css/tailwind.css'
import '@/css/index.css'

import { ThemeProvider, useTheme } from 'next-themes'
import { DefaultSeo } from 'next-seo'
import Head from 'next/head'

import { SEO } from '@/components/SEO'
import LayoutWrapper from '@/components/LayoutWrapper'
import { AnimateSharedLayout, motion, AnimatePresence } from 'framer-motion'
import { black, white } from 'tailwindcss/colors'

export default function App({ Component, pageProps }) {
  const { theme, resolvedTheme } = useTheme()
  return (
    <ThemeProvider attribute="class">
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        {theme === 'dark' || resolvedTheme === 'dark' ? (
          <>
            <link
              rel="apple-touch-icon"
              sizes="180x180"
              href="/static/favicons/dark/apple-touch-icon.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="32x32"
              href="/static/favicons/dark/favicon-32x32.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="16x16"
              href="/static/favicons/dark/favicon-16x16.png"
            />
            <link rel="manifest" href="/static/favicons/dark/site.webmanifest" />
            <link
              rel="mask-icon"
              href="/static/favicons/dark/safari-pinned-tab.svg"
              color="#5bbad5"
            />
          </>
        ) : (
          <>
            <link
              rel="apple-touch-icon"
              sizes="180x180"
              href="/static/favicons/apple-touch-icon.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="32x32"
              href="/static/favicons/favicon-32x32.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="16x16"
              href="/static/favicons/favicon-16x16.png"
            />
            <link rel="manifest" href="/static/favicons/site.webmanifest" />
            <link rel="mask-icon" href="/static/favicons/safari-pinned-tab.svg" color="#5bbad5" />
          </>
        )}
      </Head>
      <DefaultSeo {...SEO} />
      <LayoutWrapper>
        {/* <AnimateSharedLayout exitBeforeEnter initial={false} onExitComplete={()=>{window.scrollTo(0,0)}}>  */}
        {/* <AnimatePresence>
            {theme === 'dark' ? 
            null
            :(<motion.circle style={{color:black}} initial={{scale:0}} animate={{scale:1}} transition={{duration:2}} />)}
          </AnimatePresence> */}
        <Component {...pageProps} />
        {/* </AnimateSharedLayout> */}
      </LayoutWrapper>
    </ThemeProvider>
  )
}
