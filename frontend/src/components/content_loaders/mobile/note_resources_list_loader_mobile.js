import React from "react"
import ContentLoader from "react-content-loader"

const NoteResourcesListLoaderMobile = (props) => (
  <ContentLoader
    speed={1}
    width={370}
    height={80}
    viewBox="0 0 370 60"
    backgroundColor="#545454"
    foregroundColor="#6f6d6d"
    style={{ width: '100%' }}
    preserveAspectRatio="none"
  >
    <rect x="1" y="16" rx="4" ry="4" width="211" height="59" />
    <rect x="220" y="16" rx="4" ry="4" width="211" height="59" />
  </ContentLoader>
)

export default NoteResourcesListLoaderMobile

