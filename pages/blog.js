import { getAllFilesFrontMatter } from '@/lib/mdx'
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
  const posts = await getAllFilesFrontMatter('blog')
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE)
  // const pagination = {
  //   currentPage: 1,
  //   totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  // }

  const client = createClient({ space: space, accessToken: content_token })

  const res = await client.getEntries({ content_type: 'blog' })
  const _posts = res.items
  // console.log(`POSTS LENGTH ${_posts.length}`)

  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(_posts.length / POSTS_PER_PAGE),
  }

  return { props: { initialDisplayPosts, _posts, pagination } }
}

export default function Blog({ _posts, initialDisplayPosts, pagination }) {
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
        title="All Posts"
      ></TemplateBlogs>
    </>
  )
}
