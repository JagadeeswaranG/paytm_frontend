import { useFormik } from "formik";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { orderProduct, sendinvoiceEmail } from "../api/Payments";

/*Mobile Recharge*/
function Mobile() {
  const navigate = useNavigate();
  const params = useParams();
  const formik = useFormik({
    initialValues: {
      title: "Mobile Recharge",
      provider: "",
      number: "",
      amount: "",
      service: "",
      plan: "",
    },

    /*Form Validation*/
    validate: (values) => {
      let error = {};
      if (!values.provider) {
        error.provider = "*Select Provider";
      }
      if (!values.number) {
        error.number = "*Required";
      }
      if (values.number && values.number.toString().length !== 10) {
        error.number = "Please enter valid phone number";
      }
      if (!values.amount) {
        error.amount = "*Required";
      }
      if (!values.service) {
        error.service = "*Required";
      }
      if (!values.plan) {
        error.plan = "*Required";
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
          <div className="row mt-2 ">
            <h1 className="title mb-3">
              <b>Mobile Recharge</b>
            </h1>

            <div className="col-lg-6">
              <div className="form-group mt-3">
                <label>
                  <b>Recharge Category :</b>
                  {formik.errors.plan ? (
                    <span style={{ color: "red" }}>{formik.errors.plan}</span>
                  ) : null}
                </label>
                <select
                  name="plan"
                  onChange={formik.handleChange}
                  value={formik.values.plan}
                  className="form-control mt-2"
                >
                  <option>--Select--</option>
                  <option value={"Prepaid"}>Prepaid</option>
                  <option value={"Postpaid"}>Postpaid</option>
                </select>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="form-group mt-3">
                <label>
                  <b>Choose Your Network :</b>
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
                  <option value={"Jio"}>Jio</option>
                  <option value={"Airtel"}>Airtel</option>
                  <option value={"Vi"}>Vi</option>
                </select>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="form-group mt-5">
                <label>
                  <b>Mobile Number :</b>
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
                  <b>Your Plan :</b>
                  {formik.errors.amount ? (
                    <span style={{ color: "red" }}>{formik.errors.amount}</span>
                  ) : null}
                </label>
                <select
                  name="amount"
                  onChange={formik.handleChange}
                  value={formik.values.amount}
                  className="form-control mt-2"
                >
                  <option>--Select--</option>
                  <option value={"149"}>₹149 / 1.5GB / 28 Days</option>
                  <option value={"119"}>₹119 / 1GB / 20 Days</option>
                  <option value={"249"}>₹249 / 2GB / Month</option>
                </select>
              </div>
            </div>
            <div className="col-lg-4"></div>

            <div className="col-lg-4">
              <div className="form-group mt-5">
                <label>
                  <b>State :</b>
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
                  <option value={"Tamilnadu"}>Tamilnadu</option>
                  <option value={"Kerala"}>Kerala</option>
                  <option value={"Andra"}>Andra</option>
                  <option value={"Karnataka"}>Karnataka</option>
                </select>
              </div>
            </div>
            <div className="col-lg-4"></div>

            <div className="col-lg-4">
              <div className="form-group mt-5">
                <input
                  type={"submit"}
                  className="btn btn-primary "
                  value={"Proceed"}
                />
              </div>
            </div>
            <div className="col-lg-4 ">
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

export default Mobile;
