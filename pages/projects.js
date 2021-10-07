import Image from 'next/image'
import siteMetadata from '@/data/siteMetadata'
import Link from '@/components/Link'
import Card from '@/components/Card'
import { createClient } from 'contentful'
import { PageSeo } from '@/components/SEO'

import { motion } from 'framer-motion'

const space = process.env.CONTENTFUL_SPACE_ID
const content_token = process.env.CONTENTFUL_TOKEN
const d = process.env.PageTransition

export async function getStaticProps() {
  const client = createClient({ space: space, accessToken: content_token })

  const res = await client.getEntries({ content_type: 'projects' })
  const projects = res.items
  console.log(projects)

  var projectsData = []
  projects.map((p) => {
    projectsData.push({
      title: p.fields.title,
      description: p.fields.description,
      href: '' + p.fields.url,
      imgSrc: 'https:' + p.fields.thumbnail.fields.file.url,
    })
    console.log(p.fields.title)
  })

  return { props: { projectsData } }
}

export default function Projects({ projectsData }) {
  return (
    <>
      <PageSeo
        title={`Projects - ${siteMetadata.author}`}
        description={siteMetadata.description}
        url={`${siteMetadata.siteUrl}/projects`}
      />
      <motion.div initial={{opacity:0, y:-200}} animate={{opacity:1,y:0}} transition={{duration:d, ease:"easeOut"}} className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="pt-6 pb-8 space-y-2 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Projects
          </h1>
          {/* <p className="text-lg leading-7 text-gray-500 dark:text-gray-400"></p> */}
        </div>
        <div className="container py-12">
          <div className="flex flex-wrap -m-4">
            {projectsData.map((d, p) => (
              <Card
                key={d.title}
                title={d.title}
                description={d.description}
                imgSrc={d.imgSrc}
                href={d.href}
                delay={0.3+p*0.2}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </>
  )
}
