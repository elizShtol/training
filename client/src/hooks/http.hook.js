import { useState, useCallback } from 'react'
// import { useMessage } from './message.hook'

export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const request = useCallback(async(url, method = 'GET', body = null, headers = {}) => {
        setLoading(true)
        try {
            if(body){
                body=JSON.stringify(body)
                headers['Content-Type']='application/json'
            }
            console.log("ads",body)
            const response = await fetch(url, { method, body, headers })
            const data = await response.json()
            if (!response.ok) {
                throw new Error(data.message || 'что то пошло не так http hook')
            }
            setLoading(false)
            return data
        } catch (error) {
            setLoading(false)
            setError(error.message)
            console.log(error)
            throw error
        }

    }, [])

    const clearError = useCallback(() => setError(null),[])
    return { loading, request, error, clearError };

}