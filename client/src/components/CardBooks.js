import React, { useContext, useEffect, useState } from "react"
import { books } from "../DataDummy/dummybooks";
import { useNavigate } from "react-router-dom";
import { API } from "../config/api";
import { UserContext } from "../context/userContext";


const CardBooks = () =>{
    const navigate = useNavigate()
    const [book, setBook] = useState();
    const [state, dispatch] = useContext(UserContext);
    console.log("state landing",state)

    // const config = {
    //     method: "GET",
    //     headers: {
    //       Authorization: "Basic " + localStorage.token,
    //     },
    //   };
    
      const getBook = async () => {
        try {
          const response = await API.get("/books",);
    
          console.log("response bukuuu", response);
    
          setBook(response.data.data);
        } catch (err) {
          console.log(err);
        }
      };
    
      console.log("ini buku nyaaaa di landing",book)
    
      useEffect(() => {
        getBook();
      }, []);

    return(
        <div className="card flex flex-wrap"
        
        >
            {book.map((item, index) => (
            <div 
            key={index} 
            className="m-5 bg-[#5F7161] rounded p-3 text-white text-justify w-96 h-96 cursor-pointer"
            onClick={() => navigate(`/detail-book/${item.id}`)}
            >
                <div className="m-1 rounded p-1 text-white flex justify-center">
                <img alt=""
                 src={item.image} 
                className="h-64 w-64 object-cover rounded-md" />
                </div>
                <div className="m-1 rounded p-1 text-white text-justify">
                <h4 className="font-bold text-lg">title: 
                {item.title}
                </h4>
                </div>
                <div className="m-1 rounded p-1 text-white text-justify">
                <h4>penulis: {item.author}</h4>
                </div>
            </div>
           ))}
      </div>
    )
}

export default CardBooks