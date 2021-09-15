import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { useState } from 'react'
import Pagination from '@/components/Pagination'
import Image from 'next/image'

const postDateTemplate = { year: 'numeric', month: 'long', day: 'numeric' }

export default function TemplateBlogs({ posts, title, initialDisplayPosts = [], pagination }) {
  const [searchValue, setSearchValue] = useState('')
  // const filteredBlogPosts = posts.filter((frontMatter) => {
  //   const searchContent = frontMatter.title + frontMatter.summary + frontMatter.tags.join(' ')
  //   return searchContent.toLowerCase().includes(searchValue.toLowerCase())
  // })

  // // If initialDisplayPosts exist, display it if no searchValue is specified
  // const displayPosts =
  //   initialDisplayPosts.length > 0 && !searchValue ? initialDisplayPosts : filteredBlogPosts

  return (
    <>
      <div className="divide-y">
        <div className="pt-6 pb-8 space-y-2 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {title}
          </h1>
          <div className="relative max-w-lg">
            <input
              aria-label="Search articles"
              type="text"
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search articles"
              className="block w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-md dark:border-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100"
            />
            <svg
              className="absolute w-5 h-5 text-gray-400 right-3 top-3 dark:text-gray-300"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        <ul>
          {/* {!filteredBlogPosts.length && 'No posts found.'} */}
          {posts.map((frontMatter) => {
            // console.log('List blog!')
            // console.log(frontMatter.fields)
            const { title, resumo, tags } = frontMatter.fields
            const date =
              frontMatter.fields.date == null
                ? '03-01-1964'
                : new Date(frontMatter.fields.date).toLocaleDateString(siteMetadata.locale, {
                    day: 'numeric',
                    month: 'numeric',
                    year: 'numeric',
                  })
            const slug =
              (title == null ? '' : title).replace(' ', '-').replace(/[^a-zA-Z- ]/g, '') +
              '-' +
              date.replaceAll('/', '-') +
              '-id=' +
              frontMatter.sys.id

            const _tags = tags.replace('-', ' ').split(',')

            const null_url =
              'images.ctfassets.net/jpwvbht1tkjo/6PvPUA7gD3Zcv6Ti6WXnUB/463b9bc848f8e5de1c02c1401c69b255/null.jpg?h=250'
            var thumb = { file: { url: null_url, details: { image: { width: 900, height: 900 } } } }
            try {
              thumb = frontMatter.fields.thumbnail.fields
            } catch {}

            return (
              <li key={slug} className="py-4">
                <article className="space-y-2 xl:space-y-0 xl:items-baseline">
                  <div className="flex flex-wrap content-center ">
                    <div className="thumbnail flex-initial shadow-md mr-5">
                      <Image
                        src={'https:' + thumb.file.url}
                        //width={10}
                        //height={80}
                        width={thumb.file.details.image.width}
                        height={thumb.file.details.image.height}
                        className="rounded-lg"
                      />
                    </div>
                    <div className="space-y-3 xl:col-span-3 flex-shrink flex-1">
                      <div>
                        <h3 className="text-2xl font-bold leading-8 tracking-tight">
                          <Link href={`/blog/${slug}`} className="text-gray-900 dark:text-gray-100">
                            {title == null ? 'Undefined' : title}
                          </Link>
                        </h3>
                        <div className="flex flex-wrap">
                          {_tags.map((tag) => (
                            <Tag key={tag} text={tag.replace('-', ' ')} />
                          ))}
                        </div>
                      </div>
                      <div className="prose text-gray-500 max-w-none dark:text-gray-400 break-words">
                        {resumo}
                      </div>
                    </div>
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                        <time dateTime={date}>
                          {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
                        </time>
                      </dd>
                    </dl>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>

      {pagination && pagination.totalPages > 1 && !searchValue && (
        <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
      )}
    </>
  )
}
