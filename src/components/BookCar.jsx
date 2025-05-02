import { useEffect, useState } from "react";
import CarAudi from "../images/cars-big/audia1.jpg";
import CarGolf from "../images/cars-big/golf6.jpg";
import CarToyota from "../images/cars-big/toyotacamry.jpg";
import CarBmw from "../images/cars-big/bmw320.jpg";
import CarMercedes from "../images/cars-big/benz.jpg";
import CarPassat from "../images/cars-big/passatcc.jpg";
import dio from "../images/bikes-big/dio-1.jpg";
import {
  IconCar,
  IconInfoCircleFilled,
  IconX,
  IconMapPinFilled,
  IconCalendarEvent,
} from "@tabler/icons-react";
import { db } from "../firebase-config";
import {
  collection,
  addDoc,
  Timestamp,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import emailjs from "@emailjs/browser";
import DatePicker from "react-datepicker";
import { parseISO, isWithinInterval } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

function BookCar() {
  const [modal, setModal] = useState(false);
  const [carType, setCarType] = useState("");
  const [pickUp, setPickUp] = useState("");
  const [dropOff, setDropOff] = useState("");
  const [pickDate, setPickDate] = useState(null);
  const [dropDate, setDropDate] = useState(null);
  const [carImg, setCarImg] = useState("");
  const [AdharSubmited, setAdharSubmited] = useState("");
  const [LicenceSubmited, setLicenceSubmited] = useState("");

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipCode] = useState("");
  const [bookedRanges, setBookedRanges] = useState([]);

  const amount = 1000;
  const [paymentMethod, setPaymentMethod] = useState("Online");

  const handleCreateOrder = (e) => {
    e.preventDefault();

    if (paymentMethod === "COD") {
      confirmBooking();
      return;
    }

    const options = {
      key: "rzp_live_PuECn9YXAKoa7f",
      amount: amount * 100,
      currency: "INR",
      name: "OS DIA DE FESTA",
      description: "Car booking transaction",
      handler: function (response) {
        console.log("Payment successful:", response);
        confirmBooking();
      },
      prefill: {
        name,
        email,
        contact: phone,
      },
      notes: {
        address,
      },
      theme: {
        color: "#61dafb",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const fetchBookedDates = async (selectedCar) => {
    const bookingsRef = collection(db, "bookings");
    const q = query(bookingsRef, where("carType", "==", selectedCar));
    const querySnapshot = await getDocs(q);
    const ranges = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      ranges.push({
        start: parseISO(data.pickTime),
        end: parseISO(data.dropTime),
      });
    });
    return ranges;
  };

  const isDateBooked = (date) => {
    return bookedRanges.some((range) =>
      isWithinInterval(date, { start: range.start, end: range.end })
    );
  };

  useEffect(() => {
    if (carType) {
      fetchBookedDates(carType).then(setBookedRanges);
    }
  }, [carType]);

  useEffect(() => {
    document.body.style.overflow = modal ? "hidden" : "auto";
  }, [modal]);

  const openModal = (e) => {
    e.preventDefault();
    const errorMsg = document.querySelector(".error-message");
    if (!pickUp || !dropOff || !pickDate || !dropDate || !carType) {
      errorMsg.style.display = "flex";
    } else {
      setModal(true);
      const modalDiv = document.querySelector(".booking-modal");
      modalDiv.scroll(0, 0);
      errorMsg.style.display = "none";
    }
  };

  const confirmBooking = async () => {
    const bookingData = {
      carType,
      pickUp,
      dropOff,
      pickTime: pickDate.toISOString(),
      dropTime: dropDate.toISOString(),
      amount,
      paymentMethod,
      customer: {
        firstName: name,
        lastName,
        phone,
        age,
        email,
        address,
        city,
        zipcode,
        AdharSubmited,
        LicenceSubmited,
      },
      bookedAt: Timestamp.now(),
    };

    try {
      await addDoc(collection(db, "bookings"), bookingData);

      const emailParams = {
        user_name: name,
        email,
        car_type: carType,
        pickup_location: pickUp,
        pickup_date: pickDate.toDateString(),
        dropoff_location: dropOff,
        dropoff_date: dropDate.toDateString(),
        amount,
      };

      await emailjs.send(
        "service_i05uqfo",
        "template_50tz70j",
        emailParams,
        "G2T5AxW2ccVOY7bIt"
      );

      alert("Booking confirmed! Check your email.");
      setModal(false);
      document.querySelector(".booking-done").style.display = "flex";
    } catch (error) {
      console.error("Error booking car:", error);
      alert("Something went wrong while booking. Please try again.");
    }
  };

  const hideMessage = () => {
    document.querySelector(".booking-done").style.display = "none";
  };

  const carImages = {
    "Audi A1 S-Line": CarAudi,
    "VW Golf 6": CarGolf,
    "Toyota Camry": CarToyota,
    "BMW 320 ModernLine": CarBmw,
    "Mercedes-Benz GLK": CarMercedes,
    "VW Passat CC": CarPassat,
    "Honda Dio": dio,
  };

  return (
    <>
      <section id="booking-section" className="book-section">
        <div onClick={openModal} className={`modal-overlay ${modal ? "active-modal" : ""}`}></div>
        <div className="container">
          <div className="book-content">
            <div className="book-content__box">
              <h2>Book a Ride</h2>
              <p className="error-message">All fields required! <IconX /></p>
              <p className="booking-done">Check your email to confirm an order. <IconX onClick={hideMessage} /></p>

              <form className="box-form">
                <div className="box-form__car-type">
                  <label><IconCar /> Select Your Car Type *</label>
                  <select value={carType} onChange={(e) => {
                    setCarType(e.target.value);
                    setCarImg(e.target.value);
                  }}>
                    <option value="">Select your car type</option>
                    {Object.keys(carImages).map((car) => (
                      <option key={car} value={car}>{car}</option>
                    ))}
                  </select>
                </div>

                <div className="box-form__car-type">
                  <label><IconMapPinFilled /> Pick-up *</label>
                  <select value={pickUp} onChange={(e) => setPickUp(e.target.value)}>
                    <option value="">Select pick up location</option>
                    <option>Belgrade</option>
                    <option>Novi Sad</option>
                    <option>Nis</option>
                    <option>Kragujevac</option>
                    <option>Subotica</option>
                  </select>
                </div>

                <div className="box-form__car-type">
                  <label><IconMapPinFilled /> Drop-off *</label>
                  <select value={dropOff} onChange={(e) => setDropOff(e.target.value)}>
                    <option value="">Select drop off location</option>
                    <option>Belgrade</option>
                    <option>Novi Sad</option>
                    <option>Nis</option>
                    <option>Kragujevac</option>
                    <option>Subotica</option>
                  </select>
                </div>

                <div className="box-form__car-time">
                  <label><IconCalendarEvent /> Pick-up Date *</label>
                  <DatePicker
                    selected={pickDate}
                    onChange={(date) => setPickDate(date)}
                    minDate={new Date()}
                    filterDate={(date) => !isDateBooked(date)}
                    placeholderText="Select a pick-up date"
                  />
                </div>

                <div className="box-form__car-time">
                  <label><IconCalendarEvent /> Drop-off Date *</label>
                  <DatePicker
                    selected={dropDate}
                    onChange={(date) => setDropDate(date)}
                    minDate={pickDate || new Date()}
                    filterDate={(date) => !isDateBooked(date)}
                    placeholderText="Select a drop-off date"
                  />
                </div>

                <button onClick={openModal} type="submit">Search</button>
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
          <h4><IconInfoCircleFilled /> You will receive:</h4>
          <p>Your rental voucher and customer support details via email.</p>
        </div>

        <div className="booking-modal__car-info">
          <div className="dates-div">
            <div className="booking-modal__car-info__dates">
              <h6>Pick-Up</h6>
              <p>{pickDate?.toDateString()}</p>
              <h6>Drop-Off</h6>
              <p>{dropDate?.toDateString()}</p>
              <h6>Pick-Up Location</h6>
              <p>{pickUp}</p>
              <h6>Drop-Off Location</h6>
              <p>{dropOff}</p>
            </div>
          </div>
          <div className="booking-modal__car-info__model">
            <h5>{carType}</h5>
            <p><b>₹{amount} / day</b></p>
            {carImages[carImg] && <img src={carImages[carImg]} alt="car" />}
          </div>
        </div>

        <div className="booking-modal__person-info">
          <h4>Personal Information</h4>
          <form className="info-form " >
          
            <div className="row mb-3">
              <div className="col-md-6">
              <input className="form-control" type="text" placeholder="First Name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="col-md-6">
              <input className="form-control" type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
              </div>
            </div>
             <div className="row mb-3">
              <div className="col-md-6">
              <input className="form-control" type="number" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
              <div className="col-md-6">
              <input className="form-control" type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
              </div>
             </div>

             <div className="row mb-3">
              <div className="col-md-6">
              <input className="form-control" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="col-md-6">
              <input className="form-control" type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
              </div>
             </div>

             <div className="row mb-3">
              <div className="col-md-6">
              <input className="form-control" type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
              </div>
              <div className="col-md-6">
              <input className="form-control" type="text" placeholder="Zip Code" value={zipcode} onChange={(e) => setZipCode(e.target.value)} />
              </div>
             </div>

             <div className="row mb-3">
              <div className="col-md-6">
              <select className="form-control" value={AdharSubmited} onChange={(e) => setAdharSubmited(e.target.value)}>
              <option className="form-control" value="">Aadhar Submitted? *</option>
              <option className="form-control" value="Submited">Submited</option>
              <option className="form-control" value="NotSubmited">Not Submited</option>
            </select>
              </div>

              <div className="col-md-6">
              <select className="form-control" value={LicenceSubmited} onChange={(e) => setLicenceSubmited(e.target.value)}>
              <option className="form-control" value="">Licence Submitted? *</option>
              <option className="form-control" value="Submited">Submited</option>
              <option className="form-control" value="NotSubmited">Not Submited</option>
            </select>
              </div>
             </div>
           
           <div className="row">
            <div className="col-md-6">
            <select className="form-control" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
              <option className="form-control" value="Online">Online Payment</option>
              <option className="form-control" value="COD">Cash on Delivery</option>
            </select>
            </div>
           </div>
 
           

          
            <select className="form-control" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
              <option className="form-control" value="Online">Online Payment</option>
              <option className="form-control" value="COD">Cash on Delivery</option>
            </select>

            <button style={{backgroundColor:"orangered",color:"#fff"}} className="form-control" onClick={handleCreateOrder}>Reserve Now</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default BookCar;
