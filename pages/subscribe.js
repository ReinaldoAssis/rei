import NewsletterSub from '@/components/NewsletterSub'
import { motion } from 'framer-motion'
import siteMetadata from '@/data/siteMetadata'
import { PageSeo } from '@/components/SEO'
const d = process.env.PageTransition

export default function Subscribe() {
  return (
    <>
      <PageSeo
        title={`Subscribe to newsletter - ${siteMetadata.author}`}
        description={siteMetadata.description}
        url={`${siteMetadata.siteUrl}/subscribe`}
      />
      <motion.div
        initial={{ opacity: 0, y: -200 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: d, ease: 'easeOut' }}
      >
        <NewsletterSub />
      </motion.div>
    </>
  )
}
