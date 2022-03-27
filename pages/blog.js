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
    totalPages: Math.ceil(_posts.length + devblogs.length / POSTS_PER_PAGE),
  }

  const allBlogs = devblogs
    .map((x) => {
      return {
        date: x.created_at,
        blog: x,
        isDevTo: true,
        fields: { title: x.title, resumo: x.description, tags: x.tag_list, date: x.created_at },
      }
    })
    .concat(
      _posts.map((x) => {
        return { date: x.fields.date, blog: x, isDevTO: false, fields: x.fields }
      })
    )

  //console.log('!!! devto !!!')
  //console.log(devblogs)
  console.log('!!! all blogs !!!')
  console.log(allBlogs)

  return { props: { devblogs, pagination } }
}

export default function Blog({ devblogs, pagination }) {
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
          posts={devblogs.slice(0, POSTS_PER_PAGE)}
          pagination={pagination}
          allPosts={devblogs}
          title="All Posts"
          d={d}
        ></TemplateBlogs>
      </motion.div>
    </>
  )
}
