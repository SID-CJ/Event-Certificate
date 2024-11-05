import React, { useState, useEffect } from 'react';
import { supabase } from '../../../supabaseclient'; // Adjust path as needed
import { useLocation } from 'react-router-dom'; // Import useLocation to get passed state
import './certi.css';
import backgroundImg from '../../assets/background.png';

const Certi = () => {
    const location = useLocation();
    const { eventId, eventName } = location.state || {}; // Get eventId and eventName from the location state

    const [participants, setParticipants] = useState([]); // State to store participant names
    const [selectedName, setSelectedName] = useState('');
    const [date, setDate] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [showCertificate, setShowCertificate] = useState(false);

    useEffect(() => {
        const fetchParticipants = async () => {
            setLoading(true);
            try {
                const { data, error } = await supabase
                    .from('participant')
                    .select('participant_name')
                    .eq('event_id', eventId); // Filter participants by the specific event_id
                
                if (error) {
                    throw error;
                }

                setParticipants(data || []);
            } catch (error) {
                console.error('Error fetching participant names:', error);
            } finally {
                setLoading(false);
            }
        };

        if (eventId) {
            fetchParticipants(); // Fetch participants only if eventId is present
        }
    }, [eventId]); // Run effect when eventId changes

    const generateCertificate = () => {
        if (!selectedName || !date || !eventName) {
            setError("Please fill in all fields.");
            setShowCertificate(false); 
        } else {
            setError('');
            setShowCertificate(true); 
        }
    };

    const downloadCertificate = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 1200;
        canvas.height = 800;

        const img = new Image();
        img.src = backgroundImg;

        img.onload = () => {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            // Draw the border
            ctx.lineWidth = 10;
            ctx.strokeStyle = '#ff6600';
            ctx.strokeRect(5, 5, canvas.width - 10, canvas.height - 10);

            // Draw text
            ctx.fillStyle = '#000';
            ctx.textAlign = 'center';
            ctx.font = '40px "Lobster", cursive';
            ctx.fillText('FEDERAL INSTITUTE OF SCIENCE AND TECHNOLOGY', canvas.width / 2, 300);
            
            ctx.font = '38px Arial';
            ctx.fillText('Certificate of Participation', canvas.width / 2, 370);
            
            ctx.font = '32px Arial';
            ctx.fillText('This certifies that', canvas.width / 2, 440);
            
            ctx.font = '36px Arial';
            ctx.fillText(selectedName, canvas.width / 2, 500);
            
            ctx.font = '32px Arial';
            ctx.fillText('has participated in the event', canvas.width / 2, 560);
            ctx.fillText(eventName || 'Event Name Unavailable', canvas.width / 2, 600); // Show event name or fallback
            ctx.fillText('on', canvas.width / 2, 640);
            ctx.fillText(new Date(date).toLocaleDateString(), canvas.width / 2, 680); // Only show date

            // Download the certificate
            const link = document.createElement('a');
            link.download = 'certificate.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        };
    };

    return (
        <div className="certificate-container">
            <h1>Event Certificate Generator</h1>
            {loading ? (
                <p>Loading participant names...</p>
            ) : (
                <form onSubmit={(e) => e.preventDefault()} className="certificate-form">
                    <label>
                        Name:
                        <select
                            value={selectedName}
                            onChange={(e) => setSelectedName(e.target.value)}
                            required
                        >
                            <option value="">Select participant name</option>
                            {participants.map((participant, index) => (
                                <option key={index} value={participant.participant_name}>
                                    {participant.participant_name}
                                </option>
                            ))}
                        </select>
                    </label>
                    <br />
                    <label>
                        Date:
                        <input 
                            type="date" 
                            value={date} 
                            onChange={(e) => setDate(e.target.value)} 
                            required 
                        />
                    </label>
                    <br />
                    {/* Display the event name that was passed */}
                    <h3>Event Name: {eventName || 'Event Name Unavailable'}</h3>
                    <br />
                    {error && <p className="error-message">{error}</p>}
                    <button type="button" onClick={generateCertificate}>
                        Generate Certificate
                    </button>
                </form>
            )}

            {showCertificate && !loading && (
                <div className="certificate-preview">
                    <h2>Certificate of Participation</h2>
                    <h3>FEDERAL INSTITUTE OF SCIENCE AND TECHNOLOGY</h3>
                    <p>This certifies that</p>
                    <h3>{selectedName}</h3>
                    <p>has participated in the event</p>
                    <h3>{eventName}</h3>
                    <p>on</p>
                    <p>{new Date(date).toLocaleDateString()}</p> {/* Only displaying date */}
                    <button onClick={downloadCertificate}>
                        Download Certificate
                    </button>
                </div>
            )}
        </div>
    );
};

export default Certi;
