import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetState as resetRequestState } from "../redux/slice/getUrl_Request";
import { resetState as resetMyDesignState } from "../redux/slice/getUrl_MyDesign";

function SentRequest() {
  const dispatch = useDispatch();
  const location = useLocation();

  const { message } = location.state;

  useEffect(() => {
    dispatch(resetRequestState());
    dispatch(resetMyDesignState());
  }, [location]);

  return (
    <div>
      <div className="sentRequest">
        <img className="sentReqImg" src="/img/handUp.png" alt="" />
        <p>{message || "Your letter has been sent"}</p>
      </div>
    </div>
  );
}

export default SentRequest;
