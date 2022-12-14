import {useState, useEffect} from 'react';


const useFetch = (url) =>{

        const [data, setData] = useState(null);
        const [isPending, setIspending] = useState(true);
        const[error, setError] = useState(null);

    useEffect(() =>{
        const abortCont= new AbortController();

    fetch(url, {signal:abortCont.signal})
        .then(res =>{
            if(!res.ok){
                throw Error('could not fetch the data from the resource. try again...')
            }
            return res.json();
             })
        .then(data =>{
            setError(null);
            setData(data);
            setIspending(false);
            })
        .catch(err => {
            if(err.name === 'AbortError'){
                console.log('fetch aborted');
            }else{
            setError(err.message);
            setIspending(false);
             }
        })
             return() => abortCont.abort(); 
             }, [url])

    return {data, isPending, error}


}
export default useFetch;