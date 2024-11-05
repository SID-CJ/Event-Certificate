import React, { useState } from 'react';
import Papa from 'papaparse';
import { supabase } from '../../../supabaseclient'; // Adjust the import path as necessary
import './participant.css';
import { Container } from 'react-bootstrap';


const Participant = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please upload a CSV file.');
      return;
    }

    Papa.parse(file, {
      header: true, // Use the first row as headers
      skipEmptyLines: true, // Skip empty lines
      complete: async (results) => {
        const { data } = results;

        // Prepare data for insertion into Supabase
        const formattedData = data.map((item) => ({
          participant_id: item.participant_id, // Assuming these keys match your CSV headers
          event_id: item.event_id,
          participant_name: item.participant_name,
          participation_status: item.participation_status,
          stud_id: item.stud_id,
        }));

        try {
          // Insert the data into the participant table
          const { error } = await supabase
            .from('participant')
            .insert(formattedData);

          if (error) throw error;

          setMessage('Participants uploaded successfully!');
        } catch (error) {
          console.error('Error uploading participants:', error);
          setMessage('Failed to upload participants. Please try again.');
        }
      },
      error: (error) => {
        console.error('Error parsing CSV:', error);
        setMessage('Failed to parse CSV file.');
      },
    });
  };

  return (
    <>
    <Container className="centered-container">
      <h1>Upload Participants</h1>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button type='Danger'onClick={handleUpload}>Upload</button>
      {message && <p>{message}</p>}
    </Container>
    </>
  );
};

export default Participant;
