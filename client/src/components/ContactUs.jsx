import { Link } from "react-router-dom"
import React from 'react'

function ContactUs() {
  return (
    <div className="our_contacts">
      <div className="contacts">
        <p>Contacts</p>
      </div>
      <div className="phone">
        <span className="call">
          <Link style={{ textDecoration: 'none' }} to={'tel:' +18182406718}>
            <p className="call"> <span><i className="fa fa-phone" aria-hidden="true"></i></span>  (818) 240-6718</p>
          </Link>
          <Link style={{ textDecoration: 'none' }} to={'mailto:karinas515@gmail.com'}>
           <p className="mail">Karinas515@gmail.com</p>
          </Link>
           <p></p>
        </span>
      </div>
      <div className="map">
        <p>
          515 S Glendale Ave, Glendale, CA 91205
        </p>
        <p>Open Mon - Sun | 8am - 8pm</p>
        <iframe 

          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1388.416103292119!2d-118.25106114929983!3d34.140492744750595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c102f6269c7d%3A0xbaafad57784c20ad!2sKarina&#39;s%20Cake%20House!5e0!3m2!1sru!2sus!4v1683924909147!5m2!1sru!2sus"

          title = 'Karinas Map'
        >
        </iframe>
      </div>
    </div>

  )
}

export default ContactUs