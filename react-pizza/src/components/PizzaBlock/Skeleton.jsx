import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
  <ContentLoader 
   className="pizza-block"
    speed={2}
    width={280}
    height={466}
    viewBox="0 0 280 466"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="129" cy="129" r="129" /> 
    <rect x="0" y="273" rx="10" ry="10" width="280" height="27" /> 
    <rect x="0" y="320" rx="10" ry="10" width="280" height="88" /> 
    <rect x="0" y="426" rx="10" ry="10" width="91" height="27" /> 
    <rect x="123" y="418" rx="20" ry="20" width="152" height="45" />
  </ContentLoader>
)

export default Skeleton