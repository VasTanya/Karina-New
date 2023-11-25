import React from 'react'

function Error() {
  return (
    <div className="error_try-later">
    <div className="error">
      <p>
        An error has occurred
        <span>
          {" "}
          <img className="nosmile" src="./img/nosmile.png" alt="" />
        </span>
      </p>
    </div>
  </div>
  )
}

export default Error