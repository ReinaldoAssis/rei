import React from 'react'
import { motion } from 'framer-motion'

export function AnimatedText({
  children,
  duration = 0.2,
  truedelay,
  delayofset,
  styleplus,
  ...rest
}) {
  let words = children.split(' ')
  return words.map((word, i) => {
    return (
      <motion.div key={children + i} style={{ display: 'inline-block', overflow: 'hidden' }}>
        <motion.p
          {...rest}
          initial={{ y: '100%' }}
          animate="visible"
          variants={{
            visible: (i) => ({
              y: 0,
              transition: {
                delay: i * delayofset + truedelay,
                duration: duration,
              },
            }),
          }}
          style={{ ...styleplus }}
          key={children + '-' + i}
          custom={i}
        >
          {word + (i !== words.length - 1 ? '\u00A0' : '')}
        </motion.p>
      </motion.div>
    )
  })
}
