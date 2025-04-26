import React from 'react'
import Footer from "../components/Footer";
import HeroPages from "../components/HeroPages";
// import CarImg1 from "../images/cars-big/audi-box.png";
// import CarImg6 from "../images/cars-big/passat-box.png";
import DioImg from  "../images/bikes-big/dio-1.jpg"
import ActivaImg from "../images/bikes-big/activa-2.jpg"
import { Link } from "react-router-dom";
import { IconCar, IconPhone, IconStar } from "@tabler/icons-react";

export default function BikePage() {
  return (
   <>
     <section className="models-section">
        <HeroPages name="Bike Models" />
        <div className="container">
          <div className="models-div">

    
            <div className="models-div__box">
              <div className="models-div__box__img">
                <img src={DioImg} alt="car_img" />
                <div className="models-div__box__descr">
                  <div className="models-div__box__descr__name-price">
                    <div className="models-div__box__descr__name-price__name">
                      <p>Honda </p>
                      <span>
                        <IconStar width={15} height={15} />
                        <IconStar width={15} height={15} />
                        <IconStar width={15} height={15} />
                        <IconStar width={15} height={15} />
                        <IconStar width={15} height={15} />
                      </span>
                    </div>
                    <div className="models-div__box__descr__name-price__price">
                      <h4>RS 700</h4>
                      <p>per day</p>
                    </div>
                  </div>
                  <div className="models-div__box__descr__name-price__details">
                    <span>
                      <IconCar /> &nbsp; Dio
                    </span>
                    <span style={{ textAlign: "right" }}>
                      4/5 &nbsp; <IconCar />
                    </span>
                    <span>
                      <IconCar /> &nbsp; Manual
                    </span>
                    <span style={{ textAlign: "right" }}>
                      Petrol &nbsp; <IconCar />
                    </span>

                    <span>
                      <IconCar /> &nbsp; PUC
                    </span>
                    <span style={{ textAlign: "right" }}>
                      26/09/26 &nbsp; 
                    </span>
                  </div>
                  <div className="models-div__box__descr__name-price__btn">
                    <Link onClick={() => window.scrollTo(0, 0)} to="/">
                      Book Ride
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="models-div__box">
              <div className="models-div__box__img">
                <img src={ActivaImg} alt="car_img" />
                <div className="models-div__box__descr">
                  <div className="models-div__box__descr__name-price">
                    <div className="models-div__box__descr__name-price__name">
                      <p>Honda </p>
                      <span>
                        <IconStar width={15} height={15} />
                        <IconStar width={15} height={15} />
                        <IconStar width={15} height={15} />
                        <IconStar width={15} height={15} />
                        <IconStar width={15} height={15} />
                      </span>
                    </div>
                    <div className="models-div__box__descr__name-price__price">
                      <h4>RS 700</h4>
                      <p>per day</p>
                    </div>
                  </div>
                  <div className="models-div__box__descr__name-price__details">
                    <span>
                      <IconCar /> &nbsp; Activa 125
                    </span>
                    <span style={{ textAlign: "right" }}>
                      4/5 &nbsp; <IconCar />
                    </span>
                    <span>
                      <IconCar /> &nbsp; Manual
                    </span>
                    <span style={{ textAlign: "right" }}>
                      Petrol &nbsp; <IconCar />
                    </span>

                    <span>
                      <IconCar /> &nbsp; PUC
                    </span>
                    <span style={{ textAlign: "right" }}>
                      26/09/26 &nbsp; 
                    </span>
                  </div>
                  <div className="models-div__box__descr__name-price__btn">
                    <Link onClick={() => window.scrollTo(0, 0)} to="/">
                      Book Ride
                    </Link>
                  </div>
                </div>
              </div>
            </div>


         

          </div>
        </div>
        <div className="book-banner">
          <div className="book-banner__overlay"></div>
          <div className="container">
            <div className="text-content">
              <h2>Book a car by getting in touch with us</h2>
              <span>
                <IconPhone width={40} height={40} />
                <h3> 91585 60561</h3>
              </span>
            </div>
          </div>
        </div>
        <Footer />
      </section>
   
   
   </>
  )
}
