import React from "react"
import ContentLoader from "react-content-loader"

const NewNoteLoader = (props) => (
  <ContentLoader
    speed={1}
    width="100%"
    height={100}
    viewBox="0 0 600 100"
    backgroundColor="#545454"
    foregroundColor="#6f6d6d"
    style={{ width: '100%' }}
    preserveAspectRatio="none"
  >
    <rect x="0" y="0" rx="8" ry="8" width="600" height="100" />
  </ContentLoader>
)

export default NewNoteLoader

