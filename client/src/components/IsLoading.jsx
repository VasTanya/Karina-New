import React from 'react'
import ContentLoader from "react-content-loader"

const IsLoading = () => (

  <ContentLoader 
  speed={2}
  viewBox="0 0 300 300"
  backgroundColor="#f3f3f3"
  foregroundColor="#ecebeb"
  
>
  <rect x="30" y="2" rx="0" ry="0" width="220" height="190" /> 
  <rect x="30" y="205" rx="0" ry="0" width="220" height="33" />
</ContentLoader>
)

export default IsLoading

