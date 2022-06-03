import React from "react"
import ContentLoader from "react-content-loader"

const CodeNoteItemLoader = (props) => {
  function randomHeight() {
    return Math.floor(Math.random()*(420-300+1)+300)
  }
  return (
    <ContentLoader
      speed={1}
      width={350}
      height={randomHeight()}
      viewBox="0 0 350 420"
      backgroundColor="#545454"
      foregroundColor="#6f6d6d"
      style={{ width: '100%' }}
      preserveAspectRatio="none"
    >
      <rect x="0" y="0" rx="12" ry="12" width="350" height="420" />
    </ContentLoader>
  )
}

export default CodeNoteItemLoader

