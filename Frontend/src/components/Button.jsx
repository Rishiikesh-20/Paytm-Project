
export function Button({onPress}){
  return (
    <button onClick={onPress} type="button" className="w-full bg-gray-700 p-[10px] block mx-auto text-white rounded-2xl cursor-pointer">Submit</button>
  )
}