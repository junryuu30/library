import React, { useContext } from "react";
import CardBooks from "../components/CardBooks";
import { UserContext } from "../context/userContext";
import LandingAdmin from "./Admin/LandingAdmin";

const Landing = () => {
  const [state, dispatch] = useContext(UserContext)

  return (
    <>
      {/* {state.status === "admin"? <LandingAdmin/>: */}
        <>
          <div className="w-full min-h-screen bg-white">
            <h2 className=" m-5 font-bold text-2xl text-center">
              List Buku Yang Terbaru
            </h2>
          <select name="cars" id="cars" className="mt-1 mx-7 block w-60 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500">
                  <option value="volvo">Category Books</option>
                  <option value="Self Improvement">Self Improvement</option>
                  <option value="Novel">Novel</option>
                  <option value="Commic">Commic</option>
                </select>
          <div>
            <CardBooks />
          </div>

        </div>
        </>
      {/* } */}
    </>
  );
};

export default Landing;
