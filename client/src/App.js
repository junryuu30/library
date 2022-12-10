import './App.css';
import Landing from './pages/Landing';
import { Routes, Route, useNavigate } from "react-router-dom";
import DetailBooks from './pages/DetailBooks';
import Navbar from './components/Navbar';
import LandingAdmin from './pages/Admin/LandingAdmin';
import AddBooks from './pages/Admin/AddBooks';
import UpdateBooks from './pages/Admin/UpdateBooks';

import { API, setAuthToken } from './config/api';
import { useContext, useEffect } from 'react';
import { UserContext } from './context/userContext';

// init token on axios every time the app is refreshed
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  let navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  // console.clear();
  console.log(state);

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    console.log(localStorage.token);
    // Redirect Auth
    // 2. hapus
    if (state.isLogin === false) {
      navigate('/');
    } else {
      if (state.user.status === 'admin') {
        navigate('/home-admin');
      } 
      else if (state.user.status === 'user') {
        navigate('/');
      }
    }

  }, [state]);

  const checkUser = async () => {
    try {
      if (localStorage.token) {
        setAuthToken(localStorage.token)
      }
      // setIsLoading(true);
      const response = await API.get("/check-auth");

      // if (response.status === 404) {
      //   return dispatch({
      //     type: "AUTH_ERROR"
      //   })
      // }

      const payload = response.data.data;
      // console.log("ini payload",payload)
      payload.token = localStorage.token;

      dispatch({
        type: "USER_SUCCESS",
        payload,
      });

      // setIsLoading(false);
    } catch (error) {
      console.log(error);
      // setIsLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.token) {
      checkUser();
    }
  }, []);

  return (
    <div className="App">
      <Navbar/>
      <Routes>
          <Route exac path="/" element={<Landing />} />
          <Route exac path="/home-admin" element={<LandingAdmin />} />
          <Route exac path="/add-books" element={<AddBooks />} />
          <Route exac path="/update-books" element={<UpdateBooks />} />
          <Route exac path="/detail-book/:id" element={<DetailBooks />} />
      </Routes>

    </div>
  );
}

export default App;
