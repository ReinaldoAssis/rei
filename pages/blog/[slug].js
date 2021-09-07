import { useRouter } from 'next/router'
import { createClient } from 'contentful'
import siteMetadata from '@/data/siteMetadata'

const space = process.env.CONTENTFUL_SPACE_ID
const content_token = process.env.CONTENTFUL_TOKEN

const client = createClient({ space: space, accessToken: content_token })

async function getPosts() {
  const res = await client.getEntries({ content_type: 'blog' })
  console.log(res)
}

export async function getStaticPaths() {
  const _posts = await getPosts()
  const paths = _posts.map((v) => {
    const f = v.fields

    const date =
      f.date == null
        ? '03-01-1964'
        : new Date(f.date).toLocaleDateString(siteMetadata.locale, {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
          })

    const slug =
      (f.title == null ? '' : f.title).replace(' ', '-').replace(/[^a-zA-Z ]/g, '') +
      '-' +
      date.replaceAll('/', '-')

    return {
      params: {
        slug: slug,
      },
    }
  })

  console.log('Caminho')
  console.log(paths)

  return { paths, fallback: false }
}

export async function getStaticProps(context) {
  const { params } = context
  //get params from context (context.params)
  console.log('params')
  console.log(params)
  const { items } = await client.getEntries({
    content_type: 'blog',
    'fields.title': params.title,
    'fields.tags': params.tags,
  })

  return { props: { post: items[0] } }
}

const Post = ({ post }) => {
  const router = useRouter()
  const { slug, tags } = router.query
  // console.log(post)

  return (
    <div>
      <p>{/* Title: {slug} | tags: {tags} */}</p>
      <p>{post.fields.title}</p>
    </div>
  )
}

export default Post
