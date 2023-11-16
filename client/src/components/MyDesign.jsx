// import React from 'react'
// import { useState, useRef } from 'react';
// import { useDispatch } from 'react-redux';
// import { fetch_myDesign_Order } from '../redux/slice/getUrl_MyDesign';

// function MyDesign() {
//     const dispatch = useDispatch()
//     // const image = useRef(null);
//     // const name = useRef(null);
//     // const phone = useRef(null);
//     // const email = useRef(null);
//     // const size = useRef(null);
//     // const filling = useRef(null);
//     // const comment = useRef(null);

//     const handleSubmit = (e) => {
//         // const designImage = image.current.value
//         // const inp_name = name.current.value
//         // const inp_phone = phone.current.value
//         // const inp_email = email.current.value
//         // const inp_size = size.current.value
//         // const inp_filling = filling.current.value
//         // const inp_comment = comment.current.value
//         // setFile(designImage)
//         // console.log('designImage',designImage);
        
//         e.preventDefault();
//         const formData = new FormData(e.currentTarget)
//         const data = Object.fromEntries(formData)
//         console.log('data.img',data.img.name);
//         // formData.append('img', designImage)
//         // formData.append('name', inp_name)
//         // formData.append('phone', inp_phone)
//         // formData.append('email', inp_email)
//         // formData.append('size', inp_size)
//         // formData.append('filling', inp_filling)
//         // formData.append('comment', inp_comment)
//         // for (var pair of formData.entries()) {
//         //     console.log(pair[0]+ ', ' + pair[1]); 
//         // }

//         const url_request_myDesign = `${process.env.REACT_APP_API_URL}/request/mydesign`;
//         dispatch(fetch_myDesign_Order({ url: url_request_myDesign, datainp: data }));
//         // navigate("/sentRequest");

//     };

//     return (
//         <div className='add_your_photo'>
//             <form onSubmit={handleSubmit} encType="multipart/form-data" className="design_form" action="">
//                 <h6>Send a request to calculate the cost of a cake with your design:</h6>
               
//                 <input name="img" type="file"  /*ref={image}*/ required accept='image/*'/>
//                 <input name='name' type="text" /*ref={name}*/ placeholder="Youre name" />
//                 <input name='phone' type="text" /*ref={phone}*/ required placeholder="Youre phone*" />
//                 <input name='email' type="text" /*ref={email}*/ required placeholder="Youre email*" />
//                 <input  name='size' type="text" /*ref={size}*/ placeholder="Size(inches)" />
//                 <input  name='filling' type="text" /*ref={filling}*/ placeholder="Cake filling" />
//                 <textarea  name='comment'/* ref={comment}*/ placeholder='add your comment' cols="25" rows="1"></textarea>
//                 <button>Send</button>
//             </form>
//         </div>
//     )
// }

// export default MyDesign

import React from 'react';
import { useDispatch } from 'react-redux';
import { fetch_myDesign_Order } from '../redux/slice/getUrl_MyDesign';

function MyDesign() {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    const url_request_myDesign = `${process.env.REACT_APP_API_URL}/request/mydesign`;
    dispatch(fetch_myDesign_Order({ url: url_request_myDesign, datainp: data }));
  };

  return (
    <div className='add_your_photo'>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="design_form" action="">
        <h6>Send a request to calculate the cost of a cake with your design:</h6>

        <input name="img" type="file" required accept='image/*'/>
        <input name='name' type="text" placeholder="Your name" />
        <input name='phone' type="text" required placeholder="Your phone*" />
        <input name='email' type="text" required placeholder="Your email*" />
        <input name='size' type="text" placeholder="Size(inches)" />
        <input name='filling' type="text" placeholder="Cake filling" />
        <textarea name='comment' placeholder='Add your comment' cols="25" rows="1"></textarea>
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default MyDesign;