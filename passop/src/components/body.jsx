import image1 from '../assets/save.svg'
import { useState,useEffect } from 'react'


const body = () => {

  const [pass, setPass] = useState(false);
  const [form, setForm] = useState({site:"" ,username:"" , password:"" });
  const [passArray, setPassArray] = useState([])
  

  useEffect(() => {
    let passwords=localStorage.getItem("passwords");
    let passArray;
    if(passwords){
        setPassArray(JSON.parse(passwords));
       // setPassShow(true);
    }
    else
    passArray=[];

 },[])
  

  const showPassword = () => {
    setPass(!pass); // Toggles the state
  
  };

  const savePassword=() => {
    localStorage.setItem("passwords",JSON.stringify([...passArray,form]))
    console.log([...passArray,form]);
  }

  const handleChange=(e) => {
    setForm({...form, [e.target.name]: e.target.value})
    
  }
const handleRemove = (index) => {
  // Create a shallow copy of the array to avoid mutating state directly
  const updatedArray = [...passArray];
  
  // Remove the item at the specified index
  updatedArray.splice(index, 1);
  
  // Update the state
  setPassArray(updatedArray); 
};



  return (
    <div className="flex bg-green-100 text-black h-screen  justify-center ">
       <div className="text-center mt-20 p-5  font-bold text-3xl  "><span className="text-green-600">&lt;</span>Pass<span className="text-green-600">OP/&gt;</span>
       <p className="font-normal text-sm">Your own Password Manager</p>
       <div>
      <div>  
  <input 
    className="ml-4 mt-4 w-[60vw] font-normal  text-base overflow-hidden h-10  p-4 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-black" 
    placeholder="Enter Website url" name='site' type='text' value={form.site}   onChange={handleChange}/>
    </div>
<div className='relative'>
<input 
    className="ml-4 mt-4 w-[40vw] font-normal  text-base overflow-hidden h-10  p-4 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-black" 
    placeholder="Enter Username" name='username' type='text' value={form.username} onChange={handleChange}/>
    
<input
    className="relative ml-4 mt-4 w-[20vw] font-normal  text-base overflow-hidden h-10  p-4 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-black" 
    placeholder="Enter Password" name='password'  type={ pass ? 'text': 'password'} value={form.password} onChange={handleChange}/><span className='absolute right-20 text-sm font-light bottom-3 hover:cursor-pointer' onClick={showPassword}>{pass ? "Hide":"Show"}</span>
 </div>
</div>
<div className='flex items-center  justify-center mt-6'>
<button className="font-semibold flex text-sm  px-6 py-2  bg-green-500 text-black font-normal rounded-3xl shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-800 focus:ring-opacity-75 " onClick={savePassword}>
      <img src={image1} alt="icon" className="w-5 h-6 mr-2" />
      Save
    </button>
    </div>
    {passArray.length!=0 ? <div className=''>
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
    {passArray.map((item,index)=> {
         return <tr key={index}>
        <td>{item.site}</td>
        <td>{item.username}</td>
        <td>{item.password}</td>
        <td className="hover:cursor-pointer" onClick={()=>handleRemove(index)}>Remove</td>
      </tr>
    })}
  
  </tbody>
</table>


    </div>
    </div> : <div className='mt-10'>No passwords to show</div>}

       </div>
    </div>
  )
}

export default body
