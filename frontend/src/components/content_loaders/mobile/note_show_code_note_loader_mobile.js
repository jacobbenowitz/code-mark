import React from "react"
import ContentLoader from "react-content-loader"

const NoteShowCodeNoteLoaderMobile = (props) => (
  <ContentLoader
    speed={1}
    width={370}
    height={350}
    viewBox="0 0 370 350"
    backgroundColor="#545454"
    foregroundColor="#6f6d6d"
    style={{ width: '100%' }}
    preserveAspectRatio="none"
  >
    <rect x="1" y="1" rx="28" ry="28" width="30" height="30" />
    <rect x="0" y="42" rx="6" ry="6" width="370" height="300" />
    <rect x="340" y="1" rx="28" ry="28" width="30" height="30" />
    <rect x="304" y="1" rx="28" ry="28" width="30" height="30" />
    <rect x="-1" y="351" rx="4" ry="4" width="370" height="59" />
  </ContentLoader>
)

export default NoteShowCodeNoteLoaderMobile

