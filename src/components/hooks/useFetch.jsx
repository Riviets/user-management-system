import {useState, useEffect} from 'react'

export default function useFetch(fetchFunction, params=[]){
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    async function fetchData(){
        try{
            setIsLoading(true)
            const response = await fetchFunction(...params)
            setData(response)
        }
        catch(err){
            setError(err)
        }
        finally{
            setIsLoading(false)
        }
    }

    useEffect(()=>{
        fetchData()
    }, [fetchFunction])

    async function refetch(){
        fetchData()
    }

    return {data, isLoading, error, refetch}
}