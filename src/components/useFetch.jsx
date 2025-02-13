import { useCallback, useEffect, useState } from "react";
const cache = {}


export default function useFetch(url) {
    const [data, setData] = useState(cache[url] || null)
    const [loading, setLoading] = useState(!cache[url])
    const [error, setError] = useState(null)

    const fetchData = useCallback(async () => {
        if(cache[url]) return
        setLoading(true)
        try {
            const res = await fetch(url)
            if (res.ok) {
                const data = await res.json()
                cache[url] = data
                setData(data)
            } else {
                throw Error("Error al aceder a la API")
            }
        } catch (error) {
            console.log(error)
            setData([])
            setError(error.message)
        } finally {
            setLoading(false)
        }
    },[url])

    useEffect(() => {
        fetchData()
    },[fetchData])

    return { data, loading, error }
}