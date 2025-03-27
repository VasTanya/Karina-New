import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchSlice } from "../redux/getAlbums";

import "../css/AddProducts.css";

const MAIN_TYPES = ["slices", "regular", "album"];

function AddProduct() {
  const [selectedItem, setSelectedItem] = useState("slices");
  const [selectedDisplayItem, setSelectedDisplayItem] = useState("Slices");
  const [src, setSrc] = useState(null);

  const dispatch = useDispatch();
  const { data, status } = useSelector((store) => store.albums);

  const handleSelection = (e) => {
    setSelectedItem(e.target.value);
    setSelectedDisplayItem(e.target.options[e.target.selectedIndex].text);
  };

  useEffect(() => {
    dispatch(fetchSlice());
  }, [dispatch]);

  return status === "error" ? (
    <div className="status">Failed to load</div>
  ) : status === "loading" ? (
    <div className="status">Loading...</div>
  ) : !data.length ? (
    <div className="status">No data to display</div>
  ) : (
    <div className="newProductHolder">
      <div className="selectHolder">
        <div className="newProductForm">
          <select
            name="select"
            className="select"
            value={selectedItem}
            onChange={(e) => handleSelection(e)}
          >
            <option value="slices">Slices</option>
            <option value="regular">Regular</option>
            <option value="album">Album</option>
            <optgroup label="Albums" className="albumsOptGroup">
              {data.map((el, index) => {
                return (
                  <option
                    value={el.title}
                    key={el._id}
                    index={index}
                    title={el.title}
                  >
                    {el.title}
                  </option>
                );
              })}
            </optgroup>
          </select>
          <div className="inputHolder" id="inputHolder" />
          {MAIN_TYPES.includes(selectedItem) && (
            <input
              className="formTitleInput"
              placeholder={`New ${selectedDisplayItem} title`}
            />
          )}
          {(selectedItem === "regular" || selectedItem === "slices") && (
            <input
              className="formPriceInput"
              placeholder={`New ${selectedDisplayItem} price`}
            />
          )}
          {!MAIN_TYPES.includes(selectedItem) && (
            <div className="inputHolder" id="inputHolder">
              <div className="albumItemTitle">{`New ${selectedDisplayItem} item`}</div>
              <span className="formFirstPhotoSpan">
                <label className="{id}Label">{`New ${selectedDisplayItem} first photo?`}</label>
                <input className="formFirstPhotoInput" type="checkbox" />
              </span>
            </div>
          )}
          {selectedItem !== "album" && (
            <>
              <input
                className="formFileInput"
                placeholder={`New ${selectedDisplayItem} image`}
                type="file"
              />
              <img className="displayNewImg" src={src} id="img" alt="" />
            </>
          )}
        </div>
        <div className="btnHolder">
          <button className="newProductButton">SUBMIT</button>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
