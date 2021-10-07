import Link from '@/components/Link'
import { PageSeo } from '@/components/SEO'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import Image from 'next/image'
import Interesses from '@/components/home page/Interesses'
import Ufal from '@/components/home page/Ufal'
import { AnimatePresence, motion } from 'framer-motion'
import { AnimatedText } from '@/components/AnimatedText'

const MAX_DISPLAY = 5
const postDateTemplate = { year: 'numeric', month: 'long', day: 'numeric' }

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog')

  return { props: { posts } }
}

export default function Home({ posts }) {
  return (
    <>
      <PageSeo
        title={siteMetadata.title}
        description={siteMetadata.description}
        url={siteMetadata.siteUrl}
      />
      <motion.div
        exit={{ opacity: 0, y: 200 }}
        transition={{ duration: 1 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          <div className="pt-6 pb-8 space-y-2 md:space-y-5">
            {/* <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Home
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            {siteMetadata.description}
          </p> */}
          </div>
        </div>
        <motion.div
          style={{
            padding: 30,
            boxShadow: '0px 10px 10px rgba(0,0,0,0.2)',
          }}
          className="mb-4 dark:bg-roxo bg-gray-30 "
          animate={{ y: 0, opacity: 1 }}
          initial={{ y: -200, opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="grid sm:grid-cols-2">
            {/* PAINEL DE LANDING*/}
            <Image alt="" src="/static/images/feeling_proud.svg" width={600} height={400} />{' '}
            {/*IMAGE*/}
            <div className="flex-initial md:ml-6">
              <motion.div
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ opacity: 0, y: 200 }}
                transition={{ duration: 1, ease: 'easeOut', delay: 0.7 }}
              >
                <h1 className="text-3xl font-extrabold mt-6 lg:mt-0" style={{ color: '#6C63FF' }}>
                  &lt;Rei&gt;
                </h1>
              </motion.div>

              {/* <motion.h1
              style={{ padding: 10 }}
              transition={{ delay: 1.1 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-3xl md:text-2xl font-bold lg:ml-16"
            >
              A developer under development
            </motion.h1> */}

              <AnimatePresence>
                <div style={{ padding: 10 }} className="lg:ml-16">
                  <AnimatedText
                    className="text-3xl md:text-2xl font-bold"
                    delayofset={0.3}
                    duration={0.6}
                    truedelay={1}
                  >
                    A developer under development
                  </AnimatedText>
                </div>
              </AnimatePresence>

              <motion.div
                initial={{ y: -60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: 'easeOut', delay: 0.7 }}
              >
                <h1 className="text-3xl font-extrabold" style={{ color: '#6C63FF' }}>
                  &lt;/Rei&gt;
                </h1>
              </motion.div>
              <motion.h1
                transition={{ delay: 0.9, duration: 1 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-lg font-bold"
                style={{ color: '#28385C', marginTop: 10 }}
              >
                Programming a better world <i>since</i> 2003.
              </motion.h1>
              <motion.div
                transition={{ delay: 0.6, ease: 'easeOut', duration: 2 }}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Link href="/projects">
                  <div
                    style={{
                      width: 'fit-content',
                      boxShadow: '0px 6px 7px rgba(0,0,0,0.3)',
                      userSelect: 'none',
                    }}
                    className="mt-16 bg-indigo-600 btn transform transition duration-300 hover:scale-105 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full"
                  >
                    Project's showcase
                  </div>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
        {posts.length > MAX_DISPLAY && (
          <div className="flex justify-end text-base font-medium leading-6 mb-6">
            <Link
              href="/blog"
              className="text-indigo-500 hover:text-blue-600 dark:hover:text-blue-400"
              aria-label="blog"
            >
              Blog &rarr;
            </Link>
          </div>
        )}
        <div className="grid lg:grid-cols-2 content-center " style={{ justifyContent: 'center' }}>
          <Ufal />
          <Interesses />
        </div>
      </motion.div>
    </>
  )
}
