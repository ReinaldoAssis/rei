import '@/css/tailwind.css'
import '@/css/index.css'

import { ThemeProvider } from 'next-themes'
import { DefaultSeo } from 'next-seo'
import Head from 'next/head'

import { SEO } from '@/components/SEO'
import LayoutWrapper from '@/components/LayoutWrapper'
import {AnimateSharedLayout } from 'framer-motion'

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <DefaultSeo {...SEO} />
      <LayoutWrapper>
        <AnimateSharedLayout exitBeforeEnter initial={false} onExitComplete={()=>{window.scrollTo(0,0)}}> 
            <Component {...pageProps} />
        </AnimateSharedLayout>
      </LayoutWrapper>
    </ThemeProvider>
  )
}
