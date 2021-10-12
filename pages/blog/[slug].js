import { useRouter } from 'next/router'
import { createClient } from 'contentful'
import siteMetadata from '@/data/siteMetadata'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import PostLayout from '@/layouts/PostLayout'
import IframeContainer from '@/components/IframeContainer'
import { INLINES, BLOCKS } from '@contentful/rich-text-types'

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
      date.replace(/\//g, '-') +
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

  const options = {
    renderNode: {
      [INLINES.HYPERLINK]: (node) => {
        if (node.data.uri.includes('player.vimeo.com/video')) {
          return (
            // <IframeContainer title="Embeded" src={node.data.uri} frameBorder="0" allowFullScreen />
            <iframe
              className="shadow-xl"
              title="Embeded"
              src={node.data.uri}
              frameBorder="0"
              allowFullScreen
              style={{
                width: '96%',
                height: '26rem',
                backgroundColor: 'rgba(0,0,0,0)',
                display: 'block',
                margin: 0,
                padding: 0,
                border: 0,
                lineHeight: 0,
                overflow: 'hidden',
              }}
            />
          )
        } else if (node.data.uri.includes('youtube.com/embed')) {
          return (
            <IframeContainer
              title="Embeded"
              src={node.data.uri}
              allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
              frameBorder="0"
              allowFullScreen
            />
          )
        }
      },
      'embedded-asset-block': (node) => {
        const alt = node.data.target.fields.title
        const url = node.data.target.fields.file.url
        const size = node.data.target.fields.file.details.image
        return <img alt={alt} src={url} width={size.height > 500 ? size.width - 200 : ''} />
      },
    },
  }

  const child = documentToReactComponents(post.fields.text, options)

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
