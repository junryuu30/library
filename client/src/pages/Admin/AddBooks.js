import React, { useState } from "react";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../../config/api";

const AddBooks = () => {
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null); //For image preview
  const [form, setForm] = useState({
    image: "",
    title: "",
    desc: "",
    author: "",
    category: "",
    approve: "",
  }); //Store product data

  // Handle change data on form
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });
    // console.log("ini forrmmm", form);

    // Create image url for preview
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // // Configuration
      // const config = {
      //   headers: {
      //     "Content-type": "multipart/form-data",
      //   },
      // };

      // Store data with FormData as object
      const formData = new FormData();
      formData.set("image", form.image[0], form.image[0].name);
      formData.set("title", form.title);
      formData.set("desc", form.desc);
      formData.set("author", form.author);
      formData.set("category", form.category);
      formData.set("approve", form.approve);

      // Insert product data
      // const response = await API.post("/book", formData, config);
      const response = await API.post("/book", formData, {
        headers: {
            Authorization: `Bearer ${localStorage.token}`
        }
    });
      console.log("ini data bookkkss", response);

      navigate("/home-admin");
    } catch (error) {
      console.log(error);
      const alert = (
        <div
          class="bg-red-300 border-l-4 border-red-500 text-zinc-900-700 p-4"
          role="alert"
        >
          <p class="font-bold">Gagal menambahkan produk</p>
        </div>
      );
      setMessage(alert);
    }
  });
  // console.log(form)

  return (
    <>
      <h2 className=" m-5 font-bold text-2xl text-center">Add New Books</h2>
      <div className="w-96 flex justify-center m-auto mt-5">
        <div>
          {message && message}
          <form onSubmit={(e) => handleSubmit.mutate(e)}>
            <label className="">
              <span class="block text-sm font-medium text-slate-700">
                Title
              </span>
              <input
                name="title"
                onChange={handleChange}
                type="text"
                class="mt-1 mb-3 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500"
              />
            </label>
            <label>
              <span class="block text-sm font-medium text-slate-700">
                Image
              </span>
              <input
                name="image"
                onChange={handleChange}
                type="file"
                class="mt-1 mb-3 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500"
              />
            </label>
            <label>
              <span class="block text-sm font-medium text-slate-700">Desc</span>
              <textarea
                name="desc"
                onChange={handleChange}
                type="text"
                class="mt-1 mb-3 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500"
              />
            </label>
            <label>
              <span class="block text-sm font-medium text-slate-700">
                Penulis
              </span>
              <input
                name="author"
                onChange={handleChange}
                type="text"
                class="mt-1 mb-3 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500"
              />
            </label>
            <label>
              <span class="block text-sm font-medium text-slate-700">
                Category Books
              </span>
            </label>
            <select
              name="category"
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500"
            >
              <option value="volvo"></option>
              <option value="Self Improvement">Self Improvement</option>
              <option value="Novel">Novel</option>
              <option value="Commic">Commic</option>
            </select>
            <div className="flex mt-3">
              <button
                className="text-white rounded px-4 py-2 bg-[#5F7161] mr-3"
                type="submit"
              >
                Add Books
              </button>
              {/* <Link to="/home-admin"> */}
              {/* <button className="rounded px-4 py-2 text-white bg-neutral-700">
                Back
              </button> */}
              {/* </Link> */}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddBooks;
