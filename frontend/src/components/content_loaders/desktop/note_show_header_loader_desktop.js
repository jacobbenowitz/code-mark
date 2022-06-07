import React from "react"
import ContentLoader from "react-content-loader"

const NoteShowHeaderDesktopLoader = (props) => (
  <ContentLoader
    speed={1}
    width={775}
    height={315}
    viewBox="0 0 775 315"
    backgroundColor="#545454"
    foregroundColor="#6f6d6d"
    style={{ width: '100%' }}
    preserveAspectRatio="none"
  >
    <rect x="0" y="0" rx="9" ry="9" width="70" height="18" />
    <rect x="0" y="35" rx="20" ry="20" width="468" height="42" />
    <rect x="0" y="110" rx="5" ry="5" width="65" height="20" />
    <rect x="0" y="145" rx="5" ry="5" width="65" height="20" />
    <rect x="89" y="110" rx="5" ry="5" width="150" height="20" />
    <rect x="89" y="145" rx="5" ry="5" width="150" height="20" />

    <rect x="668" y="110" rx="5" ry="5" width="105" height="14" />
    <rect x="690" y="138" rx="15" ry="15" width="85" height="32" />

    <rect x="0" y="190" rx="5" ry="5" width="45" height="15" />
    <rect x="0" y="225" rx="5" ry="5" width="35" height="25" />
    <rect x="0" y="260" rx="5" ry="5" width="35" height="30" />
    <rect x="46" y="225" rx="5" ry="5" width="75" height="25" />
    <rect x="128" y="225" rx="5" ry="5" width="58" height="25" />
    <rect x="195" y="225" rx="5" ry="5" width="92" height="25" />
    <rect x="297" y="225" rx="5" ry="5" width="78" height="25" />
  </ContentLoader>
)

export default NoteShowHeaderDesktopLoader

