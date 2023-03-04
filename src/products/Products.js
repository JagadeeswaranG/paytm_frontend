import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import mobile from "../img/mobile.jpg";
import dth from "../img/dth.png";
import ott from "../img/ott.jpg";
import gas from "../img/gas.webp";
import electricity from "../img/electricity.webp";
import water from "../img/water.jpg";
import broardband from "../img/broardband.jpg";
import landline from "../img/landline.png";
import apartment from "../img/apartment.png";
import credit from "../img/credit.webp";
import loan from "../img/loan.png";
import lic from "../img/lic.png";
import donation from "../img/donation.webp";
import devotion from "../img/devotion.jpg";
import gift from "../img/gift.webp";

/*Payment Products*/ 

/* Every Category there are 3 services*
*But Access given to the every first services of all category*/ 

function Products() {
  const [userid, setuserId] = useState();

  useEffect(() => {
    setuserId(localStorage.getItem("uId"));
  },[]);

  return (
    <div class="container">
      <h4 class="head mt-4">Recharges</h4>
      <div class="container text-center mt-5">
        <div class="row">
          <div class="col">
            <Link to={`/dashboard/mobile-recharge/${userid}`} href="#" class="btn">
              <img alt="" src={mobile} />
              <div class="card-body">
                <h6 class="card-title mt-2">Mobile Recharge</h6>
              </div>
            </Link>
          </div>

          <div class="col">
            <Link href="#" class="btn">
              <img alt="" src={dth} />
              <div class="card-body">
                <h6 class="card-title mt-2">DTH Recharge</h6>
              </div>
            </Link>
          </div>

          <div class="col">
            <Link href="#" class="btn">
              <img alt="" src={ott} />
              <div class="card-body">
                <h6 class="card-title mt-2">OTT Recharge</h6>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <h4 class="head mt-3">Home Bills</h4>
      <div class="container text-center mt-5">
        <div class="row">
          <div class="col">
            <Link to={`/dashboard/gas-bill/${userid}`}  class="btn">
              <img alt="" src={gas} />
              <div class="card-body">
                <h6 class="card-title mt-2">Gas Cylinder</h6>
              </div>
            </Link>
          </div>

          <div class="col">
            <Link href="#" class="btn">
              <img alt="" src={electricity} />
              <div class="card-body">
                <h6 class="card-title mt-2">Electricity</h6>
              </div>
            </Link>
          </div>

          <div class="col">
            <Link href="#" class="btn">
              <img alt="" src={water} />
              <div class="card-body">
                <h6 class="card-title mt-2">Water Bill</h6>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <h4 class="head mt-3">Apartment Bills</h4>
      <div class="container text-center mt-5">
        <div class="row">
          <div class="col">
            <Link to={`/dashboard/broadband-recharge/${userid}`} class="btn">
              <img alt="" src={broardband} />
              <div class="card-body">
                <h6 class="card-title mt-2">Broadband Recharge</h6>
              </div>
            </Link>
          </div>

          <div class="col">
            <Link href="#" class="btn">
              <img alt="" src={landline} />
              <div class="card-body">
                <h6 class="card-title mt-2">Landline Recharge</h6>
              </div>
            </Link>
          </div>

          <div class="col">
            <Link href="#" class="btn">
              <img alt="" src={apartment} />
              <div class="card-body">
                <h6 class="card-title mt-2">Apartment Rent</h6>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <h4 class="head mt-3">Financial</h4>
      <div class="container text-center mt-5">
        <div class="row">
          <div class="col">
            <Link to={`/dashboard/creditcard-bill/${userid}`}  class="btn">
              <img alt="" src={credit} />
              <div class="card-body">
                <h6 class="card-title mt-2">Creditcard Payment</h6>
              </div>
            </Link>
          </div>

          <div class="col">
            <Link href="#" class="btn">
              <img alt="" src={loan} />
              <div class="card-body">
                <h6 class="card-title mt-2">Pay Loan</h6>
              </div>
            </Link>
          </div>

          <div class="col">
            <Link href="#" class="btn">
              <img alt="" src={lic} />
              <div class="card-body">
                <h6 class="card-title mt-2">LIC/Insurance</h6>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <h4 class="head mt-3">Other Services</h4>
      <div class="container text-center mt-5">
        <div class="row">
          <div class="col">
            <Link to={`/dashboard/donation-payment/${userid}`}  class="btn">
              <img alt="" src={donation} />
              <div class="card-body">
                <h6 class="card-title mt-2">Donation</h6>
              </div>
            </Link>
          </div>

          <div class="col">
            <Link href="#" class="btn">
              <img alt="" src={devotion} />
              <div class="card-body">
                <h6 class="card-title mt-2">Devotion</h6>
              </div>
            </Link>
          </div>

          <div class="col">
            <Link href="#" class="btn">
              <img alt="" src={gift} />
              <div class="card-body">
                <h6 class="card-title mt-2">Gift Cards</h6>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
