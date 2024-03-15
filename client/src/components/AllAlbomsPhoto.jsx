import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import qs from "qs";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../redux/slice/cakeSlice";
import PaginatioMaterialUi from "./PaginatioMaterialUi";
import { fetch_Id_Albums } from "../redux/slice/getUrl_Id_Albums";
import IsLoading from "./IsLoading";

function AllAlbomsPhoto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentPage } = useSelector((store) => store.cakeSlice);
  const { data_Id_Albums, status } = useSelector(
    (store) => store.getUrl_Id_Albums
  );
  const data_Id_AlbumsAll = data_Id_Albums.data;

  const isLoading = [...new Array(12)].map((_, idx) => <IsLoading key={idx} />);

  const getUrl_Id_Albums = async () => {
    const url_Id_Albums = `${
      process.env.REACT_APP_API_URL
    }/albums/${id}?page=${currentPage}&size=${48}`;
    dispatch(fetch_Id_Albums({ url_Id_Albums }));
  };

  useEffect(() => {
    getUrl_Id_Albums();
    window.scrollTo(0, 0);
  }, [currentPage, id]);

  const onClickPages = (num) => {
    dispatch(setCurrentPage(num));
  };

  const onClickImg = (idCake, idItem, idItemPhoto, album_id, item_id) => {
    const queryString = qs.stringify({
      idCake,
      idItem,
      idItemPhoto,
      album_id,
      item_id,
    });

    navigate(`/cake?${queryString}`);
  };
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
            : data_Id_AlbumsAll.data.map((el) => (
                <div
                  onClick={() =>
                    onClickImg(
                      data_Id_AlbumsAll.albumId.album_number,
                      el.display_number,
                      el.src,
                      data_Id_AlbumsAll.albumId._id,
                      el._id
                    )
                  }
                  key={el.display_number}
                >
                  <div className="one_photo_from_alb">
                    <img src={el.src} alt="" />
                    <div className="title_price">
                      <p>
                        {data_Id_AlbumsAll.albumId.album_number +
                          "." +
                          el.display_number}
                      </p>
                    </div>
                  </div>
                </div>
              ))}{" "}
        </div>
      )}
      <div className="pagination">
        {status === "successful" && (
          <PaginatioMaterialUi
            currentPage={currentPage}
            handleClick={(num) => onClickPages(num)}
          />
        )}
      </div>
    </>
  );
}

export default AllAlbomsPhoto;
