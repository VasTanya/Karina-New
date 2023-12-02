import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import qs from "qs";
import { fetch_Id_Albums_Item } from "../redux/slice/getUrl_Id_Item";
import { fetch_Request } from "../redux/slice/getUrl_Request";
import IsLoading from "./IsLoading";
import { Link, useNavigate } from "react-router-dom";

function AskCoustOfThisCake() {
  const {data_request, status1} = useSelector((store)=> store.getUrl_Request) 
  
  const navigate = useNavigate();
  const [idCakeOne, setIdCakeOne] = useState();
  const [idItemOne, setIdItemOne] = useState();
  const [idItemPhotoOne, setIdItemPhotoOne] = useState();
  const [album_idOne, setAlbum_idOne] = useState();
  const [item_idOne, setItem_idOne] = useState();

  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [size, setSize] = useState();
  const [filling, setFilling] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    const urlLink = qs.parse(window.location.search.substring(1));
    setIdCakeOne(urlLink.idCake);
    setIdItemOne(urlLink.idItem);
    setIdItemPhotoOne(urlLink.idItemPhoto);
    setAlbum_idOne(urlLink.album_id);
    setItem_idOne(urlLink.item_id);
  }, []);

  const handleSubmit = async(e) => {
    e.preventDefault();
    const newRequest = {
      name: e.target[0].value,
      phone: e.target[1].value,
      email: e.target[2].value,
      size: e.target[3].value,
      filling: e.target[4].value,
      img: idItemPhotoOne,
      cakeCode: idCakeOne + "." + idItemOne,
    };

    const url_request = `${process.env.REACT_APP_API_URL}/request`;
    // dispatch(fetch_Request({ url: url_request, datainp: newRequest }));
    // // console.log('status1', status1);
    // status1 === "error"? navigate("/error"):
    // navigate("/sentRequest")
    try {
      dispatch(fetch_Request({ url: url_request, datainp: newRequest }));
     
     if (status1 === "successful" || status1 === 'loading' ) {
       navigate("/sentRequest");
      
     } else  {
       navigate("/error");
     } 
   } catch (error) {
     console.error('Error:', error);
   }
   console.log(status1);
  
  };

  return (
    <div className="one_cake_div_and_mail">
      <div className="one_cake_div">
        <img src={idItemPhotoOne} alt="" />
        <p>{idCakeOne + "." + idItemOne}</p>
      </div>

      <form onSubmit={handleSubmit} className="mail_form" action="">
        <h6>Send a request to calculate the cost of this cake:</h6>
        <img src={idItemPhotoOne} alt="" />
        <p>{idCakeOne + "." + idItemOne}</p>

        <input value={name} type="text" placeholder="Your name" />
        <input value={phone} type="number" required placeholder="Your phone*" />
        <input value={email} type="email" required placeholder="Your email*" />
        <input value={size} type="text" placeholder="Size(inches)" />
        <input value={filling} type="text" placeholder="Cake filling" />
        <button>Send</button>
      </form>
    </div>
  );
}

export default AskCoustOfThisCake;
