import { supabase } from '../supabaseclient';
import { useState,useEffect } from 'react';
function App() {
  const[fetchError,setFecthError]=useState(null)
  const[org,setOrg]=useState(null)
  useEffect(()=>{
    const fetchData=async() =>{
      const{data,errors}= await supabase
      .from('organisation')
      .select()
      if (error){
        setFecthError('Sorry')
        setOrg(null)
        console.log(error)
      }
      if (data){
        setOrg(data)
        setFecthError(null)
      }
    } 

    fetchData()
  },[])
  return (
    <div>
      <h1>data</h1>
    </div>
  );
}

export default App;
