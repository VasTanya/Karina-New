import React from 'react'
import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { fetch_myDesign_Order } from '../redux/slice/getUrl_MyDesign';

function MyDesign() {
    const dispatch = useDispatch()
    const image = useRef(null);
    const [name, setName] = useState();
    const [phone, setPhone] = useState();
    const [email, setEmail] = useState();
    const [size, setSize] = useState();
    const [filling, setFilling] = useState();
    const [comment, setComment] = useState();

    const handleSubmit = (e) => {
        const userImage = image.current.value
        e.preventDefault();
        const myDesignRequest = {
            image: userImage,
            name: e.target[1].value,
            phone: e.target[2].value,
            email: e.target[3].value,
            size: e.target[4].value,
            filling: e.target[5].value,
            comment: e.target[6].value,
        };
        console.log(myDesignRequest);

        const url_request_myDesign = `${process.env.REACT_APP_API_URL}/myorder`;
        dispatch(fetch_myDesign_Order({ url: url_request_myDesign, datainp: myDesignRequest }));
        // navigate("/sentRequest");

    };

    return (
        <div className='add_your_photo'>
            <form onSubmit={handleSubmit} className="design_form" action="">
                <h6>Send a request to calculate the cost of a cake with your design:</h6>
               
                <input ref={image} type="file" name="userfile[]" required />
                <input value={name} type="text" placeholder="Youre name" />
                <input value={phone} type="text" required placeholder="Youre phone*" />
                <input value={email} type="text" required placeholder="Youre email*" />
                <input value={size} type="text" placeholder="Size(inches)" />
                <input value={filling} type="text" placeholder="Cake filling" />
                <textarea value={comment} placeholder='add your comment' name="coment" cols="25" rows="1"></textarea>
                <button>Send</button>
            </form>
        </div>
    )
}

export default MyDesign