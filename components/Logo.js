import { motion } from 'framer-motion'

export default function Logo() {
  return (
    <motion.svg
      width="44"
      height="44"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M2.5 6.091l4.72 4.72L12 6.031l4.781 4.78L21.5 6.092v8.877a3 3 0 01-3 3h-13a3 3 0 01-3-3V6.091zm17 4.818v4.06a1 1 0 01-1 1h-13a1 1 0 01-1-1v-4.061l2.72 2.72L12 8.848l4.781 4.78 2.719-2.72z "
        strokeWidth="1"
        stroke="rgb(255,255,255)"
        fill="transparent"
      ></motion.path>
    </motion.svg>
  )
}
