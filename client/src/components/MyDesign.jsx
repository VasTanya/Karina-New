import React from 'react'
import { useState, useRef } from 'react';

function MyDesign() {
    const image = useRef(null);
    const [name, setName] = useState();
    const [phone, setPhone] = useState();
    const [email, setEmail] = useState();
    const [size, setSize] = useState();
    const [filling, setFilling] = useState();

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
        };
        console.log(myDesignRequest);

    };

    return (
        <div className='add_your_photo'>
            <form onSubmit={handleSubmit} className="design_form" action="">
                <h6>Send a request to calculate the cost of a cake with my design:</h6>
                {/* <label for="uploadbtn" class="uploadButton">Загрузить файл<div></div></label>
                <input style="opacity: 0; z-index: -1;" multiple type="file" name="upload" id="uploadbtn" onchange='document.querySelector(".uploadButton div").innerHTML = Array.from(this.files).map(f => f.name).join("<br />")' /> */} 

                {/* <label htmlFor="uploadbtn" className='input-file'>Add your photo<div></div>
                    <input ref={image} type="file" name="userfile[]" required />
                    <span className="input-file-btn">Add your photo</span>
                </label> */}
                
                {/* <input style={{opacity: '0', z-index: '-1'}} multiple type="file" name="upload" id="uploadbtn" onchange='document.querySelector(".uploadButton div").innerHTML = Array.from(this.files).map(f => f.name).join("<br />")' /> */}
                <input ref={image} type="file" name="userfile[]" required />
                <input value={name} type="text" placeholder="Youre name" />
                <input value={phone} type="text" required placeholder="Youre phone*" />
                <input value={email} type="text" required placeholder="Youre email*" />
                <input value={size} type="text" placeholder="Size(inches)" />
                <input value={filling} type="text" placeholder="Cake filling" />
                <textarea placeholder='add your comment' name="coment" cols="25" rows="1"></textarea>
                <button>Send</button>
            </form>
        </div>
    )
}

export default MyDesign