import { supabase } from '../../../supabaseclient';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import '../../customStyles.css';

function Admin() {
  const navigate = useNavigate();  // Initialize the navigate function
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

  const handleButtonClick = () => {
    navigate('/event');  // Redirect to the Event page
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
                onClick={handleButtonClick}  // Add onClick to button
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
