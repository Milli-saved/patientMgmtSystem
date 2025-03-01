// import React, { useContext, useState } from "react";
// import { RoleBasedViews } from "../view";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../../contexts/auth";
// // import {}

// const Signin = () => {
//   const navigate = useNavigate();
//   const { user, setUser, token, setToken } = useContext(AuthContext);
//   const [credentials, setCredentials] = useState({
//     userName: "",
//     password: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);

//   const changeHandler = (e) => {
//     const { name, value } = e.target;

//     setCredentials({
//       ...credentials,
//       [name]: value,
//     });
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       console.log("env:");
//       // console.log("env:", import.meta.env.VITE_API_URL);
//       const response = await fetch(
//         `${import.meta.env.VITE_API_URL}/user/login`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(credentials),
//         }
//       );

//       if (response.ok) {
//         const result = await response.json();
//         // const decodedToken = await jwtDecode(result.token);
//         window.localStorage.setItem("token", result.data.token);
//         const role = result.data.role;
//         console.log('role:', role);

//         const roleBasedView = RoleBasedViews[role];
//         console.log("the roleBasedView is: ", roleBasedView);
//         if (roleBasedView && roleBasedView.routes) {
//           const roles_menu = Object.keys(roleBasedView?.routes)?.map((key) => {
//             const { icons, label } = roleBasedView.routes[key];
//             return { Icon: icons, label, to: key };
//           });
//           if (roles_menu && roles_menu.length > 0) {
//             let user = {
//               fullName: result.data.fullName,
//               email: result.data.email,
//               phoneNumber: result.data.phoneNumber,
//               role: result.data.role,
//             };
//             // console.log("the user is: ", user);
//             setUser(user);
//             window.localStorage.setItem("user", JSON.stringify(user));
//             setToken(result.data.token);
//             console.log("the route: ", roles_menu[0]);
//             navigate(roles_menu[0].to);
//           } else {
//             setError(
//               "No menus access has been granted to you. Please contact your administrator"
//             );
//           }
//         } else {
//           setError("Unable to find roles Unknown role. Please contact your administrator");
//         }
//       } else {
//         throw new Error("Invalid response from server");
//       }
//     } catch (error) {
//       setLoading(false);
//       setError(
//         "Either username or password is incorrect. Please try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section className="bg-gray-50">
//       <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
//         <a
//           href="#"
//           className="flex items-center mb-6 text-2xl font-semibold text-gray-900"
//         ></a>
//         <div className="w-full shadow-xl shadow-gray-600 bg-white rounded-lg md:mt-0 sm:max-w-md xl:p-0">
//           <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
//             <h1 className="text-3xl font-bold text-blue-700 text-center ">
//               Login
//             </h1>
//             <h1 className="text-xl font-normal leading-tight tracking-tight text-center text-gray-600 md:text-lg">
//               Welcome to patient information management system
//             </h1>
//             <form onSubmit={submitHandler} className="space-y-4 md:space-y-6">
//               <div className="flex flex-col items-start">
//                 <label
//                   htmlFor="userName"
//                   className="block mb-2 text-lg font-medium text-blue-700"
//                 >
//                   User Name
//                 </label>
//                 <input
//                   id="userName"
//                   name="userName"
//                   onChange={changeHandler}
//                   type="text"
//                   autoComplete="User Id"
//                   placeholder="User Id"
//                   className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
//                 />
//               </div>
//               <div className="flex flex-col items-start">
//                 <label
//                   htmlFor="password"
//                   className="block mb-2 text-lg text-blue-700 font-medium"
//                 >
//                   Password
//                 </label>
//                 <input
//                   id="password"
//                   name="password"
//                   onChange={changeHandler}
//                   type="password"
//                   autoComplete="Current Password"
//                   placeholder="******"
//                   className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
//                 />
//               </div>
//               <div className="flex justify-between">
//                 <div className="flex">
//                   <input type="checkbox" className="mr-2" />
//                   <p className="text-gray-800">Keep me signin</p>
//                 </div>
//                 <p className="text-yellow-900">Forgot my password?</p>
//               </div>
//               {error && (
//                 <div className="text-red-600 text-sm text-center my-3">
//                   {error}
//                 </div>
//               )}
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full disabled:cursor-not-allowed text-white bg-blue-950 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
//               >
//                 Login
//               </button>
//             </form>
//           </div>
//           <div className="flex items-end justify-end m-5">
//             <h1 className="text-gray-600">Need Help?</h1>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Signin;


