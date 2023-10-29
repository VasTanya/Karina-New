import React from 'react'
import { useNavigate } from 'react-router-dom'

function SentRequest() {
const navigate = useNavigate()

const handleClick = ()=>{
 navigate("/cake" )
}


  return (
    <div>
        <div className='sentRequest'>
            <h4>Your letter has been sent.</h4>
            <button className='btn_return' onClick={handleClick}>Return to previous page</button>
        </div>
      
    </div>
  )
}

export default SentRequest