import { useFormik } from "formik";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { orderProduct, sendinvoiceEmail } from "../api/Payments";

/*Donation Payment*/ 
function Donation() {
  const navigate = useNavigate();
  const params = useParams();
  const formik = useFormik({
    initialValues: {
      title: "Donation",
      provider: "",
      number: "",
      amount: "",
      service: "",
      phone: "",
      dName: "",
      state: "",
    },

     /*Form Validation*/ 
    validate: (values) => {
      let error = {};
      if (!values.provider) {
        error.provider = "*Select Foundation";
      }
      if (!values.number) {
        error.number = "*Account Number Required";
      }
      if (!values.phone) {
        error.phone = "*Required";
      }
      if (values.phone && values.phone.toString().length !== 10) {
        error.phone = "Please enter valid phone number";
      }
      if (!values.amount) {
        error.amount = "*Required";
      }
      if (!values.service) {
        error.service = "*Select Foundation Bank";
      }
      if (!values.dName) {
        error.dName = "*Required";
      }
      return error;
    },
    onSubmit: async (values) => {
      try {
        // Product Submit to BackEnd
        let makeProduct = await orderProduct(params.uId, values);
        if (makeProduct.data.status == true) {
          alert(
            `Payment done Successfully. Payment ID :${makeProduct.data.message}`
          );

          // Invoice Mail sending to Email Id
          let invoice = await sendinvoiceEmail(
            params.uId,
            makeProduct.data.message
          );
          alert(invoice.data.message);
          navigate(`/dashboard/products/${params.uId}`);
        } else {
          alert("Something Went Wrong");
        }
      } catch (error) {
        alert(error.response.data.message);
      }
    },
  });

  return (
    <div class="p-3 bg-info bg-opacity-10 border border-info  rounded bill">
      <div class="container">
        <form onSubmit={formik.handleSubmit}>
          <div className="row mt-2">
            <h1>
              <b>Donation</b>
            </h1>
            <div className="col-lg-4">
              <div className="form-group mt-3">
                <label>
                  <b>Donar Name :</b>
                  {formik.errors.dName ? (
                    <span style={{ color: "red" }}>{formik.errors.dName}</span>
                  ) : null}
                </label>
                <input
                  name="dName"
                  onChange={formik.handleChange}
                  value={formik.values.dName}
                  type={"text"}
                  className="form-control"
                />
              </div>
            </div>
            <div className="col-lg-4">
              <div className="form-group mt-3">
                <label>
                  <b>Donar State :</b>
                </label>
                <select
                  name="state"
                  onChange={formik.handleChange}
                  value={formik.values.state}
                  className="form-control mt-2"
                >
                  <option>--Select--</option>
                  <option value={"Tamilnadu"}>Tamilnadu</option>
                  <option value={"Kerala"}>Kerala</option>
                  <option value={"Andra"}>Andra</option>
                  <option value={"Karnataka"}>Karnataka</option>
                </select>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="form-group mt-3">
                <label>
                  <b>Donar Phone :</b>
                  {formik.errors.phone ? (
                    <span style={{ color: "red" }}>{formik.errors.phone}</span>
                  ) : null}
                </label>
                <input
                  name="phone"
                  onChange={formik.handleChange}
                  value={formik.values.phone}
                  type={"number"}
                  className="form-control"
                />
              </div>
            </div>

            <div className="col-lg-6 mt-3">
              <div className="form-group mt-3">
                <label>
                  <b>Select Foundation :</b>
                  {formik.errors.provider ? (
                    <span style={{ color: "red" }}>
                      {formik.errors.provider}
                    </span>
                  ) : null}
                </label>
                <select
                  name="provider"
                  onChange={formik.handleChange}
                  value={formik.values.provider}
                  className="form-control mt-2"
                >
                  <option>--Select--</option>
                  <option value={"Agaram foundation"}>Agaram foundation</option>
                  <option value={"Isha foundation"}>Isha foundation</option>
                  <option value={"Universal Peace Foundation"}>
                    Universal Peace Foundation
                  </option>
                  <option value={"Bharatham Foundation"}>
                    Bharatham Foundation
                  </option>
                  <option value={"Alpha Foundation"}>Alpha Foundation</option>
                  <option value={"Helping mind foundation"}>
                    Helping mind foundation
                  </option>
                </select>
              </div>
            </div>
            <div className="col-lg-6 mt-3">
              <div className="form-group mt-3">
                <label>
                  <b>Foundation Account Number :</b>
                  {formik.errors.number ? (
                    <span style={{ color: "red" }}>{formik.errors.number}</span>
                  ) : null}
                </label>
                <input
                  name="number"
                  onChange={formik.handleChange}
                  value={formik.values.number}
                  type={"number"}
                  className="form-control mt-2"
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="form-group mt-5">
                <label>
                  <b>Foundation Account - Bank :</b>
                  {formik.errors.service ? (
                    <span style={{ color: "red" }}>
                      {formik.errors.service}
                    </span>
                  ) : null}
                </label>
                <select
                  name="service"
                  onChange={formik.handleChange}
                  value={formik.values.service}
                  className="form-control mt-2"
                >
                  <option>--Select--</option>
                  <option value={"SBI Bank"}>SBI</option>
                  <option value={"Canara Bank"}>Canara</option>
                  <option value={"IOB  Bank"}>IOB</option>
                  <option value={"KVB Bank"}>KVB</option>
                </select>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="form-group mt-5">
                <label>
                  <b>Amount :</b>
                  {formik.errors.amount ? (
                    <span style={{ color: "red" }}>{formik.errors.amount}</span>
                  ) : null}
                </label>
                <input
                  name="amount"
                  onChange={formik.handleChange}
                  value={formik.values.amount}
                  type={"number"}
                  className="form-control mt-2"
                />
              </div>
            </div>

            <div className="col-lg-4 mt-5">
              <div className="form-group mt-3">
                <input
                  type={"submit"}
                  value={"Proceed"}
                  className="btn btn-primary"
                />
              </div>
            </div>
            <div className="col-lg-4 mt-5">
              <div className="form-group mt-3">
                <Link
                  to={`/dashboard/products/${params.uId}`}
                  class="btn btn-primary"
                  type="submit"
                >
                  Cancel
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Donation;
