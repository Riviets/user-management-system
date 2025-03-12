import {useState, useEffect} from 'react'

export default function useFetch(fetchFunction){
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(()=>{
        async function fetchData(){
            try{
                setIsLoading(true)
                const response = await fetchFunction()
                setData(response)
            }
            catch(err){
                setError(err)
            }
            finally{
                setIsLoading(false)
            }
        }
        fetchData()
    }, [fetchFunction])

    return {data, isLoading, error}
}