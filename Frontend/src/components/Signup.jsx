import { useState,useRef } from "react";
import {useNavigate} from "react-router-dom"
import { Button } from "./Button";
import InputBox from "./InputBox";
import axios from "axios"
export default function Signup(){
  const [username,setUserName]=useState("");
  const [firstName,setFirstName]=useState("");
  const [lastName,setLastName]=useState("");
  const [password,setPassword]=useState("");
  const navigate=useNavigate();
  const errorRef=useRef();
  return (
  <div className="bg-slate-900 h-screen w-screen m-0 p-0 flex flex-col items-center justify-center mx-auto">
    
    <div className="bg-slate-50 px-[50px] py-[30px] flex flex-col justify-center rounded-lg shadow-md shadow-slate-100">
      <div className="flex items-center font-sans font-bold mx-auto mb-[20px]">
        <img className="w-[50px] h-[50px] float-left mr-[10px]" src="https://images.seeklogo.com/logo-png/39/1/google-pay-logo-png_seeklogo-393962.png?v=1957294351691504488" />
        Skar Pay
      </div>
      <div className="space-y-4 font-sans">
        <InputBox onChange={e => setUserName(e.target.value)} type={"text"} placeholder={"username"} For={"username"} Label={"Username:"} />
        <InputBox onChange={e=>setFirstName(e.target.value)} type={"text"} placeholder={"firstname"} For={"firstname"} Label={"First Name:"} />
        <InputBox onChange={e=>setLastName(e.target.value)} type={"text"} placeholder={"lastname"} For={"lastname"} Label={"Last name:"} />
        <InputBox onChange={e=>setPassword(e.target.value)} type={"password"} placeholder={"●●●●●"} For={"password"} Label={"Password:"} />
        <InputBox type={"password"} placeholder={"●●●●●"} For={"confirmpassword"} Label={"Confirm Password:"} />
        <div ref={errorRef} className="text-red-500"></div>
        <Button onPress={async (e)=>{
          errorRef.current.innerHTML=""
          localStorage.clear();
          await axios.post("http://localhost:3000/api/v1/user/signup",{
            username,
            firstName,
            lastName,
            password
          }).then(
            response=>{
              console.log(response.data);
              if(response.data.message==="User created successfully"){
                localStorage.setItem('token',response.data.token);
                navigate('/dashboard')
              }else if(response.data.message){
                const element=document.createElement('div');
                element.innerHTML="* "+response.data.message;
                errorRef.current.appendChild(element);
              }
              else{
                if(response.data.errors.username){
                  const element=document.createElement('div')
                  element.innerHTML="* "+response.data.errors.username.message.substring(5);
                  errorRef.current.appendChild(element);
                }
                if(response.data.errors.firstName){
                  const element=document.createElement('div')
                  element.innerHTML="* "+response.data.errors.firstName.message.substring(5);
                  errorRef.current.appendChild(element);
                }
                if(response.data.errors.lastName){
                  const element=document.createElement('div')
                  element.innerHTML="* "+response.data.errors.lastName.message.substring(5);
                  errorRef.current.appendChild(element);
                }
                if(response.data.errors.password){
                  const element=document.createElement('div')
                  element.innerHTML="* "+response.data.errors.password.message.substring(5);
                  errorRef.current.appendChild(element);
                }
                
              }
            }
          )
        }}/>
        <div className="text-gray-700 ">
          Already have an account 
          <a className="text-blue-700 underline ml-[3px] cursor-pointer" href="/signin">Signin</a>
        </div>
        
      </div>

    </div>

  </div>
  )
}