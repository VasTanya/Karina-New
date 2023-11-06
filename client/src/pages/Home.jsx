import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchFirstFoto } from "../redux/slice/getUrlFirstFoto";
import IsLoading from "../components/IsLoading";
import { setCurrentPage } from "../redux/slice/cakeSlice";

function Home() {
  const dispatch = useDispatch();
  const { dataFirstFoto, status } = useSelector(
    (store) => store.getUrlFirstFoto
  );

  const getUrlFirstFoto = async () => {
    console.log(`AAAAAAA: ${process.env.REACT_APP_API_URL}`);
    const urlFirstFoto = `${process.env.REACT_APP_API_URL}/albums/firstPhoto`;
    dispatch(fetchFirstFoto({ urlFirstFoto }));
  };

  useEffect(() => {
    getUrlFirstFoto();
    dispatch(setCurrentPage(1));
  }, []);

  const sortData = dataFirstFoto?.map((el) => el);
  const alreadySortDataFirstFoto = sortData?.sort(
    (a, b) => a.album.album_number - b.album.album_number
  );

  const isLoading = [...new Array(22)].map((_, idx) => <IsLoading key={idx} />);

  return (
    <>
      <div className="choose_cake_div">
        <div className="all_cakes">
          <p>Choose a cake for your celebration</p>
        </div>
      </div>
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
        </div>
      ) : (
        <div className="albums">
          {status === "loading"
            ? isLoading
            : alreadySortDataFirstFoto.map((el) => (
              <Link
                key={el.album._id}
                style={{ textDecoration: "none" }}
                to={`${el.album._id}`}
              >
                <div className="first_foto">
                  {el.firstPhotos.map((photo) => (
                    <img key={photo.display_number} src={photo.src} alt="" />
                  ))}
                  <div className="title_price">
                    <p>
                      {el.album.album_number}.{el.album.title}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          <Link style={{ textDecoration: "none" }}
            to={'/myDesign'}>
            <div className="my_design">
              <img src="./img/my5.jpg" alt="" />
              <div className="title_price">
                <p>Your design</p>
              </div>
            </div>
          </Link>
        </div>
      )}


    </>
  );
}

export default Home;
