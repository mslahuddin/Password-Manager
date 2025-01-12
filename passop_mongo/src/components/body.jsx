/* eslint-disable react-hooks/rules-of-hooks */
import image1 from '../assets/save.svg'
import { useState, useEffect } from 'react'
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';  // Ensure ToastContainer is imported
import 'react-toastify/dist/ReactToastify.css';  // Import the CSS for Toastify
import { Bounce } from 'react-toastify';  // Import the Bounce transition



const body = () => {

  const [pass, setPass] = useState(false);
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [passArray, setPassArray] = useState([]);


  const getPasswords = async () => {
    try {
      let req = await fetch("http://localhost:3000/");
      let passwords = await req.json();
      console.log(passwords);
      setPassArray(passwords); // Update the state with the new data from the server
    } catch (error) {
      console.error("Error fetching passwords:", error);
    }
  };

  useEffect(() => {


    getPasswords();
    // let passArray;
    // if(passwords){
    //     setPassArray(JSON.parse(passwords));
    //    // setPassShow(true);
    // }
    // else
    // passArray=[];

  }, [])


  const showPassword = () => {
    setPass(!pass); // Toggles the state

  };

  const savePassword = async () => {
    // Check if form is filled (e.g., checking if the password field is not empty)
    if (form.password==='' || form.username==='' || form.site==='') { // Replace with the correct form field names
      toast.error('Please fill in all fields', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return; // Stop the function if fields are empty
    }
  
    // Show success toast
    toast.success('Saved ✅', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  
    // Update the passArray state
    setPassArray([...passArray, { ...form }]);
  
    // Sending POST request to server
    fetch("http://localhost:3000/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form }),
    });
  
    // Log the updated array (this will log the old state)
    console.log([...passArray, form]);
  };
  



  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })

  }


  const handleRemove = async (id) => {
    try {
      console.log("Initiating DELETE request for id:", id);

      // Step 1: Delete the item from the database
      const response = await fetch("http://localhost:3000/", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }), // Sending the id in the request body

        
      });

      if (!response.ok) {
        throw new Error("Failed to delete item from the database");
      }

      const data = await response.json();
      console.log("Successfully deleted from database:", data);

      // Step 2: Remove the item from the local array
      setPassArray((prevArray) => {
        const updatedArray = prevArray.filter((item) => item._id !== id); // Filter out the item by id
        console.log("Updated local array:", updatedArray);
        return updatedArray;
      });


      toast.success('Item deleted successfully ✅', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      })

    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };










  return (
    <div className='min-h-[87.5vh] bg-green-100'>
    <div className="flex bg-green-100 text-black   justify-center ">

     <ToastContainer
  position="top-right"
  autoClose={5000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick={false}
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme="light"
  transition={Bounce} 
/>


      <div className="text-center mt-20 p-5  font-bold text-3xl  "><span className="text-green-600">&lt;</span>Pass<span className="text-green-600">OP/&gt;</span>
        <p className="font-normal text-sm">Your own Password Manager</p>
        <div>
          <div>
            <input
              className="ml-4 mt-4 w-[60vw] font-normal  text-base overflow-hidden h-10  p-4 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter Website url" name='site' type='text' value={form.site} onChange={handleChange} />
          </div>
          <div className='relative'>
            <input
              className="ml-4 mt-4 w-[40vw] font-normal  text-base overflow-hidden h-10  p-4 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter Username" name='username' type='text' value={form.username} onChange={handleChange} />


            <input
              className=" ml-5 relative w-[20vw] mt-4  h-10 pl-4 pr-10 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-black text-base font-normal"
              placeholder="Enter Password"
              name="password"
              type={pass ? 'text' : 'password'}
              value={form.password}
              onChange={handleChange}
            />
            <span
              className="absolute right-4 top-2/3 transform -translate-y-1/2 text-sm font-light hover:cursor-pointer"
              onClick={showPassword}
            >
              {!pass ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="-2 -2 24 24"
                  width="24"
                  fill="currentColor"
                >
                  <path d="M9.329 11.885L2.12 19.092a1 1 0 1 1-1.414-1.414l7.324-7.324a2 2 0 0 1 2.322-2.322L17.679.706a1 1 0 0 1 1.414 1.414L11.885 9.33a2 2 0 0 1-2.556 2.556zm7.54-6.127C18.75 6.842 20 8.34 20 10c0 3.314-4.958 5.993-10 6a14.734 14.734 0 0 1-3.053-.32l1.861-1.86a4 4 0 0 0 5.011-5.011l3.05-3.051zm-4.16-1.496l-1.834 1.834a4 4 0 0 0-4.779 4.779L2.869 14.1C1.134 13.028 0 11.585 0 10c0-3.314 4.984-6.017 10-6 .914.003 1.827.094 2.709.262z"></path>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="-2 -6 24 24"
                  width="24"
                  fill="currentColor"
                >
                  <path d="M10 12c-5.042.007-10-2.686-10-6S4.984-.017 10 0c5.016.017 10 2.686 10 6s-4.958 5.993-10 6zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0-2a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"></path>
                </svg>
              )}
            </span>


          </div>
        </div>
        <div className='flex items-center  justify-center mt-6'>
          <button className="font-semibold flex text-sm  px-6 py-2  bg-green-500 text-black font-normal rounded-3xl shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-800 focus:ring-opacity-75 " onClick={savePassword}>
            <img src={image1} alt="icon" className="w-5 h-6 mr-2" />
            Save
          </button>
        </div>
        {passArray.length != 0 ? <div className=''>
          <div className='font-bold mt-10 text-left'> Your Passwords</div>
          <div className='  gap-10 bg-green-950  text-white font-normal text-base mt-4 p-3 rounded-lg'>
            <table border="1" className='w-[70vw]'>
              <thead >
                <tr >
                  <th className=' w-[28vw]'>Site</th>
                  <th>Username</th>
                  <th>Password</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(passArray) && passArray.map((item, index) => (
                  <tr key={index}>
                    <td>{item.site}</td>
                    <td>{item.username}</td>
                    <td>{item.password}</td>
                    <td className="hover:cursor-pointer" onClick={() => handleRemove(item._id)}>Remove</td>
                  </tr>
                ))}


              </tbody>
            </table>


          </div>
        </div> : <div className='mt-10'>No passwords to show</div>}

      </div>

     

    </div>

<footer className="bg-gray-800 text-white text-center py-4 ">
<div className="container mx-auto">
  <p className="text-sm">© {new Date().getFullYear()} PassOP. All Rights Reserved.</p>
  <div className="mt-2">
    <a href="#" className="text-gray-400 hover:text-white mx-2">Privacy Policy</a>
    <a href="#" className="text-gray-400 hover:text-white mx-2">Terms of Service</a>
  </div>
</div>
</footer>
</div>
  )
}

export default body
