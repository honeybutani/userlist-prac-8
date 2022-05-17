import React, { useRef, useEffect } from "react";
import PreviewImage from "./PreviewImage";
import "./Signup.css";
import { ErrorMessage, Formik, Form } from "formik";
import { TextField } from "./TextField";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { LoginUserdetail } from "../redux/actions/actions";
import { useNavigate } from "react-router-dom";
import rocketImg from "../assets/signup.png";

const ProfilePictureSize = "Please select the Image less than 2 MB";
//  Here is the SignUp Componenet which will allow user to signup the form and will be logged in
export const Signup = () => {
  const ref = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // this will check that the if user is present in the local storage the it will not allow to redirect to the signup page and will restrict to stay on the homepage only.
  useEffect(() => {
    if (localStorage.getItem("data")) {
      navigate("/homepage");
    }
  }, [navigate]);
  const validate = Yup.object({
    profilePicture: Yup.mixed()

      .required("Image is Required")
      .test("fileSize", ProfilePictureSize, (value) => {
        return !value || value.size <= 2000000;
      })
      .test("fileType", ProfilePictureSize, (value) => {
        return (
          !value ||
          (value !== null &&
            ["image/jpg", "image/png", "image/jpeg"].includes(value.type))
        );
      }),
    firstName: Yup.string()
      .min(15, "Must be 15 characters or more")
      .required("Name is Required"),

    PhoneNo: Yup.string()
      .required("Phone Number is Required!")
      .matches(
        /^(\+91[-\s]?)?[0]?(91)?[6789]\d{9}$/,
        " only Indian phone no. is Allowed "
      ),

    email: Yup.string().email("Email is invalid").required("Email is required"),
    Password: Yup.string()
      .min(6, "Password must be at least 6 charaters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("Password")], "Password must match")
      .required("Confirm password is required"),
  });
  //By using the formik , implemented the signup functionality
  return (
    <div className="d-flex signup-container">
      <div className="formcontainer">
        <Formik
          initialValues={{
            firstName: "",
            PhoneNo: "",
            email: "",
            Password: "",
            confirmPassword: "",
            profilePicture: null,
          }}
          validationSchema={validate}
          // Handled the onSubmit event , when submit button is clicked by the user
          onSubmit={(values) => {
            var data = {
              firstName: values.firstName,
              email: values.email,
              PhoneNo: values.PhoneNo,
              profilePicture: URL.createObjectURL(values.profilePicture),
            };
            dispatch(LoginUserdetail(data));
            const readValue = new FileReader();
            readValue.readAsDataURL(values.profilePicture);
            readValue.onloadend = () => {
              navigate("/homepage");
              console.log(readValue.result);
              localStorage.setItem(
                "data",
                JSON.stringify({ ...data, profilePicture: readValue.result })
              );
            };
          }}
        >
          {(formik) => (
            <div className="formcontainer">
              <h1 className="font-weight-bolder .display-6 pb-4 signupclass">
                SignUp
              </h1>
              <Form>
                {formik.values.profilePicture && (
                  <PreviewImage profilePicture={formik.values.profilePicture} />
                )}
                <button
                  type="button"
                  className="photobutton"
                  name="profilePicture"
                  onClick={() => ref.current.click()}
                >
                  photo +
                </button>
                <input
                  id="file"
                  type="file"
                  name="profilePicture"
                  hidden
                  accept=".jpg, .png"
                  ref={ref}
                  // onBlur={formik.handleBlur}
                  onChange={(event) => {
                    formik.setFieldValue(
                      "profilePicture",
                      event.target.files[0]
                    );
                  }}
                  onBlur={formik.handleBlur}
                />
                <ErrorMessage
                  component="div"
                  name="profilePicture"
                  className="text-danger imageerror"
                />
                <TextField label="Name" name="firstName" type="text" />
                <TextField label="PhoneNo" name="PhoneNo" type="text" />
                <TextField label="Email" name="email" type="email" />
                <TextField label="Password" name="Password" type="password" />
                <TextField
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                />
                <button className="btn btn-dark m-3" type="submit">
                  Register
                </button>
                <button className="btn btn-danger m-2" type="reset">
                  Reset
                </button>
              </Form>
            </div>
          )}
        </Formik>
      </div>
      <div className="signupimage">
        <img className="" src={rocketImg} alt="" />
      </div>
    </div>
  );
};
