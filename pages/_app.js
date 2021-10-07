import '@/css/tailwind.css'
import '@/css/index.css'

import { ThemeProvider, useTheme} from 'next-themes'
import { DefaultSeo } from 'next-seo'
import Head from 'next/head'

import { SEO } from '@/components/SEO'
import LayoutWrapper from '@/components/LayoutWrapper'
import {AnimateSharedLayout, motion, AnimatePresence } from 'framer-motion'
import { black, white } from 'tailwindcss/colors'


export default function App({ Component, pageProps }) {
  const {theme} = useTheme()
  return (
    <ThemeProvider attribute="class">
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <DefaultSeo {...SEO} />
      <LayoutWrapper>
        <AnimateSharedLayout exitBeforeEnter initial={false} onExitComplete={()=>{window.scrollTo(0,0)}}> 
          {/* <AnimatePresence>
            {theme === 'dark' ? 
            null
            :(<motion.circle style={{color:black}} initial={{scale:0}} animate={{scale:1}} transition={{duration:2}} />)}
          </AnimatePresence> */}
            <Component {...pageProps} />
        </AnimateSharedLayout>
      </LayoutWrapper>
    </ThemeProvider>
  )
}
