import { useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from "../../contexts/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RoleBasedViews } from "../../Pages/view";
import { AppBar, Badge, IconButton, Toolbar, Typography } from "@mui/material";
import { MiscellaneousServicesOutlined, PersonPinCircleOutlined } from "@mui/icons-material";

// Reusable SidebarItem component
const SidebarItem = ({ isOpen, label, Icon, to, isActive }) => (
  <Link
    to={to}
    // onClick={onClick}
    className={`font-semibold transition-all px-2 rounded-lg rounded-tr-none rounded-br-none py-2 flex items-center justify-start space-x-4 `}
  >
    {Icon && <Icon className={`size-6"`} />}
    {<div className="flex truncate">{label}</div>}
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
  }, []);
  // console.log("$$$$$$: ", typeof user);

  let userDetails;
  if (typeof user == "string") {
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

  return (
    <>
      {/* <AppBar position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: '24px',
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
            }}
          >
            <MiscellaneousServicesOutlined />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            ASR
          </Typography>
          <IconButton color="inherit">
            <Badge color="secondary">
              <PersonPinCircleOutlined />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar> */}
      <div className="flex flex-col h-screen bg-slate-100 transition-all duration-300 min-w-[200px]">
        <h1 className="mt-10 text-blue-600 text-center font-bold text-3xl">
          PIMS
        </h1>
        <div className="mt-10">
          <nav className="flex flex-col items-start m-3 space-y-4 justify-start mt-12">
            {rolesMenu.map((eachSideBarItem, index) => {
              return (
                (eachSideBarItem.bool === undefined ||
                  eachSideBarItem.bool === true) && (
                  <SidebarItem
                    key={index}
                    label={eachSideBarItem.label}
                    icon={eachSideBarItem.Icon}
                    {...eachSideBarItem}
                  />
                )
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
}

export default NavigationSidebar;
