import React from "react"
import ContentLoader from "react-content-loader"

const NoteShowMainLoader = (props) => (
  <ContentLoader
    speed={1}
    width={775}
    height={250}
    viewBox="0 0 775 250"
    backgroundColor="#545454"
    foregroundColor="#6f6d6d"
    style={{ width: '100%', height: "100%" }}
    preserveAspectRatio="none"
  >
    
    <rect x="0" y="0" rx="12" ry="12" width="22" height="22" />
    <rect x="715" y="0" rx="12" ry="12" width="22" height="22" />
    <rect x="744" y="0" rx="12" ry="12" width="22" height="22" />
    <rect x="0" y="30" rx="6" ry="6" width="775" height="200" />
  </ContentLoader>
)

export default NoteShowMainLoader

