
export default function Signup(){
  return (
  <div className="bg-slate-900 h-screen w-screen m-0 p-0 flex flex-col items-center justify-center mx-auto">
    
    <div className="bg-slate-50 px-[50px] py-[30px] flex flex-col justify-center rounded-lg shadow-md shadow-slate-100">
      <div className="flex items-center font-sans font-bold mx-auto mb-[20px]">
        <img className="w-[50px] h-[50px] float-left mr-[10px]" src="https://images.seeklogo.com/logo-png/39/1/google-pay-logo-png_seeklogo-393962.png?v=1957294351691504488" />
        Skar Pay
      </div>
      <form className="space-y-4 font-sans" action="/signup" method="post">
        <label className="font-sans mt-[10px]" for="username">UserName : </label>
        <input type="text" id="username" className="bg-gray-700  border border-gray-700 px-[7px] block rounded-md focus:ring-primary-600 
        text-white focus:border-primary-600 dark:bg-gray-700 dark:border-slate-50 dark:placeholder-slate-50 dark:text-white dark:focus:ring-slate-50 dark:focus:border-slate-50"></input>
        <br/>
        <label className="font-sans mt-[10px]" for="username">First Name : </label>
        <input type="text" id="username" className="bg-gray-700 block border border-gray-700 px-[7px] rounded-md focus:ring-primary-600 
        text-white focus:border-primary-600 dark:bg-gray-700 dark:border-slate-50 dark:placeholder-slate-50 dark:text-white dark:focus:ring-slate-50 dark:focus:border-slate-50"></input>
        <br/>
        <label className="font-sans mt-[10px]" for="username">Last Name : </label>
        <input type="text" id="username" className="bg-gray-700 block border border-gray-700 px-[7px] rounded-md focus:ring-primary-600 
        text-white focus:border-primary-600 dark:bg-gray-700 dark:border-slate-50 dark:placeholder-slate-50 dark:text-white dark:focus:ring-slate-50 dark:focus:border-slate-50"></input>
        <br/>
        <label className="font-sans mt-[10px]" for="username"> Password : </label>
        <input type="password" id="username" className="bg-gray-700 block border border-gray-700 px-[7px] rounded-md focus:ring-primary-600 
        text-white focus:border-primary-600 dark:bg-gray-700 dark:border-slate-50 dark:placeholder-slate-50 dark:text-white dark:focus:ring-slate-50 dark:focus:border-slate-50"></input>
        <br/>
        <label for="username" className="break-words mt-[10px]"> Confirm Password : </label>
        <input type="password" id="username" className="bg-gray-700 block border border-gray-700 px-[7px] rounded-md focus:ring-primary-600 
        text-white focus:border-primary-600 dark:bg-gray-700 dark:border-slate-50 dark:placeholder-slate-50 dark:text-white dark:focus:ring-slate-50 dark:focus:border-slate-50"></input>
        <button type="submit" className="bg-gray-700 p-[10px] block mx-auto text-white rounded-xl cursor-pointer">Submit</button>
        <div className="text-gray-700 ">
          Already have an account 
          <a className="text-blue-700 underline ml-[3px] cursor-pointer" href="/signin">Signin</a>
        </div>
      </form>

    </div>

  </div>
  )
}