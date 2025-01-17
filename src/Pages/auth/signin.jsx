import React, { useContext, useState } from "react";
import { RoleBasedViews } from "../view";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/auth";
// import {}

const Signin = () => {
  const navigate = useNavigate();
  const { user, setUser, token, setToken } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({
    userName: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      console.log("env:");
      // console.log("env:", import.meta.env.VITE_API_URL);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/user/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("the result: ", result);
        // const decodedToken = await jwtDecode(result.token);
        console.log("decoded token :", result.data);
        window.localStorage.setItem("token", result.data.token);
        const role = result.data.role;
        const roleBasedView = RoleBasedViews[role];
        console.log("the role: ", roleBasedView);
        if (roleBasedView && roleBasedView.routes) {
          const roles_menu = Object.keys(roleBasedView?.routes)?.map((key) => {
            const { icons, label } = roleBasedView.routes[key];
            return { Icon: icons, label, to: key };
          });
          console.log("the roles menu: ", roles_menu);
          if (roles_menu && roles_menu.length > 0) {
            localStorage.setItem("token", result.token);
            let user = {
              fullName: result.data.fullName,
              email: result.data.email,
              phoneNumber: result.data.phoneNumber,
              role: result.data.role,
            };
            setUser(user);
            setToken(result.data.token);
            console.log("the route: ", roles_menu[0]);
            navigate(roles_menu[0].to);
          } else {
            setError(
              "No menus access has been granted to you. Please contact your administrator"
            );
          }
        } else {
          setError("Invalid role or role-based view configuration");
        }
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      setLoading(false);
      setError(
        "Either phone number or password is incorrect. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900"
        ></a>
        <div className="w-full shadow-xl shadow-gray-600 bg-white rounded-lg md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-3xl font-bold text-blue-700 text-center ">
              Login
            </h1>
            <h1 className="text-xl font-normal leading-tight tracking-tight text-center text-gray-600 md:text-lg">
              Welcome to patient information management system
            </h1>
            <form onSubmit={submitHandler} className="space-y-4 md:space-y-6">
              <div className="flex flex-col items-start">
                <label
                  htmlFor="userName"
                  className="block mb-2 text-lg font-medium text-blue-700"
                >
                  User Name
                </label>
                <input
                  id="userName"
                  name="userName"
                  onChange={changeHandler}
                  type="text"
                  autoComplete="User Id"
                  placeholder="User Id"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                />
              </div>
              <div className="flex flex-col items-start">
                <label
                  htmlFor="password"
                  className="block mb-2 text-lg text-blue-700 font-medium"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  onChange={changeHandler}
                  type="password"
                  autoComplete="Current Password"
                  placeholder="******"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                />
              </div>
              <div className="flex justify-between">
                <div className="flex">
                  <input type="checkbox" className="mr-2" />
                  <p className="text-gray-800">Keep me signin</p>
                </div>
                <p className="text-yellow-900">Forgot my password?</p>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full disabled:cursor-not-allowed text-white bg-blue-950 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Login
              </button>
            </form>
          </div>
          <div className="flex items-end justify-end m-5">
            <h1 className="text-gray-600">Need Help?</h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signin;
