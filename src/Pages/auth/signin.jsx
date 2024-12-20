import React from "react";

const Signin = () => {
  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900"
        ></a>
        <div className="w-full shadow-xl shadow-gray-600 bg-white rounded-lg md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-3xl font-bold text-blue-700">Login</h1>
            <h1 className="text-xl font-normal leading-tight tracking-tight text-gray-600 md:text-lg">
              Welcome to patient information management system
            </h1>
            <form className="space-y-4 md:space-y-6">
              <div className="flex flex-col items-start">
                <label
                  htmlFor="userId"
                  className="block mb-2 text-lg font-medium text-blue-700"
                >
                  User Id
                </label>
                <input
                  id="userId"
                  name="userId"
                  type="text"
                  autoComplete="User Id"
                  placeholder="User Id"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                />
              </div>
              <div className="flex flex-col items-start">
                <label
                  htmlFor="userId"
                  className="block mb-2 text-lg text-blue-700 font-medium"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
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
                className="w-full text-white bg-blue-950 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
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
