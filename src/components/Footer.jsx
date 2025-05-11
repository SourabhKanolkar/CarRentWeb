import { IconMail, IconPhoneCall } from "@tabler/icons-react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <footer>
        <div className="container">
          <div className="footer-content">
            <ul className="footer-content__1">
              <li>
                <span>CAR</span> Rental
              </li>
              <li>
                We offers a big range of vehicles for all your driving needs. We
                have the perfect car to meet your needs.
              </li>
              <li>
                <a href="tel:123456789">
                  <IconPhoneCall /> &nbsp;91585 60561
                </a>
              </li>

              <li>
                <a
                  href="mailto: 
                carrental@gmail.com"
                >
                  <IconMail />
                  &nbsp; samiksha@gmail.com
                </a>
              </li>

              {/* <li>
                <a
                  style={{ fontSize: "14px" }}
                  target="_blank"
                  rel="noreferrer"
                  href="https://github.com/stazrouti/"
                >
                  Design by Saurabh5_X_51
                </a>
              </li> */}
            </ul>

            <ul className="footer-content__2">
              <li>Car Rental</li>
              <li>
                {/* <a href="#home">New York</a> */}
                <Link to='/home'>Home</Link>
              </li>
              <li>
                <Link to='/about'>About</Link>
              </li>
              <li>
               <Link to='/team'>Team</Link>
              </li>
              <li>
              <Link to='/contact'>Contact</Link>
              </li>
              <li>
              <Link to='/models'>Models</Link>
              </li>
            </ul>

            <ul className="footer-content__2">
              <li>Working Hours</li>
              <li>Mon - Fri: 9:00AM - 9:00PM</li>
              <li>Sat: 9:00AM - 19:00PM</li>
              <li>Sun: Closed</li>
            </ul>

            {/* <ul className="footer-content__2">
              <li>Subscription</li>
              <li>
                <p>Subscribe your Email address for latest news & updates.</p>
              </li>
              <li>
                <input type="email" placeholder="Enter Email Address"></input>
              </li>
              <li>
                <button className="submit-email">Submit</button>
              </li>
            </ul> */}
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
