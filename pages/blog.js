// import { getAllFilesFrontMatter } from '@/lib/mdx'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
import { PageSeo } from '@/components/SEO'
import ListaBlog from '@/components/ListaBlog'
import { createClient } from 'contentful'
import TemplateBlogs from '@/layouts/TemplateBlogs'
import { motion } from 'framer-motion'

export const POSTS_PER_PAGE = 7
const space = process.env.CONTENTFUL_SPACE_ID
const content_token = process.env.CONTENTFUL_TOKEN
const d = process.env.PageTransition

export async function getStaticProps() {
  const client = createClient({ space: space, accessToken: content_token })

  const res = await client.getEntries({ content_type: 'blog' })
  const _posts = res.items

  //************** FETCHING BLOGS FROM DEV.TO ************** */
  let devblogs
  const devtoAPI = await fetch('https://dev.to/api/articles?username=reinaldoassis').then(
    async (r) => (devblogs = await r.json())
  )

  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(_posts.length / POSTS_PER_PAGE),
  } //+ devblogs.length

  return { props: { _posts, pagination, devblogs } }
}

export default function Blog({ _posts, pagination, devblogs }) {
  return (
    <>
      <PageSeo
        title={`Blog - ${siteMetadata.author}`}
        description={siteMetadata.description}
        url={`${siteMetadata.siteUrl}/blog`}
      />
      <motion.div
        initial={{ opacity: 0, y: -200 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: d, ease: 'easeOut' }}
      >
        <TemplateBlogs
          posts={_posts.slice(0, POSTS_PER_PAGE)}
          pagination={pagination}
          allPosts={_posts}
          title="All Posts"
          d={d}
          devtoBlogs={devblogs}
        ></TemplateBlogs>
      </motion.div>
    </>
  )
}
