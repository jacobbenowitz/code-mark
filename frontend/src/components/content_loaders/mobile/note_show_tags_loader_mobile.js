import React from "react"
import ContentLoader from "react-content-loader"

const NoteShowTagsLoaderMobile = (props) => (
  <ContentLoader
    speed={1}
    width={370}
    height={80}
    viewBox="0 0 370 80"
    backgroundColor="#545454"
    foregroundColor="#6f6d6d"
    style={{ width: 'calc(100% + 16px)' }}
    preserveAspectRatio="none"
  >
    <rect x="1" y="2" rx="10" ry="10" width="71" height="20" />
    <rect x="2" y="42" rx="4" ry="4" width="126" height="30" />
    <rect x="137" y="42" rx="4" ry="4" width="66" height="30" />
    <rect x="213" y="42" rx="4" ry="4" width="86" height="30" />
    <rect x="308" y="42" rx="4" ry="4" width="96" height="30" />
  </ContentLoader>
)

export default NoteShowTagsLoaderMobile

