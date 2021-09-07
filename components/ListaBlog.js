const space = process.env.CONTENTFUL_SPACE_ID
const content_token = process.env.CONTENTFUL_TOKEN

import React, { useEffect } from 'react'

export default function ListaBlog({ posts }) {
  return posts.map((x) => {
    return (
      <React.Fragment key={x.sys.id}>
        <h1>{x.fields.title}</h1>
      </React.Fragment>
    )
  })
}
