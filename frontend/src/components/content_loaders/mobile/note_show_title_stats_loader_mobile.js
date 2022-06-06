import React from "react"
import ContentLoader from "react-content-loader"

const NoteShowTitleStatsLoaderMobile = (props) => (
  <ContentLoader
    speed={1}
    width={370}
    height={170}
    viewBox="0 0 370 170"
    backgroundColor="#545454"
    foregroundColor="#6f6d6d"
    style={{ width: '100%' }}
    preserveAspectRatio="none"
  >
    <rect x="1" y="2" rx="10" ry="10" width="105" height="20" />
    <rect x="1" y="38" rx="25" ry="25" width="300" height="50" />
    <rect x="5" y="137" rx="8" ry="8" width="37" height="24" />
    <rect x="59" y="137" rx="8" ry="8" width="37" height="24" />
    <rect x="114" y="137" rx="8" ry="8" width="126" height="24" />
    <rect x="256" y="137" rx="8" ry="8" width="111" height="24" />
    <rect x="283" y="99" rx="8" ry="8" width="83" height="24" />
  </ContentLoader>
)

export default NoteShowTitleStatsLoaderMobile

