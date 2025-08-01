import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchSlice as fetchAlbums } from "../redux/getAlbums";
import { fetchSlice as createSlice } from "../redux/createSlice";

import { uploadImage } from "../firebase/functions/uploadImage";
import "../css/AddProducts.css";
import IsAddingModal from "../components/IsAddingModal";

const MAIN_TYPES = ["slices", "regular", "albums"];

function AddProduct() {
  const dispatch = useDispatch();
  const { data, status } = useSelector((store) => store.albums);

  const [selectedItem, setSelectedItem] = useState("slices");
  const [selectedDisplayItem, setSelectedDisplayItem] = useState("Slices");
  const [disabled, setDisabled] = useState(true);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [checkbox, setCheckbox] = useState(false);
  const [file, setFile] = useState(null);
  const [src, setSrc] = useState(null);

  const [inProgress, setInProgress] = useState(false);
  const [path, setPath] = useState("");
  const [message, setMessage] = useState("");

  const handleSelection = (e) => {
    setSelectedItem(e.target.value);
    setSelectedDisplayItem(e.target.options[e.target.selectedIndex].text);

    setTitle("");
    setPrice("");
    setFile(null);
    setSrc(null);
    setCheckbox(false);

    setDisabled(true);
    setInProgress(false);
    setPath("");
    setMessage("");
  };

  const validateTitle = (value) => {
    setTitle(value.trim());
  };

  const validatePrice = (value) => {
    if (!isNaN(value) && value.trim() !== "") {
      setPrice(value);
    } else {
      setPrice("");
    }
  };

  const validateFile = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) {
      setDisabled(true);
    } else {
      setDisabled(false);
      setFile(selectedFile);
      setSrc(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e) => {
    setInProgress(true);
    let pathToSet;
    if (MAIN_TYPES.includes(selectedItem)) {
      pathToSet =
        selectedItem !== "albums" ? `basics/${selectedItem}` : selectedItem;
    } else {
      pathToSet = `albums/${selectedItem}`;
    }

    setPath(pathToSet);

    const dataToSubmit = {
      ...(title && { title }),
      ...(price && { price: price.includes("$") ? price : `$${price}` }),
      ...(checkbox && { tag: "firstPhoto" }),
    };
    if (selectedItem !== "albums") {
      const content = await uploadImage(selectedDisplayItem, file);
      dataToSubmit.src = content;
    }

    const result = await dispatch(
      createSlice({ path: pathToSet, data: dataToSubmit })
    ).unwrap();

    if (result.message) {
      setMessage(result.message);
    }
  };

  useEffect(() => {
    const isAlbumItem = data.some((item) => item._id === selectedItem);
    const isPriceValid = !isNaN(price) && price.trim() !== "";
    const isFileValid = selectedItem !== "albums" ? file !== null : true;
    const isTitleValid = title.trim() !== "";

    const condition = isAlbumItem
      ? !isFileValid
      : selectedItem === "albums"
        ? !isTitleValid
        : !(isTitleValid && isPriceValid && isFileValid);

    setDisabled(condition);
  }, [title, price, file, selectedItem, data]);

  useEffect(() => {
    dispatch(fetchAlbums());
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
            <option value="albums">Album</option>
            {data?.length && (
              <optgroup label="Albums" className="albumsOptGroup">
                {data.map((el, index) => {
                  return (
                    <option
                      value={el._id}
                      key={el._id}
                      index={index}
                      title={el.title}
                    >
                      {el.title}
                    </option>
                  );
                })}
              </optgroup>
            )}
          </select>
          <div className="inputHolder" id="inputHolder" />
          {MAIN_TYPES.includes(selectedItem) && (
            <input
              className="formTitleInput"
              placeholder={`New ${selectedDisplayItem} title`}
              value={title}
              onChange={(e) => validateTitle(e.target.value)}
            />
          )}
          {(selectedItem === "regular" || selectedItem === "slices") && (
            <input
              className="formPriceInput"
              placeholder={`New ${selectedDisplayItem} price`}
              value={price}
              onChange={(e) => validatePrice(e.target.value)}
            />
          )}
          {!MAIN_TYPES.includes(selectedItem) && (
            <div className="inputHolder" id="inputHolder">
              <div className="albumItemTitle">{`New ${selectedDisplayItem} item`}</div>
              <span className="formFirstPhotoSpan">
                <label className="{id}Label">{`New ${selectedDisplayItem} first photo?`}</label>
                <input
                  className="formFirstPhotoInput"
                  type="checkbox"
                  onChange={(e) => setCheckbox(e.target.checked)}
                />
              </span>
            </div>
          )}
          {selectedItem !== "albums" && (
            <>
              <input
                className="formFileInput"
                placeholder={`New ${selectedDisplayItem} image`}
                type="file"
                accept="image/*"
                onChange={(e) => validateFile(e)}
              />
              <img className="displayNewImg" src={src} id="img" alt="" />
            </>
          )}
        </div>
        <div className="btnHolder">
          <button
            className="newProductButton"
            disabled={disabled}
            onClick={handleSubmit}
          >
            SUBMIT
          </button>
        </div>
      </div>
      {inProgress && (
        <IsAddingModal
          item={selectedDisplayItem}
          path={path}
          result={message}
        />
      )}
    </div>
  );
}

export default AddProduct;
