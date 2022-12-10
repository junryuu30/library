import React, { useContext, useState } from "react";
import { useMutation } from 'react-query';
import { useNavigate } from "react-router-dom";

// Get API config here ...
import { API } from '../config/api';
import { UserContext } from "../context/userContext";

const Login = ({loginOn, loginClose, modalRegisterOn}) => {
  let navigate = useNavigate();

  const [state, dispatch] = useContext(UserContext);

  

  const [message, setMessage] = useState(null);

  // Create variabel for store data with useState here ...
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const { email, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

// ============================================================================
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
    const response = await API.post('/login', body, config);
    console.log(response);
    // navigate('/')

    let payload = response.data.data;

    dispatch({
      type: "LOGIN_SUCCESS",
      payload,
    })

    loginClose()

    // Handling response here
  } catch (error) {
    const alert = (
      <div class="bg-red-300 border-l-4 border-red-500 text-zinc-900-700 p-4" role="alert">
        <p class="font-bold">Login gagal</p>
      </div>
    );
    setMessage(alert);
    console.log(error);
  }
});



// ============================================================================
    if (!loginOn) return null;

  return (
    <div className="bg-zinc-200 opacity-80 fixed inset-0 z-50">
      <div className="flex h-screen justify-center items-center">
        <div className="flex-col justify-center bg-white py-6 px-10 border-4 border-sky-500 rounded-xl">

          <div className="flex text-4xl text-zinc-900 font-extrabold mb-6">Login</div>
          <div>
          {message && message}
            <form onSubmit={(e) => handleSubmit.mutate(e)}>
              <label>
                <span class="block text-sm font-medium text-slate-700">
                  Email
                </span>
                <input
                  type="text"
                  class="mt-1 mb-3 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500"
                  name="email"
                  onChange={handleChange}
                />
              </label>
              <label>
                <span class="block text-sm font-medium text-slate-700">
                  Password
                </span>
                <input
                  type="password"
                  class="mb-3 mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500"
                  name="password"
                  onChange={handleChange}
                />
              </label>
              <div className="flex mt-2">
                <button className="rounded px-4 py-2 text-white bg-[#5F7161] mr-3
                " >
                  Login
                </button>
                <button className="rounded px-4 py-2 text-white bg-slate-700"
                onClick={loginClose}>
                  Cancel
                </button>
              </div>
            </form>
            <p className="mt-4">You Not Have an Account? 
                <span className="cursor-pointer"
                onClick={modalRegisterOn}
                > Register Here</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
