// import { getAllFilesFrontMatter } from '@/lib/mdx'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
import { PageSeo } from '@/components/SEO'
import ListaBlog from '@/components/ListaBlog'
import { createClient } from 'contentful'
import TemplateBlogs from '@/layouts/TemplateBlogs'

export const POSTS_PER_PAGE = 7
const space = process.env.CONTENTFUL_SPACE_ID
const content_token = process.env.CONTENTFUL_TOKEN

export async function getStaticProps() {

  const client = createClient({ space: space, accessToken: content_token })

  const res = await client.getEntries({ content_type: 'blog' })
  const _posts = res.items

  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(_posts.length / POSTS_PER_PAGE),
  }

  return { props: { _posts, pagination } }
}

export default function Blog({ _posts, pagination }) {
  return (
    <>
      <PageSeo
        title={`Blog - ${siteMetadata.author}`}
        description={siteMetadata.description}
        url={`${siteMetadata.siteUrl}/blog`}
      />

      <TemplateBlogs
        posts={_posts.slice(0, POSTS_PER_PAGE)}
        pagination={pagination}
        allPosts={_posts}
        title="All Posts"
      ></TemplateBlogs>
    </>
  )
}
