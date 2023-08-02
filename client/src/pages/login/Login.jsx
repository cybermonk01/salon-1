import React, { useState } from "react";
// import "./Login.css";
import axios from "axios";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      // const res = await axios.post("http://localhost:5000/api/auth/login", {
      //   username,
      //   password,
      // },

      // {withCredentials: true}6
      // );
      // console.log(res.data);

      const res = await newRequest.post("/auth/login", {
        username,
        password,
      });
      localStorage.setItem("currentUser", JSON.stringify(res.data.info));
      console.log(res);
      navigate("/");
    } catch (err) {
      setError(err.response.data);
      console.log(err.response.data);
    }
  };

  return (
    <div className="container">
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 dark:bg-gray-900 dark:text-gray-100">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Sign in</h1>
          Sign in to access your account{" "}
          <p className="text-sm dark:text-gray-400"></p>
        </div>
        <form
          novalidate=""
          action=""
          className="space-y-12"
          onSubmit={handleForm}
        >
          <div className="space-y-4">
            <div>
              <label for="email" className="block mb-2 text-sm">
                User Name
              </label>
              <input
                type="text"
                name="username"
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label for="password" className="text-sm">
                  Password
                </label>
                <a
                  rel="noopener noreferrer"
                  href="#"
                  className="text-xs hover:underline dark:text-gray-400"
                >
                  Forgot password?
                </a>
              </div>
              <input
                name="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                placeholder="*****"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
              />
            </div>
          </div>
          <div className="space-y-2">
            <div>
              <button
                type="submit"
                className="w-full px-8 py-3 font-semibold rounded-md dark:bg-violet-400 dark:text-gray-900"
              >
                Login
              </button>
            </div>
            <p className="px-6 text-sm text-center dark:text-gray-400">
              Don't have an account yet?
              <a
                rel="noopener noreferrer"
                href="#"
                className="hover:underline dark:text-violet-400"
              >
                Login
              </a>
              .
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

// import React, { useState } from "react";
// import "./Login.scss";
// import axios from "axios";
// import newRequest from "../../utils/newRequest";
// import { useNavigate } from "react-router-dom";

// function Login() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(null);

//   const navigate = useNavigate();

//   const handleForm = async (e) => {
//     e.preventDefault();
//     try {
//       // const res = await axios.post("http://localhost:5000/api/auth/login", {
//       //   username,
//       //   password,
//       // },

//       // {withCredentials: true}6
//       // );
//       // console.log(res.data);

//       const res = await newRequest.post("/auth/login", {
//         username,
//         password,
//       });
//       localStorage.setItem("currentUser", JSON.stringify(res.data.info));
//       console.log(res);
//       navigate("/");
//     } catch (err) {
//       setError(err.response.data);
//       console.log(err.response.data);
//     }
//   };

//   return (
//     <div className="login ">
//       <form action="" onSubmit={handleForm}>
//         <h1 > Sign In </h1>
//         <label htmlFor="">Username</label>

//         <input
//           type="text"
//           name="username"
//           onChange={(e) => setUsername(e.target.value)}
//         />

//         <label htmlFor="">Password</label>
//         <input
//           name="password"
//           type="password"
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// }

// export default Login;
