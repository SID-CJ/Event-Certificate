import React, { useState, useEffect } from 'react';
import './Certificate.css';
import backgroundImg from './background.png'; // Adjust the path as necessary

const Certificate = () => {
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [eventName, setEventName] = useState(''); // Initialize as empty
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true); // Loading state
    const [showCertificate, setShowCertificate] = useState(false); // State to control certificate display

    // Fetch event details from the database on component mount
    useEffect(() => {
        const fetchEventDetails = async () => {
            setLoading(true);
            try {
                const response = await fetch('/api/event'); // Ensure this is your correct API endpoint
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                // Assuming the response contains fields for name, date, and event name
                setName(data.name || '');  // Adjust based on your API response structure
                setDate(data.date || '');  // Adjust based on your API response structure
                setEventName(data.eventName || ''); // Set fetched event name
            } catch (error) {
                console.error('Error fetching event details:', error);
                setEventName(''); 
            } finally {
                setLoading(false);
            }
        };

        fetchEventDetails();
    }, []);

    const generateCertificate = () => {
        if (!name || !date || !eventName) {
            setError("Please fill in all fields.");
            setShowCertificate(false); // Hide certificate if there is an error
        } else {
            setError('');
            setShowCertificate(true); // Show certificate if all fields are filled
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
            ctx.fillText(name, canvas.width / 2, 500);
            
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
                <p>Loading event details...</p>
            ) : (
                <form onSubmit={(e) => e.preventDefault()} className="certificate-form">
                    <label>
                        Name:
                        <input 
                            type="text" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            required 
                        />
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
                    <label>
                        Event Name:
                        <input 
                            type="text" 
                            value={eventName} 
                            onChange={(e) => setEventName(e.target.value)} 
                            placeholder="Enter event name" 
                            required 
                        />
                    </label>
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
                    <h3>{name}</h3>
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

export default Certificate;
