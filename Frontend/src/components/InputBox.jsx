
export default function InputBox({Label,For,placeholder,type,onChange}){
  return (
    <div>
      <label className="font-sans mt-[10px]" for={For}>{Label}</label>
      <input onChange={onChange} type={type} placeholder={placeholder} id={For} className="bg-gray-700  border border-gray-700 px-[7px] block rounded-md focus:ring-primary-600 text-white
      focus:border-primary-600 dark:bg-gray-700 dark:border-slate-50 dark:placeholder-gray-50 dark:text-white dark:focus:ring-slate-50 dark:focus:border-slate-50 py-[7px]" ></input>
    </div>
    
  )
}