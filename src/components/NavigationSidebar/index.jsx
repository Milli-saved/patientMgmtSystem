import { useContext, useMemo } from "react";
import { AuthContext } from "../../contexts/auth";
import { Link, useLocation } from "react-router-dom";
import { RoleBasedViews } from "../../Pages/view";

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
  const { user } = useContext(AuthContext);
  const location = useLocation();

  const rolesMenu = useMemo(() => {
    return Object.keys(RoleBasedViews[user.role].routes).map((key) => {
      const { icons, label, bool } = RoleBasedViews[user.role].routes[key];
      return { Icon: icons, label, to: key, bool };
    });
  }, [user.role.auth_role_id]);

  return (
    <div className="flex flex-col h-screen bg-slate-100 transition-all duration-300">
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
  );
}

export default NavigationSidebar;
