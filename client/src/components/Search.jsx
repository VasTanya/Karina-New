import React, { useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { setSearchValue } from "../redux/slice/cakeSlice";
import { useDispatch, useSelector } from "react-redux";
import qs from "qs";
import debounce from "lodash.debounce";

function Search() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [velInp, setVelInp] = useState("");
  const { searchValue } = useSelector((store) => store.cakeSlice);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updataSearch = useCallback(
    debounce((text) => {
      dispatch(setSearchValue(text));
    }, 2000),
    []
  );

  const onClickInput = (e) => {
    setVelInp(e.target.value);
    updataSearch(e.target.value);
    const queryString = qs.stringify({
      id,
      velInp,
    });
    navigate(`/search?${queryString}`);
  };

  const onClickIcons = () => {
    dispatch(setSearchValue(""));
    setVelInp("");
    navigate("/");
  };

  return (
    <div className="div_search">
      <input
        onChange={onClickInput}
        value={velInp}
        className="searchCake"
        type="text"
        placeholder="admin only"
      />
      {searchValue && (
        <i
          onClick={onClickIcons}
          className="fa fa-times"
          aria-hidden="true"
        ></i>
      )}
    </div>
  );
}

export default Search;
