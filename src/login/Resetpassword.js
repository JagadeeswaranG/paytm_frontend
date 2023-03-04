import { useFormik } from "formik";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../api/Authentication";
import paytm from "../img/paytm.png";

// User Reset Password
function Resetpassword() {
  const navigate = useNavigate();

  // Get datas from query params
  const search = useLocation().search;
  const token = new URLSearchParams(search).get("token");
  const userId = new URLSearchParams(search).get("id");

  const formik = useFormik({
    initialValues: {
      userId: userId,
      token: token,
      password: "",
      confirmpassword: "",
    },
    validate: (values) => {
      let error = {};

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
        let resetData = await resetPassword(values);
        alert(resetData.data.message);
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
          <div class="col-lg-5">
            <div class="card shadow-lg border-0 rounded-lg mt-5">
              <div
                class="card-header"
                style={{ backgroundColor: "rgb(61, 215, 229)" }}
              >
                <h3 class="text-center font-weight-light my-4">
                  <img className="loginlogo" src={paytm} alt="logo" />
                  <b>Reset Password</b>
                </h3>
              </div>
              <div class="card-body">
                <form onSubmit={formik.handleSubmit}>
                  <div class="form-floating mb-3">
                    <input
                      class="form-control"
                      id="inputPassword"
                      type="password"
                      name="password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      placeholder="Password"
                    />
                    {formik.touched.password && formik.errors.password ? (
                      <span style={{ color: "red" }}>
                        {formik.errors.password}
                      </span>
                    ) : null}
                    <label for="inputPassword">Password</label>
                  </div>
                  <div class="form-floating mb-3">
                    <input
                      className={`form-control ${
                        formik.errors.confirmpassword ? "error-box" : ""
                      } ${
                        formik.touched.confirmpassword &&
                        !formik.errors.confirmpassword
                          ? "success-box"
                          : ""
                      }`}
                      id="inputPasswordc"
                      type="password"
                      name="confirmpassword"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.confirmpassword}
                      placeholder="Confirm Password"
                    />
                    {formik.touched.confirmpassword &&
                    formik.errors.confirmpassword ? (
                      <span style={{ color: "red" }}>
                        {formik.errors.confirmpassword}
                      </span>
                    ) : null}
                    <label for="inputPasswordc">Confirm Password</label>
                  </div>
                  <div class="d-flex align-items-center justify-content-between mt-4 mb-0">
                    <input
                      type={"submit"}
                      value={"Submit"}
                      class="btn btn-info"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Resetpassword;
