import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'
import { PageSeo } from '@/components/SEO'
import { AnimatePresence, motion } from 'framer-motion'
import { AnimatedText } from '@/components/AnimatedText'

const d = process.env.PageTransition

const socialIcons = [
  {
    kind: 'mail',
    ref: `mailto:${siteMetadata.email}`,
  },
  {
    kind: 'instagram',
    ref: siteMetadata.instagram,
  },
  {
    kind: 'github',
    ref: siteMetadata.github,
  },
  {
    kind: 'youtube',
    ref: siteMetadata.youtube,
  },
  {
    kind: 'linkedin',
    ref: siteMetadata.linkedin,
  },
]

const defAnim = {
  initial_left: {
    opacity: 0,
    x: -200,
  },
  animateImg: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1,
      ease: 'easeOut',
      delay: d,
    },
  },
  nome: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 2,
      ease: 'easeOut',
      delay: 0.5,
    },
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1,
      ease: 'easeOut',
      delay: 1,
    },
  },
  animateD2: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1.5,
      ease: 'easeOut',
      delay: 1.4,
    },
  },
}

export default function About() {
  return (
    <>
      <PageSeo
        title={`About - ${siteMetadata.author}`}
        description={`About me - ${siteMetadata.author}`}
        url={`${siteMetadata.siteUrl}/about`}
      />
      <motion.div
        initial={{ opacity: 0, y: -200 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: d, ease: 'easeOut' }}
        className="divide-y"
      >
        <div className="pt-6 pb-8 space-y-2 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            About
          </h1>
        </div>
        <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
          {/* MINI PROFILE */}
          <div className="flex flex-col items-center pt-8 space-x-2">
            {/* <motion.div className="flex flex-col items-center"> */}
            <motion.img
              variants={defAnim}
              initial="initial_left"
              animate="animateImg"
              src={siteMetadata.image}
              alt="avatar"
              className="w-48 h-48 rounded-full"
            />
            <motion.h3
              variants={defAnim}
              initial="initial_left"
              animate="nome"
              className="pt-4 pb-2 text-2xl font-bold leading-8 tracking-tight"
            >
              {siteMetadata.author}
            </motion.h3>
            {/* </motion.div> */}
            <motion.div
              variants={defAnim}
              initial="initial_left"
              animate="animate"
              className="text-gray-500 dark:text-gray-400"
            >
              Computer Engineering
            </motion.div>
            <motion.div
              variants={defAnim}
              initial="initial_left"
              animate="animateD2"
              className="text-gray-500 dark:text-gray-400"
            >
              Federal University of Alagoas
            </motion.div>
            <div className="flex pt-6 space-x-3">
              {socialIcons.map((ic, i) => {
                return (
                  <SocialIcon
                    kind={ic.kind}
                    href={ic.ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1 + 0.4 * i }}
                  />
                )
              })}
            </div>
          </div>
          <div className="pt-8 pb-8 prose dark:prose-dark max-w-none xl:col-span-2">
            <AnimatePresence>
              <p style={{ lineHeight: 1.4 }}>
                <AnimatedText
                  styleplus={{
                    display: 'inline-block',
                    margin: 0,
                    padding: 0,
                    willChange: 'transform',
                  }}
                  delayofset={0.04}
                  duration={0.7}
                  truedelay={0.4}
                >
                  I started programming back when I was 6 years old, developing my own little games
                  (most of which were written with basic block programming), but eventually, this
                  passion evolved into something much bigger than just games.
                </AnimatedText>
              </p>
              <p style={{ lineHeight: 1.4 }}>
                <AnimatedText
                  styleplus={{
                    display: 'inline-block',
                    margin: 0,
                    padding: 0,
                    willChange: 'transform',
                  }}
                  delayofset={0.04}
                  duration={0.7}
                  truedelay={2.4}
                >
                  From creating games I developed interest not only in Software Engineering in
                  general but in Hardware Engineering too. I love making things and I am also always
                  on the lookout to improve my skills.
                </AnimatedText>
              </p>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </>
  )
}
