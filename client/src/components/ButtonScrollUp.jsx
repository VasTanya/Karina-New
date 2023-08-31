import React, { useEffect, useState } from 'react'

function ButtonScrollUp() {

  const [scrollUp, setScrollUp] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 150) {
        setScrollUp(true)
      } else {
        setScrollUp(false)
      }
    })
  }, [])

  const handlerScrollUp = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  return (
    <div>{
      scrollUp && <div className='btn-scroll-up' onClick={handlerScrollUp}><i className="fa fa-arrow-up" aria-hidden="true"></i></div>
      
    }
    </div>

  );
}

export default ButtonScrollUp