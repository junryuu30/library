import React, { useContext, useState } from "react";
import Login from "./Login";
import Register from "./Register";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { SiAddthis, SiBookstack, SiHomeassistantcommunitystore } from "react-icons/si";
import { GrCopy, GrHomeRounded, IconName } from "react-icons/gr";

const Navbar = () => {
  // const navigate = useNavigate();

  const [state, dispatch] = useContext(UserContext);
  console.log("state navbarrrr",state)

  const [modalLogin, setModalLogin] = useState(false);
  const [modalRegister, setModalRegister] = useState(false);

  const handleLoginOn = () => {
    setModalLogin(true);
    setModalRegister(false);
  };
  const handleLoginClose = () => setModalLogin(false);
  const handleRegisterOn = () => {
    setModalRegister(true);
    setModalLogin(false);
  };
  const handleRegisterClose = () => setModalRegister(false);

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
    // navigate("/");
  };
  // console.log("navbarrrrrr222222", state?.user?.user?.status)

  return (
    <nav className="p-5 flex justify-between bg-[#6D8B74] shadow md:flex md:items-center md:justify-end">
      <ul className="text-white md:flex md:item-center">
        {!state.isLogin ? (
          <>
            <li
              className="mx-4 text-xl hover:text-blue-700 duration-500 cursor-pointer text-white"
              onClick={() => setModalLogin(true)}
            >
              Login
            </li>
            <li
              className="mx-4 text-xl hover:text-blue-700 duration-500 cursor-pointer text-white"
              onClick={() => setModalRegister(true)}
            >
              Register
            </li>
          </>
        ) : state?.user?.user?.status === "admin" ? (
          <>
            <Link to="/">
              <div className="mx-4 text-xl hover:text-blue-700 duration-500 cursor-pointer text-white">
                <SiBookstack />
                
              </div>
            </Link>
            <Link to="/home-admin">
              <li className="text-center mx-4 text-xl hover:text-blue-700 duration-500 cursor-pointer text-white">
              <SiHomeassistantcommunitystore size={23}/>
              </li>
            </Link>
            <li className="mx-4 text-xl text-white">Hi, Admin</li>
            <li
              className="mx-4 text-xl hover:text-blue-700 duration-500 cursor-pointer text-white"
              onClick={handleLogout}
            >
              Logout
            </li>
          </>
        ) : (
          <>
            <li className="mx-4 text-xl text-white">Hi, {state?.user?.user?.name}</li>
            <li
              className="mx-4 text-xl hover:text-blue-700 duration-500 cursor-pointer text-white"
              onClick={handleLogout}
            >
              Logout
            </li>
          </>
        )}
      </ul>
      <Login
        loginClose={handleLoginClose}
        loginOn={modalLogin}
        modalRegisterOn={handleRegisterOn}
      />
      <Register
        registerClose={handleRegisterClose}
        registerOn={modalRegister}
        modalLoginOn={handleLoginOn}
      />
    </nav>
  );
};

export default Navbar;
