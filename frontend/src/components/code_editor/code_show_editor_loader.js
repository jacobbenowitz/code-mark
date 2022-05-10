import React from "react"
import ContentLoader from "react-content-loader"

const NoteShowEditorLoader = (props) => (
  <ContentLoader
    speed={1}
    width={500}
    height={120}
    viewBox="0 0 500 120"
    backgroundColor="#dedede"
    foregroundColor="#ededed"
    {...props}
  >
    <rect x="0" y="0" rx="0" ry="0" width="500" height="120" />
  </ContentLoader>
)

export default NoteShowEditorLoader;

