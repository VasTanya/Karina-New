import { Link } from "react-router-dom";
import React from "react";

function ContactUs() {
  return (
    <div className="our_contacts">
      <div className="contacts">
        <p>Contacts</p>
      </div>
      <div className="phone">
        <span className="call">
          <Link style={{ textDecoration: "none" }} to={"tel:" + 18182406718}>
            <p className="call">
              {" "}
              <span>
                <i className="fa fa-phone" aria-hidden="true"></i>
              </span>{" "}
              (818) 240-6718
            </p>
          </Link>
          <Link
            style={{ textDecoration: "none" }}
            to={"mailto:support@karinas515.com"}
          >
            <p className="mail">k2406718@gmail.com</p>
          </Link>
          <p></p>
        </span>
      </div>
      <div className="map">
        <p>515 S Glendale Ave, Glendale, CA 91205</p>
        <p>Open Mon - Sun | 8am - 8pm</p>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1388.416103292119!2d-118.25106114929983!3d34.140492744750595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c102f6269c7d%3A0xbaafad57784c20ad!2sKarina&#39;s%20Cake%20House!5e0!3m2!1sru!2sus!4v1683924909147!5m2!1sru!2sus"
          title="Karinas Map"
        ></iframe>
      </div>
      <div className="map">
        <p>13521 Sherman Way, Van Nuys, CA 91405</p>
        <p>Open Mon - Sun | 8am - 8pm</p>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3299.851443468355!2d-118.4275615!3d34.2012719!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c296e8a4333a99%3A0xfd535c8617ce3e06!2s13521%20Sherman%20Way%2C%20Van%20Nuys%2C%20CA%2091405!5e0!3m2!1sru!2sus!4v1742260832690!5m2!1sru!2sus"
          title="Karinas Map"
        ></iframe>
      </div>
    </div>
  );
}

export default ContactUs;
