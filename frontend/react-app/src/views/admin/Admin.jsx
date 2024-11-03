import { supabase } from '../../../supabaseclient';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import '../../customStyles.css';
import './Admin.css';

function Admin() {
  const navigate = useNavigate();
  const [fetchError, setFetchError] = useState(null);
  const [org, setOrg] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('organisation')
        .select();

      console.log("Data:", data, "Error:", error);

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

  // Updated handleButtonClick to accept an item parameter
  const handleButtonClick = (item) => {
    // Pass the organization ID and name as state or query parameters
    navigate('/event', { state: { orgId: item.org_id, orgName: item.org_name } });
  };

  return (
    <div className='custom-background d-flex justify-content-center align-items-center' style={{ minHeight: '100vh', width: '100vw' }}>
      <Container className="text-center">
        <h1>Create Event</h1>
        {fetchError && <p>{fetchError}</p>}
        {org ? (
          <div>
            {org.map((item) => (
              <Button 
                key={item.org_id} 
                style={{ display: 'block', margin: '10px auto' }} 
                onClick={() => handleButtonClick(item)}  // Pass item to handleButtonClick
              >
                {item.org_name}
              </Button>
            ))}
          </div>
        ) : (
          !fetchError && <p>Loading...</p>
        )}
      </Container>
    </div>
  );
}

export default Admin;