import React, { useContext, useState } from "react";
import { RoleBasedViews } from "../view";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/auth";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Paper,
  TextField,
  Typography,
  CircularProgress,
  Modal,
  List,
} from "@mui/material";

const Signin = () => {
  const navigate = useNavigate();
  const { setUser, setToken } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({
    userName: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);
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

      if (!credentials.userName || !credentials.password) {
        setError("Please enter username and password");
        return;
      }
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
        // console.log('JSON response',result);

        window.localStorage.setItem("token", result.data.token);

        const roleBasedView = RoleBasedViews[result.data.role];
        if (roleBasedView && roleBasedView.routes) {
          const roles_menu = Object.keys(roleBasedView?.routes)?.map((key) => {
            const { icons, label } = roleBasedView.routes[key];
            return { Icon: icons, label, to: key };
          });

          if (roles_menu?.length > 0) {
            const user = {
              fullName: result.data.fullName,
              email: result.data.email,
              phoneNumber: result.data.phoneNumber,
              role: result.data.role,
              healthCenterId: result.data.healthCenterId,
              userName: result.data.userName
            };
            setUser(user);
            window.localStorage.setItem("user", JSON.stringify(user));
            setToken(result.data.token);
            navigate(roles_menu[0].to);
          } else {
            setError(
              "No menu access has been granted to you. Please contact your administrator."
            );
          }
        } else {
          setError("Unknown role. Please contact your administrator.");
        }
      } else {
        setError("Invalid username or password.");
      }
    } catch (error) {
      console.log('error', error);

      setError("Unable to connect to server.", error);
    } finally {
      setLoading(false);
    }
  };

  const modalOpen = () => {
    setOpen(true);
  }
  const modalClose = () => {
    setOpen(false);
  }

  return (
    <>
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            paddingTop: 6,
            paddingBottom: 10,
            paddingLeft: 5,
            paddingRight: 5,
            mt: 8,
            borderRadius: 2,
            textAlign: "center",
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ color: "primary.main" }}>
            Login
          </Typography>
          <Typography variant="subtitle1" sx={{ color: "text.secondary", mb: 3 }}>
            Welcome to the Patient Information Management System
          </Typography>
          <form onSubmit={submitHandler}>
            <TextField
              fullWidth
              label="User Name"
              name="userName"
              variant="outlined"
              onChange={changeHandler}
              sx={{ mb: 3 }}
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              variant="outlined"
              onChange={changeHandler}
              sx={{ mb: 3 }}
            />
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{ mb: 3 }}
            >
              <FormControlLabel
                control={<Checkbox />}
                label="Keep me signed in"
              />
              <Typography
                variant="body2"
                sx={{ color: "warning.main", cursor: "pointer" }}
                onClick={(e) => navigate('/resetPassword')}
              >
                Forgot password?
              </Typography>
            </Box>
            {error && (
              <Typography
                variant="body2"
                color="error"
                sx={{ textAlign: "center", mb: 2 }}
              >
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
              sx={{ py: 1.5 }}
            >
              {loading ? <CircularProgress size={24} /> : "Login"}
            </Button>
          </form>
          <Typography variant="body2" className="float-end" sx={{ mt: 3 }}
          >
            <Button onClick={modalOpen}>Need Help?</Button>
          </Typography>
        </Paper>
      </Container>
      <Modal open={open} onClose={modalOpen} 
      sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', 
      justifyContent: 'center', alignItems: 'center' }}>
        <Paper sx={{ padding: 5, borderRadius: 5, backgroundColor: 'white' }}>
          <Typography variant="h5" fontWeight="bold" textAlign="center" mb={3}>
            Unable to login to the system?, Follow those steps</Typography>
          <Box>
            <List>First click forgot password</List>
            <List>Enter Your Username, then click send buttton. </List>
            <List>One Time Password (OTP) will be sent to your phone number</List>
            <List>Enter the OTP that you received, and click confirm button</List>
            <List>New password will be send to you. Login with that.</List>
          </Box>
          <Box>
            <p>Still have challange? Contact your administrator.</p>
          </Box>
          <Button variant="outlined" className="float-end" onClick={modalClose} sx={{ mt: 3 }}>
            Understand
          </Button>
        </Paper>
      </Modal>
    </>
  );
};

export default Signin;
