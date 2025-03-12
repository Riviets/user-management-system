import { useNavigate } from "react-router-dom"

export default function NoMatch(){
    const navigate = useNavigate()
    return(
        <div className="flex flex-col gap-5 min-h-screen justify-center items-center ">
            <h1 className="font-bold text-5xl">Page not found!</h1>
            <button onClick={()=>navigate(-1)} className="btn border-gray-600 bg-gray-400 hover:bg-gray-500">Go back</button>
        </div>
    )
}