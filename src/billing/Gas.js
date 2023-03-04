import { useFormik } from "formik";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { orderProduct, sendinvoiceEmail } from "../api/Payments";

/*Gas Billing*/
function Gas() {
  const navigate = useNavigate();
  const params = useParams();
  const formik = useFormik({
    initialValues: {
      title: "Gas Booking",
      provider: "",
      number: "",
      amount: "",
      service: "",
      phone: "",
      cName: "",
    },

    /*Form Validation*/
    validate: (values) => {
      let error = {};
      if (!values.provider) {
        error.provider = "*Select Provider";
      }
      if (!values.number) {
        error.number = "*Consumer Number Required";
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
        error.service = "*Required";
      }
      if (!values.cName) {
        error.cName = "*Required";
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
              <b>Gas Booking</b>
            </h1>
            <div className="col-lg-4">
              <div className="form-group mt-3">
                <label>
                  <b>Consumer Name :</b>
                  {formik.errors.cName ? (
                    <span style={{ color: "red" }}>{formik.errors.cName}</span>
                  ) : null}
                </label>
                <input
                  name="cName"
                  onChange={formik.handleChange}
                  value={formik.values.cName}
                  type={"text"}
                  className="form-control"
                />
              </div>
            </div>
            <div className="col-lg-4">
              <div className="form-group mt-3">
                <label>
                  <b>Consumer Number :</b>
                </label>
                <input
                  name="number"
                  onChange={formik.handleChange}
                  value={formik.values.number}
                  type={"text"}
                  className="form-control"
                />
                {formik.errors.number ? (
                  <span style={{ color: "red" }}>{formik.errors.number}</span>
                ) : null}
              </div>
            </div>
            <div className="col-lg-4">
              <div className="form-group mt-3">
                <label>
                  <b>Phone :</b>
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

            <div className="col-lg-6">
              <div className="form-group mt-5">
                <label>
                  <b>Select Providers :</b>
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
                  <option value={"Indane"}>Indane</option>
                  <option value={"HP"}>HP</option>
                  <option value={"Bharat"}>Bharat</option>
                </select>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="form-group mt-5">
                <label>
                  <b>Agency Name :</b>
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
                  <option value={"Sakthi Agency"}>Sakthi Agency</option>
                  <option value={"Win Agency"}>Win Agency</option>
                  <option value={"Santhosh Agency"}>Santhosh Agency</option>
                </select>
              </div>
            </div>
            <div className="col-lg-4"></div>

            <div className="col-lg-4">
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
                  className="form-control"
                />
              </div>
            </div>
            <div className="col-lg-4"></div>
            <div className="col-lg-4">
              <div className="form-group mt-5">
                <input
                  type={"submit"}
                  className="btn btn-primary"
                  value={"Proceed"}
                />
              </div>
            </div>
            <div className="col-lg-4">
              <div className="form-group mt-5">
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

export default Gas;
