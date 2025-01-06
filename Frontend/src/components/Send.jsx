import { useLocation, useNavigate } from "react-router-dom";
import InputBox from "./InputBox";
import { useState } from "react";
import axios from "axios";
export default function Send() {
  const navigate=useNavigate();
  const token=localStorage.getItem('token');
  const [amount,setAmount]=useState(0);
  const [change,setChange]=useState(false);
  const [message,setMessage]=useState("");
  const location = useLocation();
  const user = location.state;
  return (
    <div className="">
      <button onClick={()=>{navigate('/dashboard')}} className="px-[14px] py-[7px] m-[10px] bg-red-400">back</button>
      <div className="flex justify-center items-center w-screen h-screen">
        <div className="bg-slate-50 shadow-lg flex flex-col w-[500px] h-[300px] px-[20px] justify-around">
          {
          change?(<div className="text-center font-bold text-green-500 text-[25px]">
            {console.log(message)}{message}!</div>):(<><div className="font-bold text-center">Send Money</div>
          <div className="space-y-5  flex flex-col justify-center ">
            <div className="flex items-center">
              <div className="w-[30px] h-[30px] bg-green-500 text-white mx-[10px] rounded-[15px] text-center flex items-center justify-center">
                <p className="mt-[3px]">
                  {user?.firstName?.substring(0, 1).toUpperCase() || ""}
                </p>
              </div>

              <p className="font-bold">{user.username}</p>
            </div>
            <div className="font-bold">Amount (in USD)</div>
            <div className="flex justify-between">
              <InputBox onChange={e=>setAmount(e.target.value)} type={"text"} placeholder={"Enter amount"} For={"amount"}/>
              <button onClick={async ()=>{
                const response=await axios.post('http://localhost:3000/api/v1/account/transfer',{
                  to:user.username,
                  amount:parseFloat(amount)
                },{
                  headers:{Authorization:'Bearer '+token}
                })
                setChange(true);
                setMessage(response.data.message);
              }}className="bg-yellow-300 w-[200px] rounded-lg hover:bg-gray-400">Transfer</button>
            </div>
            
          </div></>)
          }
          
        </div>
      </div>
    </div>
  );
  
}
