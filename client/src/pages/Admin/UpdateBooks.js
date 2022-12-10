import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { API } from "../../config/api";
import { useQuery } from "react-query";

const UpdateBooks = ({ setOpenModalUpdate }) => {
  const [preview, setPreview] = useState(null);
  const { id } = useParams();

  const [form, setForm] = useState({
    title: "",
    desc: "",
    author: "",
    category: "",
    approve: "",
    image: "",
  });

  let { data: book } = useQuery("editCache", async () => {
    const response = await API.get(`/books`);

    console.log("data sebelum di updatebook", response.data.data);
    return response.data.data;
  });

  useEffect(() => {
    if (book) {
      setPreview(book.image);
      setForm({
        ...form,
        id: book.id,
        title: book.title,
        desc: book.desc,
        author: book.author,
        category: book.category,
        approve: book.approve,
      });
    }
  }, [book]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    if (e.target.type === "file") {
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  console.log(form);

  const handleUpdate = async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();
      if (form.image) {
        formData.set("image", form?.image[0], form?.image[0].name);
      }
      formData.set("title", form.title);
      formData.set("desc", form.desc);
      formData.set("author", form.author);
      formData.set("category", form.category);
      formData.set("approve", form.approve);

      const data = await API.patch(`/book/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
      <>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="relative p-6 flex-auto">
                <h2 className=" m-5 font-bold text-2xl text-center">
                  Update Books
                </h2>
                <div className="w-96 flex justify-center m-auto mt-5">
                  <div>
                    <form onSubmit={(e) => handleUpdate(e)}>
                      <label>
                        <span class="block text-sm font-medium text-slate-700">
                          Title
                        </span>
                        <input
                          name="title"
                          value={form.title}
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
                          // id="file"
                          onChange={handleChange}
                          type="file"
                          class="mt-1 mb-3 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500"
                        />
                      </label>
                      <label>
                        <span class="block text-sm font-medium text-slate-700">
                          Desc
                        </span>
                        <textarea
                          value={form.desc}
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
                          value={form.author}
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
                        <option value="Self Improvement">
                          Self Improvement
                        </option>
                        <option value="Novel">Novel</option>
                        <option value="Commic">Commic</option>
                      </select>
                      <div className="flex mt-3">
                        <button
                          className="rounded px-4 py-2 text-slate-900 bg-[#D0C9C0] mr-3"
                          type="submit"
                        >
                          Update Books
                        </button>
                        <Link to="/home-admin">
                          <button className="rounded px-4 py-2 text-white bg-neutral-700"
                          onClick={() => setOpenModalUpdate(false)}
                          >
                            Back
                          </button>
                        </Link>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>

      
  );
};

export default UpdateBooks;
