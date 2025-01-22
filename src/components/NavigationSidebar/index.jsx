// import { useContext, useEffect, useMemo, useState } from "react";
// import { AuthContext } from "../../contexts/auth";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { RoleBasedViews } from "../../Pages/view";
// import { AppBar, Badge, IconButton, Toolbar, Typography } from "@mui/material";
// import { MiscellaneousServicesOutlined, PersonPinCircleOutlined } from "@mui/icons-material";

// // Reusable SidebarItem component
// const SidebarItem = ({ isOpen, label, Icon, to, isActive }) => (
//   <Link
//     to={to}
//     // onClick={onClick}
//     className={`font-semibold transition-all px-2 rounded-lg rounded-tr-none rounded-br-none py-2 flex items-center justify-start space-x-4 `}
//   >
//     {Icon && <Icon className={`size-6"`} />}
//     {<div className="flex truncate">{label}</div>}
//   </Link>
// );

// function NavigationSidebar() {
//   const navigate = useNavigate();
//   const { user } = useContext(AuthContext);
//   const location = useLocation();

//   useEffect(() => {
//     if (!user) {
//       navigate("/");
//     }
//   }, []);
//   // console.log("$$$$$$: ", typeof user);

//   let userDetails;
//   if (typeof user == "string") {
//     userDetails = JSON.parse(user);
//   } else {
//     userDetails = user;
//   }
//   const rolesMenu = useMemo(() => {
//     return Object.keys(RoleBasedViews[userDetails?.role]?.routes).map((key) => {
//       const { icons, label, bool } =
//         RoleBasedViews[userDetails.role].routes[key];
//       return { Icon: icons, label, to: key, bool };
//     });
//   }, [userDetails?.role]);

//   const [open, setOpen] = useState(false);
//   const toggleDrawer = () => {
//       setOpen(!open);
//   };

//   return (
//     <>     
//       <div className="flex flex-col h-screen bg-slate-100 transition-all duration-300 min-w-[200px]">
//         <h1 className="mt-10 text-blue-600 text-center font-bold text-3xl">
//           PIMS
//         </h1>
//         <div className="mt-10">
//           <nav className="flex flex-col items-start m-3 space-y-4 justify-start mt-12">
//             {rolesMenu.map((eachSideBarItem, index) => {
//               return (
//                 (eachSideBarItem.bool === undefined ||
//                   eachSideBarItem.bool === true) && (
//                   <SidebarItem
//                     key={index}
//                     label={eachSideBarItem.label}
//                     icon={eachSideBarItem.Icon}
//                     {...eachSideBarItem}
//                   />
//                 )
//               );
//             })}
//           </nav>
//         </div>
//       </div>
//     </>
//   );
// }

// export default NavigationSidebar;


import { useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from "../../contexts/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RoleBasedViews } from "../../Pages/view";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Toolbar,
  AppBar,
  IconButton,
  Menu,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Person } from "@mui/icons-material";

const SidebarItem = ({ label, Icon, to, isActive }) => (
  <Link
    to={to}
    style={{
      textDecoration: "none",
      color: isActive ? "#1565c0" : "inherit",
    }}
  >
    <ListItem
      button
      selected={isActive}
      sx={{
        borderRadius: "8px",
        transition: "background-color 0.3s",
        "&:hover": {
          backgroundColor: "#f1f1f1",
        },
      }}
    >
      {Icon && (
        <ListItemIcon>
          <Icon />
        </ListItemIcon>
      )}
      <ListItemText primary={label} />
    </ListItem>
  </Link>
);

function NavigationSidebar() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  let userDetails;
  if (typeof user === "string") {
    userDetails = JSON.parse(user);
  } else {
    userDetails = user;
  }

  const rolesMenu = useMemo(() => {
    return Object.keys(RoleBasedViews[userDetails?.role]?.routes).map((key) => {
      const { icons, label, bool } =
        RoleBasedViews[userDetails.role].routes[key];
      return { Icon: icons, label, to: key, bool };
    });
  }, [userDetails?.role]);

  const [open, setOpen] = useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { setUser } = useContext(AuthContext);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const logoutHandler = () => {
    navigate("/");
    // setIsLoggedIn(false);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <>
      {/* <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
            sx={{ marginRight: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6"  component="div">
            PIMS
          </Typography>
        </Toolbar>
          <Person
            onClick={toggleDropdown}
            className="text-lime-50" />
      </AppBar> */}
      <Box>
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar className="mb-300">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              PIMS
            </Typography>
            <Button color="inherit"><Person
              onClick={toggleDropdown}
              className="text-lime-50" /></Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: 240,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto", mt: 2, p: 2 }}>      
          <List sx={{p:0}}>
            {rolesMenu.map((eachSideBarItem, index) => {
              return (
                (eachSideBarItem.bool === undefined ||
                  eachSideBarItem.bool === true) && (
                  <SidebarItem
                    key={index}
                    label={eachSideBarItem.label}
                    Icon={eachSideBarItem.Icon}
                    to={eachSideBarItem.to}
                    isActive={location.pathname === eachSideBarItem.to}
                  />
                )
              );
            })}
          </List>
        </Box>
      </Drawer>
      {dropdownOpen && (
        <div className="absolute right-1 min-h-10 mt-20 w-48
         bg-white border border-gray-200 rounded shadow-lg">
          <button
            onClick={logoutHandler}
            className="block text-sm pl-7 pt-2 hover:bg-gray-100 w-full text-start"
          >
            Sign Out
          </button>
        </div>
      )}
    </>
  );
}

export default NavigationSidebar;
