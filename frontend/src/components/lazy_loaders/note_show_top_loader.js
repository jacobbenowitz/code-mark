import React from "react"
import ContentLoader from "react-content-loader"

const NoteShowTopLoader = (props) => (
  <ContentLoader
    speed={1}
    width={775}
    height={512}
    viewBox="0 0 775 512"
    backgroundColor="#545454"
    foregroundColor="#6f6d6d"
    style={{ width: '100%' }}
    preserveAspectRatio="none"
  >
    <rect x="33" y="0" rx="7" ry="7" width="59" height="14" />
    <rect x="33" y="32" rx="16" ry="16" width="285" height="29" />

    <rect x="255" y="83" rx="7" ry="7" width="113" height="14" />
    <rect x="129" y="83" rx="7" ry="7" width="113" height="14" />
    <rect x="80" y="83" rx="7" ry="7" width="32" height="14" />
    <rect x="33" y="80" rx="7" ry="7" width="32" height="20" />
    <rect x="33" y="117" rx="7" ry="7" width="32" height="14" />
    <rect x="33" y="140" rx="3" ry="3" width="32" height="26" />
    <rect x="608" y="74" rx="16" ry="16" width="134" height="31" />

    <rect x="73" y="140" rx="3" ry="3" width="72" height="25" />
    <rect x="160" y="140" rx="3" ry="3" width="90" height="25" />
    <rect x="275" y="140" rx="3" ry="3" width="61" height="25" />
    <rect x="33" y="262" rx="12" ry="12" width="22" height="22" />
    <rect x="685" y="262" rx="12" ry="12" width="22" height="22" />
    <rect x="714" y="262" rx="12" ry="12" width="22" height="22" />
    <rect x="33" y="290" rx="6" ry="6" width="713" height="200" />
  </ContentLoader>
)

export default NoteShowTopLoader

