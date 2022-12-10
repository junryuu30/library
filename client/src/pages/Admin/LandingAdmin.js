import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { API } from "../../config/api";
import { books } from "../../DataDummy/dummybooks"
import UpdateBooks from "./UpdateBooks";

const LandingAdmin = () => {
  const navigate = useNavigate()
  const [save, setSave] = useState();
  const [book, setBook] = useState();
  const [showModal, setShowModal] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  
   const handleUpdate = () => {
    setShowModalUpdate(false);
  };

  const config = {
    method: "GET",
    headers: {
      Authorization: "Basic " + localStorage.token,
    },
  };

  const getBook = async () => {
    try {
      const response = await API.get("/books", config);

      console.log("response bukuuu", response);

      setBook(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  console.log("ini book", book)
  const handleDelete = async (e) => {
    e.preventDefault();
    const id = save.id;
    try {
      await API.delete(`/deletebook/${id}`);
      setShowModal(false)
      getBook();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBook();
  }, []);

  console.log("ayo update",save)

  return (
    <>
    <div>
    <h2 className=" m-5 font-bold text-2xl text-center">
        List Buku
      </h2>
        <div className="flex justify-end m-5">
        <Link to="/add-books">
        <button className="text-white rounded px-4 py-2 bg-[#5F7161] m-3">Add Books</button>
        </Link>
        </div>
      <div className="flex justify-center m-5">
        <table className="border-spacing-3 border-solid border-gray-200 rounded-md">
            <tr className="bg-[#EFEAD8]">
                <th className="p-2">No</th>
                <th className="w-64 p-2">Image</th>
                <th className="w-64 p-2">Title</th>
                <th className="p-4">Penulis</th>
                <th className="p-4">Category</th>
                <th className="p-2">Action</th>
            </tr>
            {book?.map((item, index)=>(
            <tr className="bg-[#D0C9C0] space-y-7">
                <td className="p-2">{index + 1}</td>
                <td className="w-64 p-2">
                  <div className="m-1 rounded p-1 text-white flex justify-center">
                  <img alt="" src={item.image} className="h-64 w-64 object-cover rounded-md" />
                  </div>
                </td>
                <td className="w-64 p-2">{item.title}</td>
                <td className="p-4">{item.author}</td>
                <td className="p-4">{item.category}</td>
                <td className="p-2">
                  <button className="text-white rounded px-4 py-2 bg-[#5F7161] mr-3"
                  onClick={()=>{
                    setShowModalUpdate(true);
                    setSave(item);}
                  }>Update</button>
                <button className="rounded px-4 py-2 text-zinc-900 bg-pink-200 mt-3" 
                onClick={() => {setShowModal(true); setSave(item)}}
                >Delete</button>
                </td>
            </tr>
             ))}
        </table>
      </div>
      

      {showModal ? (
        
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="relative p-6 flex-auto">
                  <h2>Delete This Book?</h2>
                </div>
                <div className="mb-5">
                  <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                    <button
                      className="bg-red-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={handleDelete}
                    >
                      Delete
                    </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

      {showModalUpdate && <UpdateBooks setOpenModalUpdate={setShowModalUpdate} />}


    </div>
    </>
  );
};

export default LandingAdmin;
