import { useEffect, useState } from "react";
import CarAudi from "../images/cars-big/audia1.jpg";
import CarGolf from "../images/cars-big/golf6.jpg";
import CarToyota from "../images/cars-big/toyotacamry.jpg";
import CarBmw from "../images/cars-big/bmw320.jpg";
import CarMercedes from "../images/cars-big/benz.jpg";
import CarPassat from "../images/cars-big/passatcc.jpg";
import { IconCar, IconInfoCircleFilled, IconX } from "@tabler/icons-react";
import { IconMapPinFilled } from "@tabler/icons-react";
import { IconCalendarEvent } from "@tabler/icons-react";
import { db } from "../firebase-config";
import { collection, addDoc, Timestamp } from "firebase/firestore";

function BookCar() {
  const [modal, setModal] = useState(false);
  const [carType, setCarType] = useState("");
  const [pickUp, setPickUp] = useState("");
  const [dropOff, setDropOff] = useState("");
  const [pickTime, setPickTime] = useState("");
  const [dropTime, setDropTime] = useState("");
  const [carImg, setCarImg] = useState("");

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipCode] = useState("");

  const amount = 1000; // ₹1000 hardcoded

  const [paymentMethod, setPaymentMethod] = useState("Online");


  //razorpay intregation function
  const handleCreateOrder = (e) => {
    e.preventDefault();
  
    if (paymentMethod === "COD") {
      confirmBooking(); // No Razorpay
      return;
    }
  
    const options = {
      key: "rzp_live_PuECn9YXAKoa7f",
      amount: amount * 100,
      currency: "INR",
      name: "OS DIA DE FESTA",
      description: "Car booking transaction",
      image: "",
      handler: function (response) {
        console.log("Payment successful:", response);
        confirmBooking();
      },
      prefill: {
        name: name,
        email: email,
        contact: phone,
      },
      notes: {
        address: address,
      },
      theme: {
        color: "#61dafb",
      },
    };
  
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const openModal = (e) => {
    e.preventDefault();
    const errorMsg = document.querySelector(".error-message");
    if (
      pickUp === "" ||
      dropOff === "" ||
      pickTime === "" ||
      dropTime === "" ||
      carType === ""
    ) {
      errorMsg.style.display = "flex";
    } else {
      setModal(true);
      const modalDiv = document.querySelector(".booking-modal");
      modalDiv.scroll(0, 0);
      errorMsg.style.display = "none";
    }
  };

  useEffect(() => {
    document.body.style.overflow = modal ? "hidden" : "auto";
  }, [modal]);

  const confirmBooking = async () => {
    const bookingData = {
      carType,
      pickUp,
      dropOff,
      pickTime,
      dropTime,
      amount,
      paymentMethod, // add this
      customer: {
        firstName: name,
        lastName,
        phone,
        age,
        email,
        address,
        city,
        zipcode,
      },
      bookedAt: Timestamp.now(),
    };
  
    try {
      await addDoc(collection(db, "bookings"), bookingData);
      setModal(false);
      const doneMsg = document.querySelector(".booking-done");
      doneMsg.style.display = "flex";
    } catch (error) {
      console.error("Error booking car:", error);
      alert("Something went wrong while booking. Please try again.");
    }
  };
  

  const handleCar = (e) => {
    setCarType(e.target.value);
    setCarImg(e.target.value);
  };

  const handlePick = (e) => setPickUp(e.target.value);
  const handleDrop = (e) => setDropOff(e.target.value);
  const handlePickTime = (e) => setPickTime(e.target.value);
  const handleDropTime = (e) => setDropTime(e.target.value);
  const handleName = (e) => setName(e.target.value);
  const handleLastName = (e) => setLastName(e.target.value);
  const handlePhone = (e) => setPhone(e.target.value);
  const handleAge = (e) => setAge(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handleAddress = (e) => setAddress(e.target.value);
  const handleCity = (e) => setCity(e.target.value);
  const handleZip = (e) => setZipCode(e.target.value);

  let imgUrl;
  switch (carImg) {
    case "Audi A1 S-Line":
      imgUrl = CarAudi;
      break;
    case "VW Golf 6":
      imgUrl = CarGolf;
      break;
    case "Toyota Camry":
      imgUrl = CarToyota;
      break;
    case "BMW 320 ModernLine":
      imgUrl = CarBmw;
      break;
    case "Mercedes-Benz GLK":
      imgUrl = CarMercedes;
      break;
    case "VW Passat CC":
      imgUrl = CarPassat;
      break;
    default:
      imgUrl = "";
  }

  const hideMessage = () => {
    const doneMsg = document.querySelector(".booking-done");
    doneMsg.style.display = "none";
  };

  return (
    <>
      <section id="booking-section" className="book-section">
        <div
          onClick={openModal}
          className={`modal-overlay ${modal ? "active-modal" : ""}`}
        ></div>

        <div className="container">
          <div className="book-content">
            <div className="book-content__box">
              <h2>Book a car</h2>
              <p className="error-message">
                All fields required! <IconX width={20} height={20} />
              </p>
              <p className="booking-done">
                Check your email to confirm an order.{" "}
                <IconX width={20} height={20} onClick={hideMessage} />
              </p>

              <form className="box-form">
                <div className="box-form__car-type">
                  <label>
                    <IconCar className="input-icon" /> &nbsp; Select Your Car
                    Type <b>*</b>
                  </label>
                  <select value={carType} onChange={handleCar}>
                    <option>Select your car type</option>
                    <option value="Audi A1 S-Line">Audi A1 S-Line</option>
                    <option value="VW Golf 6">VW Golf 6</option>
                    <option value="Toyota Camry">Toyota Camry</option>
                    <option value="BMW 320 ModernLine">BMW 320 ModernLine</option>
                    <option value="Mercedes-Benz GLK">Mercedes-Benz GLK</option>
                    <option value="VW Passat CC">VW Passat CC</option>
                  </select>
                </div>

                <div className="box-form__car-type">
                  <label>
                    <IconMapPinFilled className="input-icon" /> &nbsp; Pick-up{" "}
                    <b>*</b>
                  </label>
                  <select value={pickUp} onChange={handlePick}>
                    <option>Select pick up location</option>
                    <option>Belgrade</option>
                    <option>Novi Sad</option>
                    <option>Nis</option>
                    <option>Kragujevac</option>
                    <option>Subotica</option>
                  </select>
                </div>

                <div className="box-form__car-type">
                  <label>
                    <IconMapPinFilled className="input-icon" /> &nbsp; Drop-of{" "}
                    <b>*</b>
                  </label>
                  <select value={dropOff} onChange={handleDrop}>
                    <option>Select drop off location</option>
                    <option>Novi Sad</option>
                    <option>Belgrade</option>
                    <option>Nis</option>
                    <option>Kragujevac</option>
                    <option>Subotica</option>
                  </select>
                </div>

                <div className="box-form__car-time">
                  <label htmlFor="picktime">
                    <IconCalendarEvent className="input-icon" /> &nbsp; Pick-up{" "}
                    <b>*</b>
                  </label>
                  <input
                    id="picktime"
                    value={pickTime}
                    onChange={handlePickTime}
                    type="date"
                  />
                </div>

                <div className="box-form__car-time">
                  <label htmlFor="droptime">
                    <IconCalendarEvent className="input-icon" /> &nbsp; Drop-of{" "}
                    <b>*</b>
                  </label>
                  <input
                    id="droptime"
                    value={dropTime}
                    onChange={handleDropTime}
                    type="date"
                  />
                </div>

                <button onClick={openModal} type="submit">
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      <div className={`booking-modal ${modal ? "active-modal" : ""}`}>
        <div className="booking-modal__title">
          <h2>Complete Reservation</h2>
          <IconX onClick={() => setModal(false)} />
        </div>

        <div className="booking-modal__message">
          <h4>
            <IconInfoCircleFilled /> Upon completing this reservation enquiry,
            you will receive:
          </h4>
          <p>
            Your rental voucher to produce on arrival at the rental desk and a
            toll-free customer support number.
          </p>
        </div>

        <div className="booking-modal__car-info">
          <div className="dates-div">
            <div className="booking-modal__car-info__dates">
              <h5>Location & Date</h5>
              <span>
                <IconMapPinFilled />
                <div>
                  <h6>Pick-Up Date & Time</h6>
                  <p>
                    {pickTime} / <input type="time" className="input-time" />
                  </p>
                </div>
              </span>
            </div>

            <div className="booking-modal__car-info__dates">
              <span>
                <IconMapPinFilled />
                <div>
                  <h6>Drop-Off Date & Time</h6>
                  <p>
                    {dropTime} / <input type="time" className="input-time" />
                  </p>
                </div>
              </span>
            </div>

            <div className="booking-modal__car-info__dates">
              <span>
                <IconMapPinFilled />
                <div>
                  <h6>Pick-Up Location</h6>
                  <p>{pickUp}</p>
                </div>
              </span>
            </div>

            <div className="booking-modal__car-info__dates">
              <span>
                <IconMapPinFilled />
                <div>
                  <h6>Drop-Off Location</h6>
                  <p>{dropOff}</p>
                </div>
              </span>
            </div>
          </div>

          <div className="booking-modal__car-info__model">
            <h5>
              <span>Car -</span> {carType}
            </h5>
            <p style={{ fontWeight: "bold", marginTop: "10px" }}>
              ₹{amount} / day
            </p>
            {imgUrl && <img src={imgUrl} alt="car_img" />}
          </div>
        </div>

        <div className="booking-modal__person-info">
          <h4>Personal Information</h4>
          <form className="info-form">
            <div className="info-form__2col">
              <span>
                <label>First Name *</label>
                <input value={name} onChange={handleName} type="text" />
              </span>
              <span>
                <label>Last Name *</label>
                <input value={lastName} onChange={handleLastName} type="text" />
              </span>
              <span>
                <label>Phone *</label>
                <input value={phone} onChange={handlePhone} type="tel" />
              </span>
              <span>
                <label>Age *</label>
                <input value={age} onChange={handleAge} type="number" />
              </span>
            </div>

            <div className="info-form__1col">
              <span>
                <label>Email *</label>
                <input value={email} onChange={handleEmail} type="email" />
              </span>
              <span>
                <label>Address *</label>
                <input value={address} onChange={handleAddress} type="text" />
              </span>
            </div>

            <div className="info-form__2col">
              <span>
                <label>City *</label>
                <input value={city} onChange={handleCity} type="text" />
              </span>
              <span>
                <label>Zip Code *</label>
                <input value={zipcode} onChange={handleZip} type="text" />
              </span>
            </div>

            <div className="info-form__1col">
  <span>
    <label>Payment Method *</label>
    <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
      <option value="Online">Online Payment</option>
      <option value="COD">Cash on Delivery (COD)</option>
    </select>
  </span>
</div>

            <div className="reserve-button">
              <button onClick={handleCreateOrder}>Reserve Now</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default BookCar;
