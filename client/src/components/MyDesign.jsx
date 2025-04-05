import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetch_myDesign_Order } from "../redux/slice/getUrl_MyDesign";
import { useNavigate } from "react-router-dom";

function MyDesign() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status } = useSelector((store) => store.getUrl_MyDesign);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const url_request_myDesign = `${process.env.REACT_APP_API_URL}/email/mydesign`;

    try {
      dispatch(fetch_myDesign_Order({ url: url_request_myDesign, formData }));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (status === "loading") {
      navigate("/requestPending");
    } else if (status === "successful") {
      navigate("/sentRequest");
    } else if (status === "error") {
      navigate("/error");
    }
  }, [status, navigate]);

  return (
    <div className="add_your_photo">
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="design_form"
        action=""
      >
        <h6>
          Send a request to calculate the cost of a cake with your design:
        </h6>

        <input
          name="img"
          type="file"
          required
          accept="image/*,.heic,.heif,.webp,.bmp,.tiff,.ico"
        />
        <input name="name" type="text" placeholder="Your name" />
        <input name="phone" type="number" required placeholder="Your phone*" />
        <input name="email" type="email" required placeholder="Your email*" />
        <input name="size" type="text" placeholder="Size(inches)" />
        <input name="filling" type="text" placeholder="Cake filling" />
        <input
          name="pick_up_date"
          type="text"
          required
          placeholder="Pick up date*"
        />
        <input
          name="pick_up_location"
          type="text"
          required
          placeholder="Pick up location*"
        />
        <textarea
          name="comment"
          placeholder="Add your comment"
          cols="25"
          rows="1"
        ></textarea>
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default MyDesign;
