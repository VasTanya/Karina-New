import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchSearch } from "../redux/slice/getUrl_Search";
import IsLoading from "./IsLoading";

function OneSearchCake() {
  const { dataSearch, status } = useSelector((store) => store.getUrl_Search);
  const dispatch = useDispatch();
  const { searchValue } = useSelector((store) => store.cakeSlice);

  const dot = ".";
  const idxSin = searchValue.indexOf(dot);
  const resultPrevDot = searchValue.slice(0, idxSin);
  const resultNextDot = searchValue.slice(idxSin + 1);

  const getUrlSearch = async () => {
    const urlSearch = `${process.env.REACT_APP_API_URL || ""}/albums/search?album_number=${resultPrevDot}&display_number=${resultNextDot}&select=${encodeURIComponent(JSON.stringify(["lg"]))}`;
    dispatch(fetchSearch({ urlSearch }));
  };

  useEffect(() => {
    getUrlSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  const isLoading = [...new Array(1)].map((_, idx) => <IsLoading key={idx} />);

  return (
    <>
      {status === "error" ? (
        <div className="error_try-later">
          <div className="please_wait">
            <p>Please, wait</p>
          </div>
        </div>
      ) : (
        <div className="one_cake">
          {status === "loading"
            ? isLoading
            : dataSearch?.map((el) => (
                <div key={el.album_number} className="one_cake_div">
                  <img src={el.matching_data.src.lg} alt="" />
                  <p>
                    {el.album_number + dot + el.matching_data.display_number}
                  </p>
                </div>
              ))}{" "}
        </div>
      )}
    </>
  );
}

export default OneSearchCake;
