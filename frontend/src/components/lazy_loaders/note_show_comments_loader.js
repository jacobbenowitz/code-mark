import React from "react"
import ContentLoader from "react-content-loader"

const NoteCommentsLoader = (props) => (
  <ContentLoader
    speed={1}
    width={775}
    height={375}
    viewBox="0 0 775 375"
    backgroundColor="#545454"
    foregroundColor="#6f6d6d"
    style={{ width: '100%' }}
    preserveAspectRatio="none"
  >
    <rect x="32" y="7" rx="12" ry="12" width="189" height="25" />
    <rect x="32" y="50" rx="8" ry="8" width="451" height="16" />
    <rect x="32" y="134" rx="13" ry="13" width="470" height="235" />
  </ContentLoader>
)

export default NoteCommentsLoader

