import React from "react"
import ContentLoader from "react-content-loader"

const CodeNoteTextPlaceholder = (props) => (
  <ContentLoader 
    speed={1}
    width={375}
    height={100}
    viewBox="0 0 375 100"
    backgroundColor="#545454"
    foregroundColor="#6f6d6d"
    {...props}
  >
    <rect x="30" y="32" rx="4" ry="4" width="146" height="26" /> 
    <rect x="30" y="65" rx="4" ry="4" width="326" height="27" /> 
    <rect x="263" y="7" rx="4" ry="4" width="91" height="15" /> 
    <rect x="31" y="7" rx="4" ry="4" width="102" height="15" />
  </ContentLoader>
)

export default CodeNoteTextPlaceholder;

