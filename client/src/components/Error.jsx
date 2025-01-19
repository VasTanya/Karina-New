import React from "react";
import { useSelector } from "react-redux";

function Error() {
  const { message } = useSelector((state) => state.getUrl_MyDesign);

  return (
    <div className="error_try-later">
      <div className="error">
        <p>
          {message || "An error has occurred"}
          <span>
            {" "}
            <img className="nosmile" src="./img/nosmile.png" alt="" />
          </span>
        </p>
      </div>
    </div>
  );
}

export default Error;
