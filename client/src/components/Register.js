import React, { useState } from "react";
import { useMutation } from "react-query";
import { API } from "../config/api";

const Register = ({registerOn, registerClose, modalLoginOn }) => {
  const [message, setMessage] = useState(null);
  
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  
  const { name, email, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();
  
      // Configuration Content-type
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };
  
      // Data body
      const body = JSON.stringify(form);
  
      // Insert data user to database
      const response = await API.post('/register', body, config);

      console.log(response);

      // if(response.data.status === "success..."){
      //   const alert = (
      //     <div class="bg-orange-100 border-l-4 border-green-500 text-green-400 p-4" role="alert">
      //     <p class="font-bold">Login sukses</p>
      //   </div>
      //   );
      //   setMessage(alert)
      //   setForm({
      //     name: '',
      //     email: '',
      //     password: '',
      //   })
      // }else{
      //   const alert = (
      //     <div class="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
      //     <p class="font-bold">Register gagal</p>
      //   </div>
      //   );
      //   setMessage(alert)
      // }  
      modalLoginOn()
      // Handling response here
    } catch (error) {
      const alert = (
        <div class="bg-red-300 border-l-4 border-red-500 text-zinc-900-700 p-4" role="alert">
          <p class="font-bold">Register gagal</p>
        </div>
      );
      setMessage(alert);
      console.log(error);
    }
  });

  
  
  
  if (!registerOn) return null
  return (
    <div className="bg-zinc-200 opacity-80 fixed inset-0 z-50">
      <div className="flex h-screen justify-center items-center">
        <div className="flex-col justify-center bg-white py-12 px-24 border-4 border-sky-500 rounded-xl">
          <div className="flex text-4xl text-zinc-900 font-extrabold mb-3">Register</div>
          <div>
          {message && message}
            <form onSubmit={(e) => handleSubmit.mutate(e)}>
              <label>
                <span class="block text-sm font-medium text-slate-700">
                  Email
                </span>
                <input
                  name="email"
                  onChange={handleChange}
                  type="text"
                  class="mt-1 mb-3 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500"
                />
              </label>
              <label>
                <span class="block text-sm font-medium text-slate-700">
                  Full Name
                </span>
                <input
                  name="name"
                  onChange={handleChange}
                  type="text"
                  class="mt-1 mb-3 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500"
                />
              </label>
              <label>
                <span class="block text-sm font-medium text-slate-700">
                  Password
                </span>
                <input
                  name="password"
                  onChange={handleChange}
                  type="password"
                  class="mt-1 mb-3 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500"
                />
              </label>
              <div className="flex mt-2">
                <button className="rounded px-4 py-2 text-white bg-[#5F7161] mr-3">
                  Register
                </button>
                <button className="rounded px-4 py-2 text-white bg-slate-700"
                onClick={registerClose}
                >
                  Cancel
                </button>
              </div>
            </form>
            <p className="mt-4">Have an Account? <span className="cursor-pointer" onClick={modalLoginOn}>Login Here</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
