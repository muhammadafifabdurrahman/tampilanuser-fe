import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCategories } from "../../../_services/categories";

export default function CategoriesCreate() {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value} = e.target;
            setFormData({
                ...formData,
                [name]: value
            });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const payload = new FormData();
            for(const key in formData){
                payload.append(key, formData[key]);
            }

            await createCategories(payload);
            navigate("/admin/categories")
            alert('Kategori berhasil ditambahkan!')
        } catch (error){ 
            console.log(error);
            alert("Error creating category")
        }
    }
    
  return (
    <>
      <section className="w-full bg-white dark:bg-gray-900">
        <div className="px-4 py-8 mx-auto lg:py-16">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Create New Category
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
              <div className="sm:col-span-2">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                  placeholder="category name"
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows="8"
                  value={formData.description}
                  onChange={handleChange}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                  placeholder="Write a description of the cateory..."
                >
                </textarea>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                type="submit"
                className="text-white !bg-blue-700 hover:bg-indigo-800 focus:ring-4  focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
              >
                Create Category
              </button>
              <button
                type="button"
                className="text-gray-600 inline-flex items-center hover:text-white border border-gray-600 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-gray-500 dark:text-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-900"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}