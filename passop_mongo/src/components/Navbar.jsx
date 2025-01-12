/* eslint-disable no-unused-vars */
import React from "react";

const Navbar = () => {
    return (
        <div className="nav flex bg-slate-900 text-white list-none justify-around p-4 ">
            <li className="h-4 w-3  font-bold text-xl"><span className="text-green-600">&lt;</span>Pass<span className="text-green-600">OP/&gt;</span></li>
          
            <li>
  <button className="flex items-center bg-green-700 text-white font-semibold py-2 px-4 rounded-2xl hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75">
    <svg
      className="w-3 h-4 mr-2"
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.41 7.85 10.95.57.11.78-.25.78-.55v-2.01c-3.19.69-3.86-1.54-3.86-1.54-.52-1.31-1.27-1.66-1.27-1.66-1.04-.71.08-.69.08-.69 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.67 1.24 3.32.95.1-.74.4-1.24.72-1.53-2.55-.29-5.23-1.27-5.23-5.66 0-1.25.44-2.27 1.15-3.08-.12-.29-.5-1.45.1-3.01 0 0 .96-.31 3.15 1.18a10.83 10.83 0 0 1 5.73 0c2.19-1.49 3.15-1.18 3.15-1.18.6 1.56.23 2.72.1 3.01.71.81 1.15 1.83 1.15 3.08 0 4.4-2.68 5.37-5.23 5.66.42.36.76 1.06.76 2.15v3.19c0 .3.2.66.78.55A10.51 10.51 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z"
      />
    </svg>
    GitHub
  </button>
</li>



        </div>
    );
};

export default Navbar;
