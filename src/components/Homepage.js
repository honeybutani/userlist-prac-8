import React from "react";
import "../components/Homepage.css";
import { useNavigate } from "react-router-dom";
// This is the simple homePage component which will render the data from the local storage, this will also provide the funtionality of logout from the app by us
function Homepage() {
  const navigate = useNavigate();
  const data = JSON.parse(localStorage.getItem("data"));
  // this is the logout button handller
  const LogoutHandler = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="page-content page-container" id="page-content">
      <div className="padding">
        <div className="row container d-flex justify-content-center">
          <div className="col-xl-6 col-md-12">
            <div className="card user-card-full">
              <div className="row m-l-0 m-r-0">
                <div className="col-sm-4 bg-c-lite-green user-profile">
                  <div className="card-block text-center text-white">
                    <div className="m-b-2">
                      <img
                        src={data.profilePicture}
                        className="img-radius"
                        alt="Profile"
                      />
                    </div>
                    <h6 className="f-w-600">{data.firstName}</h6>
                    <p>Web Designer</p>
                    <i className=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                  </div>
                </div>
                <div className="col-sm-8">
                  <div className="card-block">
                    <h6 className="m-b-20 p-b-5 b-b-default f-w-600">
                      Information
                    </h6>
                    <div className="row">
                      <div className="col-sm-8">
                        <p className="m-b-10 f-w-600">Email</p>
                        <h6 className="text-muted f-w-400">{data.email}</h6>
                        <br></br>
                      </div>
                      <div className="col-sm-6 pt-40">
                        <p className="m-b-10 f-w-600 ">Phone</p>
                        <h6 className="text-muted f-w-400">{data.PhoneNo}</h6>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn btn-danger logout"
                    onClick={LogoutHandler}
                  >
                    LogOut
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
