import { useFormik } from "formik";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../api/Authentication";
import paytm from "../img/paytm.png";

// User Registration
function Registration() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
      confirmpassword: "",
    },

    // Form Validation
    validate: (values) => {
      let error = {};
      if (!values.userName) {
        error.userName = "*Please Enter User Name";
      }
      if (
        values.userName &&
        (values.userName.length < 3 || values.userName.length > 15)
      ) {
        error.userName = "Username must be 3 to 15 characters";
      }
      if (!values.email) {
        error.email = "*Email Id is Required";
      }
      if (
        values.email &&
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        error.email = "Please Enter valid email address";
      }
      if (!values.password) {
        error.password = "*Password is Required";
      }
      if (
        values.password &&
        (values.password.length < 8 || values.password.length > 15)
      ) {
        error.password = "Password Must between 8 to 15 characters";
      }
      if (!values.confirmpassword) {
        error.confirmpassword = "*Confirm Password is Required";
      } else if (values.password !== values.confirmpassword) {
        error.confirmpassword = "*Password do not match";
      }
      return error;
    },
    onSubmit: async (values) => {
      try {
        let registerData = await register(values);
        alert(registerData.data.message);
        navigate(`/`);
      } catch (error) {
        alert(error.response.data.message);
      }
    },
  });

  return (
    <main>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-7">
            <div class="card shadow-lg border-0 rounded-lg mt-5">
              <div
                class="card-header"
                style={{ backgroundColor: "rgb(61, 215, 229)" }}
              >
                <h3 class="text-center font-weight-light my-4">
                  <img className="loginlogo" src={paytm} alt="logo" />
                  <b>Create Account</b>
                </h3>
              </div>
              <div class="card-body">
                <form onSubmit={formik.handleSubmit}>
                  <div class="row mb-3">
                    <div class="col-md-12">
                      <div class="form-floating mb-3 mb-md-0">
                        <input
                          class="form-control"
                          id="inputFirstName"
                          type="text"
                          name="userName"
                          onChange={formik.handleChange}
                          value={formik.values.userName}
                          placeholder="Enter your first name"
                        />
                        {formik.touched.userName && formik.errors.userName ? (
                          <span style={{ color: "red" }}>
                            {formik.errors.userName}
                          </span>
                        ) : null}
                        <label for="inputFirstName">User name</label>
                      </div>
                    </div>
                  </div>
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
                  <div class="row mb-3">
                    <div class="col-md-6">
                      <div class="form-floating mb-3 mb-md-0">
                        <input
                          class="form-control"
                          id="inputPassword"
                          type="password"
                          name="password"
                          onChange={formik.handleChange}
                          value={formik.values.password}
                          placeholder="Create a password"
                        />
                        {formik.touched.password && formik.errors.password ? (
                          <span style={{ color: "red" }}>
                            {formik.errors.password}
                          </span>
                        ) : null}
                        <label for="inputPassword">Password</label>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-floating mb-3 mb-md-0">
                        <input
                          className={`form-control ${
                            formik.errors.confirmpassword ? "error-box" : ""
                          } ${
                            formik.touched.confirmpassword &&
                            !formik.errors.confirmpassword
                              ? "success-box"
                              : ""
                          }`}
                          id="inputPasswordConfirm"
                          type="password"
                          name="confirmpassword"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.confirmpassword}
                          placeholder="Confirm password"
                        />
                        {formik.touched.confirmpassword &&
                        formik.errors.confirmpassword ? (
                          <span style={{ color: "red" }}>
                            {formik.errors.confirmpassword}
                          </span>
                        ) : null}
                        <label for="inputPasswordConfirm">
                          Confirm Password
                        </label>
                      </div>
                    </div>
                  </div>
                  <div class="mt-4 mb-0">
                    <div class="d-grid">
                      <input
                        type={"submit"}
                        value={"Create Account"}
                        class="btn btn-info btn-block"
                      />
                    </div>
                  </div>
                </form>
              </div>
              <div class="card-footer text-center py-3">
                <div class="small">
                  <Link to={"/"}>Have an account? Go to login</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Registration;
