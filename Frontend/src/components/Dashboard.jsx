import { useEffect, useState } from "react";
import axios from "axios";
export default function Dashboard(){
  const [user,setUser]=useState({});
  const token=localStorage.getItem('token');
  useEffect(()=>{
    const fetchData=async()=>{
      const {data}=await axios.get("http://localhost:3000/api/v1/user/getUser",{
        headers:{
          Authorization:"Bearer "+token,
        }
      });
      setUser(data.user);
      console.log(data.user);
    }
    fetchData();
  },[])

  return (
    <div className="font-sans">
      <Heading name={user.firstName}/>
      <Line/>
      <Balance balance={user.balance}/>
      <Line />
      <Users />
    </div>
  );
}

function Heading({name}){
  return (
  <div className="flex justify-between p-[10px] items-center">
    <div className="font-bold flex items-center">
      <img className="w-[50px] h-[50px] float-left mr-[10px]" src="https://images.seeklogo.com/logo-png/39/1/google-pay-logo-png_seeklogo-393962.png?v=1957294351691504488" />
      <p>Skar Pay</p>
    </div>
    <div className="flex items-center">
      <div>Hello, {name}</div>
      <div className="w-[30px] h-[30px] bg-gray-500 text-white mx-[10px] rounded-[15px] text-center flex align-center justify-center">
        <p className="mt-[3px]">{name.substring(0,1)}</p>
      </div>
    </div>
  </div>
  );
}

function Balance({balance}){
  return (
  <div>
    <div>Your Balance: ${balance}</div>
  </div>
  )
}
function Users(){
  return <></>
}
function Line(){
  return (
    <div className="w-full h-[1px] bg-gray-500 opacity-25 my-[10px]">
    </div>
  )
}