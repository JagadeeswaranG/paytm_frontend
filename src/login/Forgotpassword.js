import { useFormik } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import { forgotPassword } from "../api/Authentication";
import paytm from "../img/paytm.png";

// Forgot password
function Forgotpassword() {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validate: (values) => {
      let error = {};
      if (!values.email) {
        error.email = "*Please enter registered email id";
      }

      return error;
    },
    onSubmit: async (values) => {
      try {
        let forgotCred = await forgotPassword(values);
        alert(forgotCred.data.message);
        formik.resetForm();
      } catch (error) {
        alert(error.response.data.message);
      }
    },
  });
  return (
    <main>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-5">
            <div class="card shadow-lg border-0 rounded-lg mt-5">
              <div
                class="card-header"
                style={{ backgroundColor: "rgb(61, 215, 229)" }}
              >
                <h3 class="text-center font-weight-light my-4">
                  <img className="loginlogo" src={paytm} alt="logo" />
                  <b>Password Recovery</b>
                </h3>
              </div>
              <div class="card-body">
                <div class="small mb-3 text-muted">
                  Enter your email address and we will send you a link to reset
                  your password.
                </div>
                <form onSubmit={formik.handleSubmit}>
                  <div class="form-floating mb-3">
                    <input
                      class="form-control"
                      id="inputEmail"
                      type="email"
                      name="email"
                      onChange={formik.handleChange}
                      value={formik.values.email}
                      placeholder="name@example.com"
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <span style={{ color: "red" }}>
                        {formik.errors.email}
                      </span>
                    ) : null}
                    <label for="inputEmail">Email address</label>
                  </div>
                  <div class="d-flex align-items-center justify-content-between mt-4 mb-0">
                    <Link to={"/"} class="small">
                      Return to login
                    </Link>
                    <button type="submit" class="btn btn-info">
                      Send Email
                    </button>
                  </div>
                </form>
              </div>
              <div class="card-footer text-center py-3">
                <div class="small">
                  <Link to={"/register"}>Need an account? Sign up!</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Forgotpassword;
