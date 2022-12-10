import React, { useContext, useState } from "react";
import { books } from "../DataDummy/dummybooks";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/userContext";
import Login from "../components/Login";
import { BiArrowBack } from "react-icons/bi";
import Register from "../components/Register";
import { useQuery } from "react-query";
import { API } from "../config/api";

const DetailBooks = () => {
  // const params = useParams();
  let { id } = useParams();
  const [state, dispatch] = useContext(UserContext);
  console.log("ini di detailll", state);
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

  let{ data: detailbook } = useQuery("detailCache", async()=>{
    const response = await API.get("/book/"+ id)
    return response.data.data
  })

  console.log("detailll books",detailbook)

  return (
    <div className="container">
      <h2 className=" m-5 font-bold text-2xl text-center">Detail Buku</h2>
      <div className="m-5 bg-[#5F7161] rounded p-3 text-white text-justify cursor-pointer">
        <Link to="/">
          <div className="ml-6 my-6">
            <BiArrowBack size={25} />
          </div>
        </Link>
        <h4 className="font-bold text-lg text-center mb-5">
          title: 
          {/* {books[params.id].title} */}
          {detailbook?.title}
        </h4>
        <div className="m-1 rounded p-1 text-white flex justify-center">
          <img
            alt=""
            src={detailbook?.image}
            // {books[params.id].image}

            className="object-cover rounded-md"
          />
        </div>
        <div className="m-1 rounded p-1 text-white text-justify">
          <h4>sinopsis: 
            {detailbook?.desc}
            {/* {books[params.id].desc} */}
          </h4>
        </div>
        <div className="m-1 rounded p-1 text-white text-justify">
          <h4>penulis: 
            {detailbook?.author}
            {/* {books[params.id].penulis} */}
          </h4>
          {!state.isLogin ? (
            <button
              className="rounded px-4 py-2 text-zinc-900 bg-pink-200 m-3
                "
              onClick={() => setModalLogin(true)}
            >
              Pinjam buku ini
            </button>
          ) : state.user.status === "user" ? (
            <button
              className="rounded px-4 py-2 text-zinc-900 bg-pink-200 m-3
                "
            >
              Pinjam buku ini
            </button>
          ) : (
            <></>
          )}

          {/* <button className="rounded px-4 py-2 text-zinc-900 bg-pink-200 m-3
                " >
                  Pinjam buku ini
                </button> */}
        </div>
      </div>
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
    </div>
  );
};

export default DetailBooks;
