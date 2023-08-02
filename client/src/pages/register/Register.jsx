import { GoogleLogin } from "@react-oauth/google";
import { decodeJwt } from "jose";
import React from "react";
import newRequest from "../../utils/newRequest";
import "./Register.scss";

function Register() {
  return (
    <div className="main">
      <div className="content">
        <img
          className="beauty-img"
          src="https://www.svgrepo.com/show/176630/hair-dye-brush-beauty.svg"
          alt=""
        />
        <h1 className="signin">Sign In To Your Account</h1>
      </div>
      <div className="btn">
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log(credentialResponse);

            const { credential } = credentialResponse;
            const payload = credential ? decodeJwt(credential) : undefined;
            if (payload) {
              console.log(payload);
              newRequest
                .get("/register", {
                  headers: {
                    Authorization: `Bearer ${credential}`,
                  },
                })
                .then((response) => console.log(response.data))
                .catch((err) => console.log(err));
            }
          }}
          onError={(error) => console.log(error)}
        />
      </div>
    </div>
  );
}

export default Register;
