import Link from 'next/link'
import kebabCase from '@/lib/utils/kebabCase'
import { useRouter } from 'next/router'


const Tag = ({ text, isInSyncWithQuery }) => {
  const router = useRouter()
  const { search } = router.query

  const texto = kebabCase(text).replace('-','%20')
  const result = search && !texto.includes(search) && isInSyncWithQuery ? `/blog?search=${search}%20${texto}` : `/blog?search=${texto}`

  if (text[0] == ' ') text = text.substring(1)
  return (
    <Link href={result}>
      <a className="mr-3 text-sm font-medium text-blue-500 uppercase hover:text-blue-600 dark:hover:text-blue-400">
        {text.split(' ').join('-')}
      </a>
    </Link>
  )
}

export default Tag
