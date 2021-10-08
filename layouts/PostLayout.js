import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import { BlogSeo } from '@/components/SEO'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { motion } from 'framer-motion'

// const editUrl = (fileName) => `${siteMetadata.siteRepo}/blob/master/data/blog/${fileName}`
const discussUrl = (slug) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(
    `${siteMetadata.siteUrl}/blog/${slug}`
  )}`

const postDateTemplate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

export default function PostLayout({ children, frontMatter, next, prev }) {
  const { slug, fileName, date, title, tags } = frontMatter

  return (
    <SectionContainer>
      {/* <BlogSeo url={`${siteMetadata.siteUrl}/blog/${frontMatter.slug}`} {...frontMatter} /> */}
      <article>
        <motion.div
          initial={{ opacity: 0, y: -200 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700"
        >
          <header className="pt-6 xl:pb-6">
            <div className="space-y-1 text-center">
              <dl className="space-y-10">
                <motion.div
                  initial={{ y: -80, opacity: 0 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.8, ease: 'easeOut' }}
                  dateTime={date}
                >
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                    <motion.time>
                      {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
                    </motion.time>
                  </dd>
                </motion.div>
              </dl>
              <motion.div
                initial={{ y: -80, opacity: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
                dateTime={date}
              >
                <PageTitle>{title}</PageTitle>
              </motion.div>
            </div>
          </header>
          <div
            className="pb-8 divide-y divide-gray-200 xl:divide-y-0 dark:divide-gray-700 xl:grid xl:grid-cols-4 xl:gap-x-6"
            style={{ gridTemplateRows: 'auto 1fr' }}
          >
            <dl className="pt-6 pb-10 xl:pt-11 xl:border-b xl:border-gray-200 xl:dark:border-gray-700">
              <dt className="sr-only">Authors</dt>
              <dd>
                <ul className="flex justify-center space-x-8 xl:block sm:space-x-12 xl:space-x-0 xl:space-y-8">
                  <li className="flex items-center space-x-2">
                    <motion.img
                      initial={{ x: -80, opacity: 0 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.9, delay: 0.6, ease: 'easeOut' }}
                      dateTime={date}
                      src={siteMetadata.image}
                      alt="avatar"
                      className="w-10 h-10 rounded-full"
                    />
                    <dl className="text-sm font-medium leading-5 whitespace-nowrap">
                      <dt className="sr-only">Name</dt>
                      <motion.dd
                        initial={{ x: -80, opacity: 0 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
                        dateTime={date}
                        className="text-gray-900 dark:text-gray-100"
                      >
                        {siteMetadata.author}
                      </motion.dd>
                      {typeof siteMetadata.instagram === 'string' && (
                        <>
                          <dt className="sr-only">Instagram</dt>
                          <motion.dd
                            initial={{ x: -80, opacity: 0 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
                          >
                            <Link
                              href={siteMetadata.instagram}
                              className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
                            >
                              {siteMetadata.instagram.replace('https://instagram.com/', '@')}
                            </Link>
                          </motion.dd>
                        </>
                      )}
                    </dl>
                  </li>
                </ul>
              </dd>
            </dl>
            <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:pb-0 xl:col-span-3 xl:row-span-2">
              <motion.div
                initial={{ x: 80, opacity: 0 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
                className="pt-10 pb-8 prose dark:prose-dark max-w-none"
              >
                {children}
              </motion.div>
              <div className="pt-6 pb-6 text-sm text-gray-700 dark:text-gray-300">
                {/* <Link href={discussUrl(slug)} rel="nofollow">
                  {'Discuss on Twitter'}
                </Link> */}
                {/* {` • `} */}
                {/* <Link href={editUrl(fileName)}>{'View on GitHub'}</Link> */}
              </div>
            </div>
            <footer>
              <div className="text-sm font-medium leading-5 divide-gray-200 xl:divide-y dark:divide-gray-700 xl:col-start-1 xl:row-start-2">
                {tags && (
                  <div className="py-4 xl:py-8">
                    <motion.h2
                      initial={{ y: 80, opacity: 0 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
                      className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400"
                    >
                      Tags
                    </motion.h2>
                    <div className="flex flex-wrap">
                      {tags.map((tag, i) => (
                        <motion.div
                          initial={{ y: 80, opacity: 0 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.7, delay: 0.8 + 0.3 * i, ease: 'easeOut' }}
                        >
                          <Tag key={tag} text={tag} />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
                {(next || prev) && (
                  <div className="flex justify-between py-4 xl:block xl:space-y-8 xl:py-8">
                    {prev && (
                      <div>
                        <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                          Previous Article
                        </h2>
                        <div className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400">
                          <Link href={`/blog/${prev.slug}`}>{prev.title}</Link>
                        </div>
                      </div>
                    )}
                    {next && (
                      <div>
                        <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                          Next Article
                        </h2>
                        <div className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400">
                          <Link href={`/blog/${next.slug}`}>{next.title}</Link>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="pt-4 xl:pt-8">
                <Link
                  href="/blog"
                  className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  &larr; Back to the blog
                </Link>
              </div>
            </footer>
          </div>
        </motion.div>
      </article>
    </SectionContainer>
  )
}
