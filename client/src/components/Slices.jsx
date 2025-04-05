import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSlice } from "../redux/slice/getUrlSlice";
import IsLoading from "./IsLoading";

function Slices() {
  const dispatch = useDispatch();
  const { dataSlices, status } = useSelector((store) => store.getUrlSlice);
  const dataSlice = dataSlices.data;

  const getUrlSlices = async () => {
    const queryString = `select=${encodeURIComponent(JSON.stringify(["md"]))}`;
    const urlSlices = `${process.env.REACT_APP_API_URL || ""}/basics/slices?${queryString}`;
    dispatch(fetchSlice({ urlSlices }));
  };
  useEffect(() => {
    getUrlSlices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            : dataSlice.map((el) => (
                <div key={el.display_number} className="one_photo_from_alb">
                  <img src={el.src.md} alt="" />
                  <div className="title_price">
                    <p className="p_title_price">
                      {el.title + "(№" + el.display_number + ")"}
                    </p>
                    <p>{el.price}</p>
                  </div>
                </div>
              ))}{" "}
        </div>
      )}
    </>
  );
}

export default Slices;
