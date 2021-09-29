import { useRouter } from 'next/router'
import { createClient } from 'contentful'
import siteMetadata from '@/data/siteMetadata'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import PostLayout from '@/layouts/PostLayout'

const space = process.env.CONTENTFUL_SPACE_ID
const content_token = process.env.CONTENTFUL_TOKEN

const client = createClient({ space: space, accessToken: content_token })

async function getPosts() {
  const res = await (await client.getEntries({ content_type: 'blog' })).items
  return res
}

export async function getStaticPaths() {
  const _posts = await getPosts()
  console.log('posts')
  console.log(_posts)

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
      (f.title == null ? '' : f.title).replace(' ', '-').replace(/[^a-zA-Z- ]/g, '') +
      '-' +
      date.replaceAll('/', '-') +
      '-id=' +
      v.sys.id

    return {
      params: {
        slug: slug,
      },
    }
  })

  return { paths, fallback: false }
}

export async function getStaticProps(context) {
  const { params } = context

  const _id = params.slug.substr(params.slug.indexOf('id=')).replace('id=', '')

  const { items } = await client.getEntries({
    content_type: 'blog',
    'sys.id': _id,
  })

  return { props: { post: items[0] } }
}

const Post = ({ post }) => {
  console.log(post)

  const component = {
    title: post.fields.title,
    tags: post.fields.tags.split(','),
    date: post.fields.date,
    slug: '',
  }

  const child = documentToReactComponents(post.fields.text)

  return (
    <div>
      {/* <h2 className="text-4xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-4xl md:leading-14">
        {post.fields.title}
      </h2> */}
      {/* <div className="Texto">{}</div> */}
      <PostLayout frontMatter={component} children={child} />
    </div>
  )
}

export default Post
