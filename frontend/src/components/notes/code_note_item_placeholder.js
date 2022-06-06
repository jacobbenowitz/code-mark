import React from "react"
import ContentLoader from "react-content-loader"

const CodeNotePlaceholder = (props) => (
  <ContentLoader
    speed={1}
    width={320}
    height={280}
    viewBox="0 0 320 280"
    backgroundColor="#dedede"
    foregroundColor="#ededed"
    {...props}
  >
    <rect x="0" y="0" rx="7" ry="7" width="320" height="280" />
  </ContentLoader>
)

export default CodeNotePlaceholder