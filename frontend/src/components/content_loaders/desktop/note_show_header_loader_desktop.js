import React from "react"
import ContentLoader from "react-content-loader"

const NoteShowHeaderDesktopLoader = (props) => (
  <ContentLoader
    speed={1}
    width={376}
    height={215}
    viewBox="0 0 376 215"
    backgroundColor="#545454"
    foregroundColor="#6f6d6d"
    // style={{ width: '100%' }}
    // preserveAspectRatio="none"
  >
    <rect x="0" y="0" rx="9" ry="9" width="70" height="18" />
    <rect x="0" y="40" rx="20" ry="20" width="268" height="42" />
    <rect x="0" y="105" rx="5" ry="5" width="30" height="20" />
    <rect x="44" y="105" rx="5" ry="5" width="30" height="20" />
    <rect x="89" y="105" rx="5" ry="5" width="101" height="20" />
    <rect x="207" y="105" rx="5" ry="5" width="101" height="20" />
    <rect x="0" y="155" rx="11" ry="11" width="38" height="20" />
    <rect x="0" y="185" rx="5" ry="5" width="35" height="25" />
    <rect x="46" y="185" rx="5" ry="5" width="75" height="25" />
    <rect x="128" y="185" rx="5" ry="5" width="58" height="25" />
    <rect x="195" y="185" rx="5" ry="5" width="92" height="25" />
    <rect x="297" y="185" rx="5" ry="5" width="78" height="25" />
  </ContentLoader>
)

export default NoteShowHeaderDesktopLoader

