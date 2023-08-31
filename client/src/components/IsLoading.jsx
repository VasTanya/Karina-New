import React from 'react'
import ContentLoader from "react-content-loader"

const IsLoading = () => (
  // <ContentLoader 
  //   speed={2}
  //   // width={800}
  //   // height={460}
  //   viewBox="0 0 130 450"
  //   backgroundColor="#f3f3f3"
  //   foregroundColor="#ecebeb"
  //    {...props}
  // >
  
  //   <rect x="8" y="3" rx="0" ry="0" width="85" height="76" /> 
  //   <rect x="12" y="86" rx="0" ry="0" width="79" height="8" /> 
  // </ContentLoader>
  <ContentLoader 
  speed={2}
  // width={300}
  // height={300}
  viewBox="0 0 300 300"
  backgroundColor="#f3f3f3"
  foregroundColor="#ecebeb"
  
>
  <rect x="22" y="2" rx="0" ry="0" width="220" height="190" /> 
  <rect x="22" y="205" rx="0" ry="0" width="220" height="33" />
</ContentLoader>
)

export default IsLoading

