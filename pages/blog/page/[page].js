import { PageSeo } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
// import { getAllFilesFrontMatter } from '@/lib/mdx'
import ListLayout from '@/layouts/ListLayout'
import { POSTS_PER_PAGE } from '../../blog'
import { createClient } from 'contentful'
import TemplateBlogs from '@/layouts/TemplateBlogs'

const space = process.env.CONTENTFUL_SPACE_ID
const content_token = process.env.CONTENTFUL_TOKEN

async function getPosts() {
  const client = createClient({ space: space, accessToken: content_token })

  const res = await client.getEntries({ content_type: 'blog' })
  return res.items
}

export async function getStaticPaths() {
  const totalPosts = (await getPosts()).length
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE)
  const paths = Array.from({ length: totalPages }, (_, i) => ({
    params: { page: (i + 1).toString() },
  }))
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps(context) {
  const {
    params: { page },
  } = context
  // const posts = await getAllFilesFrontMatter('blog')

  const _posts = await getPosts()

  const pageNumber = parseInt(page)
  const initialDisplayPosts = _posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(_posts.length / POSTS_PER_PAGE),
  }

  return {
    props: {
      _posts,
      initialDisplayPosts,
      pagination,
    },
  }
}

export default function PostPage({ _posts, initialDisplayPosts, pagination }) {
  return (
    <>
      <PageSeo
        title={siteMetadata.title}
        description={siteMetadata.description}
        url={`${siteMetadata.siteUrl}/blog/${pagination.currentPage}`}
      />
      <TemplateBlogs
        posts={initialDisplayPosts}
        pagination={pagination}
        title="All Posts"
      ></TemplateBlogs>
    </>
  )
  //_posts.slice(0, POSTS_PER_PAGE)
}
