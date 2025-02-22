"use client";
import { useState } from "react";
export default function AddProjectDialouge() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(email); // Handle form submission here
    handleClose();
  };

  return (
    <div>
      <button
        onClick={handleClickOpen}
        className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Add
      </button>

      {open && (
        <div className="fixed z-50 inset-0 top-2 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-800 p-5 rounded-md shadow-lg w-96 md:w-[500px] max-h-[90%] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4 text-white">Hello Aadarsha Khatri</h2>
            <p className="text-sm mb-4 text-gray-300">
              To add a post to your website, please enter the following details. We will update the database accordingly.
            </p>
            <form onSubmit={handleSubmit}>
              {/* Inputs */}
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium mb-2 text-white">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email"
                  className="w-full py-3 px-4 border-b-2 border-b-primary text-white bg-gray-800 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex justify-end gap-4 mt-10">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-6 py-2 text-white bg-red-500 rounded-md hover:bg-red-500/70"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
