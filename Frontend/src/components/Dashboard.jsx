import { useEffect, useState } from "react";
import axios from "axios";
import InputBox from "./InputBox";
import Send from "./Send";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
export default function Dashboard(){
  const [user,setUser]=useState({});
  const [balance,setBalance]=useState(0);
  const token=localStorage.getItem("token");
  
  const [searchedUser,setSearchedUser]=useState("");
  const[resultUser,setResultUser]=useState([]);
  
  console.log(token);
  useEffect(()=>{
    const fetchData=async()=>{
      const {data}=await axios.get("http://localhost:3000/api/v1/user/getUser",{
        headers:{
          Authorization:"Bearer "+token,
        }
      });
      setUser(data.user);
      setBalance(data.balance)
      console.log({user:data.user});
      console.log(balance);
    }
    fetchData();

    
  },[])

  useEffect(()=>{
    const fetchUser= async ()=>{
      let response=await axios.get("http://localhost:3000/api/v1/user/bulk");
      let arr=response.data.users;
      let index= arr.findIndex(u => u.username==user.username);
      console.log({index})
      arr.splice(index,1);
      setResultUser(arr);
      console.log({ResultUSer:arr});
    }
    fetchUser();
  },[user])

  return (
    <div className="font-sans">
      <Heading name={user.firstName}/>
      <Line/>
      <Balance balance={balance}/>
      <Line />
      <Users resultUser={resultUser} handleSearch={(e)=>{
        setSearchedUser(e.target.value)
      }} handleClick={async ()=>{
        const response=await axios.get("http://localhost:3000/api/v1/user/bulk",{
          params:{
            filter:searchedUser
          }
        })
        let arr=response.data.users;
        let index= arr.findIndex(u => u.username==user.username);
        console.log({index})
        arr.splice(index,1);
        if(arr){
          console.log("Inside USers")
          setResultUser(arr);
        }else{
          console.log("Inside else ")
          setResultUser([]);
        }
      }}/>
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
        <p className="mt-[3px]">{name?.substring(0,1) || ""}</p>
      </div>
    </div>
  </div>
  );
}

function Balance({balance}){
  return (
  <div className="p-[10px]">
    <div>Your Balance: ${balance.toFixed(2)}</div>
  </div>
  )
}
function Users({handleSearch,handleClick,resultUser}){
  return (
  <div className="flex flex-col p-[10px] space-y-4">
    <div class="font-bold">Users</div>
    <Search type={"text"} placeholder={"Search users..."} handleClick={handleClick} handleSearch={handleSearch}/>
    {console.log({InsideUsers:resultUser})}
    <div>
      {resultUser !=[] ? resultUser.map(user=>{
         return <>
          <ResultUser user={user}/>
          <Line />
          </>
        }) : <div>No users Found</div>
        
      }
    </div>
    
  </div>
  )
}
function Line(){
  return (
    <div className="w-full h-[1px] bg-gray-500 opacity-25 my-[10px]">
    </div>
  )
}

function Search({type,placeholder,handleSearch,handleClick}){
  
  return (
    <div className="flex">
      <input onChange={handleSearch} type={type} placeholder={placeholder} className="border-[2px] border-gray-400 p-[10px] w-full mx-10px "/>
      <input onClick={handleClick} type="button" value="Find" className="p-[10px] bg-yellow-400 w-[100px] mx-[10px] hover:bg-gray-500"/>
    </div>
  )
}

function ResultUser({user}){
  const navigate=useNavigate();
  console.log({InsdeResultUSer:user})
  return (
    <div className="flex my-[10px] justify-between">
      <div className="flex items-center">
        <div className="w-[30px] h-[30px] bg-gray-500 text-white mx-[10px] rounded-[15px] text-center flex align-center justify-center">
          <p className="mt-[3px]">{user.firstName?.substring(0,1).toUpperCase() || ""}</p>
        </div>
        <p className="font-bold">{user.username}</p>
      </div>
      
      <input onClick={()=>{
        navigate('/send',{state:user});
      }} type="button" value="Send Money" className="bg-gray-500 p-[10px]  mr-[10px] hover:bg-sky-300"/>
    </div>
  )
}