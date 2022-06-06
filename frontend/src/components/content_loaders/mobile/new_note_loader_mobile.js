import React from "react"
import ContentLoader from "react-content-loader"

const NewNoteLoaderMobile = (props) => (
  <ContentLoader
    speed={1}
    width={370}
    height={112}
    viewBox="0 0 370 112"
    backgroundColor="#545454"
    foregroundColor="#6f6d6d"
    style={{ width: '100%' }}
    preserveAspectRatio="none"
  >
    <rect x="0" y="12" rx="9" ry="9" width="370" height="100" />
  </ContentLoader>
)

export default NewNoteLoaderMobile

