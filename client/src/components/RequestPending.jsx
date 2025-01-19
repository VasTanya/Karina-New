import React, { useEffect } from "react";
import ContentLoader from "react-content-loader";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const RequestPending = () => {
  const navigate = useNavigate();
  const { getUrl_Request, getUrl_MyDesign } = useSelector((state) => state);

  const status = getUrl_Request.status || getUrl_MyDesign.status;

  useEffect(() => {
    if (status === "successful") {
      navigate("/sentRequest", {
        state: {
          message: getUrl_Request.message || getUrl_MyDesign.message,
        },
      });
    } else if (status === "error") {
      navigate("/error", {
        state: {
          message: getUrl_Request.message || getUrl_MyDesign.message,
        },
      });
    }
  }, [status, getUrl_Request, getUrl_MyDesign, navigate]);

  return (
    <ContentLoader
      speed={2}
      viewBox="0 0 300 300"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="30" y="2" rx="0" ry="0" width="220" height="190" />
      <rect x="30" y="205" rx="0" ry="0" width="220" height="33" />
    </ContentLoader>
  );
};

export default RequestPending;
