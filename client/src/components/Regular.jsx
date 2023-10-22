import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRegular } from "../redux/slice/getUrlRegular";
import IsLoading from "./IsLoading";

function Regular() {
  const dispatch = useDispatch();
  const { dataRegular, status } = useSelector((store) => store.getUrlRegular);
  const dataRegularCake = dataRegular.data;

  const getUrlRegular = async () => {
    const urlRegular = `${process.env.REACT_APP_API_URL}/regular`;
    dispatch(fetchRegular({ urlRegular }));
  };

  useEffect(() => {
    getUrlRegular();
  }, []);

  const isLoading = [...new Array(12)].map((_, idx) => <IsLoading key={idx} />);

  return (
    <>
      {status === "error" ? (
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
          <div>
            <p className="Try later">Please try again later.</p>
          </div>
        </div>
      ) : (
        <div className="photos_in_album">
          {status === "loading"
            ? isLoading
            : dataRegularCake.map((el) => (
                <div key={el.display_number} className="one_photo_from_alb">
                  <img src={el.src} alt="" />
                  <div className="title_price">
                    <p>{el.title + "(№" + el.display_number + ")"}</p>
                    <p>{el.price}</p>
                  </div>
                </div>
              ))}{" "}
        </div>
      )}
    </>
  );
}

export default Regular;
