import { supabase } from '../../../supabaseclient';
import { useState, useEffect } from 'react';

function Admin() {
  const [fetchError, setFetchError] = useState(null);
  const [org, setOrg] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('organisation')
        .select();

      console.log("Data:", data, "Error:", error);  // Log data and error for debugging

      if (error) {
        setFetchError('Sorry, there was an error fetching data.');
        setOrg(null);
      } else {
        setOrg(data);
        setFetchError(null);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Data</h1>
      {fetchError && <p>{fetchError}</p>}
      {org ? (
        <ul>
          {org.map((item) => (
            <li key={item.org_id}>{item.org_name}</li>  
          ))}
        </ul>
      ) : (
        !fetchError && <p>Loading...</p>
      )}
    </div>
  );
}

export default Admin;