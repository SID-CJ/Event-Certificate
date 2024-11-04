import React, { useState } from 'react';

const Certificate = () => {
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [showCertificate, setShowCertificate] = useState(false);

    const generateCertificate = () => {
        if (name && date) {
            setShowCertificate(true);
        } else {
            alert("Please fill in both fields.");
        }
    };

    const downloadCertificate = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 1200; // Set the canvas width
        canvas.height = 800; // Set the canvas height

        // Set the background color
        ctx.fillStyle = '#ffcc00';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw the border
        ctx.lineWidth = 10;
        ctx.strokeStyle = '#ff6600';
        ctx.strokeRect(5, 5, canvas.width - 10, canvas.height - 10);

        // Draw text
        ctx.fillStyle = '#000';
        ctx.textAlign = 'center';
        ctx.font = '48px "Lobster", cursive';
        ctx.fillText('FEDERAL INSTITUTE OF SCIENCE AND TECHNOLOGY', canvas.width / 2, 300);
        
        ctx.font = '48px Arial';
        ctx.fillText('Certificate of Participation', canvas.width / 2, 370);
        
        ctx.font = '32px Arial';
        ctx.fillText('This certifies that', canvas.width / 2, 440);
        
        ctx.font = '36px Arial';
        ctx.fillText(name, canvas.width / 2, 500);
        
        ctx.font = '32px Arial';
        ctx.fillText('has participated in the event on', canvas.width / 2, 560);
        ctx.fillText(new Date(date).toLocaleDateString(), canvas.width / 2, 610);

        // Download the certificate
        const link = document.createElement('a');
        link.download = 'certificate.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    };

    return (
        <div style={{ 
            display: 'flex', 
            gridTemplateColumns: '1fr', 
            gridTemplateRows: 'auto 1fr', 
            alignItems: 'center', 
            justifyItems: 'flex-end', 
            minHeight: '100vh',
            backgroundColor: '#f0f8ff',
            paddingLeft:"700px",
            width:'1050px'
          
        }}>
            <h1 style={{textAlign:'center',alignItems:'flex-start',height:'1000px',justifyContent:'center'}}>Event Certificate Generator</h1>
            <form onSubmit={(e) => e.preventDefault()} style={{ textAlign: 'center', marginBottom: '20px' }}>
                <label>

                    Name:
                    <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                        style={{ margin: '10px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
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
                        style={{ margin: '10px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
                    />
                </label>
                <br />
                <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <button type="button" onClick={generateCertificate} style={{ padding: '10px 20px', borderRadius: '5px', backgroundColor: '#28a745', color: '#fff', border: 'none', cursor: 'pointer' }}>
                        Generate Certificate
                    </button>
                </div>
            </form>

            {showCertificate && (
                <div style={{ 
                    border: '2px solid #000', 
                    padding: '20px', 
                    textAlign: 'center', 
                    margin: '20px', 
                    width: '80%', 
                    maxWidth: '1000px', 
                    backgroundColor: '#fff', 
                    borderRadius: '10px', 
                    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    justifyContent: 'center', 
                }}>
                    <h2 style={{ color: '#ff6600' }}>Certificate of Participation</h2>
                    <h3 style={{ fontFamily: '"Lobster", cursive', color: '#ff6600', margin: '10px 0' }}>FEDERAL INSTITUTE OF SCIENCE AND TECHNOLOGY</h3>
                    <p>This certifies that</p>
                    <h3 style={{ color: '#007bff' }}>{name}</h3>
                    <p>has participated in the event on</p>
                    <p>{new Date(date).toLocaleDateString()}</p>
                    <button onClick={downloadCertificate} style={{ marginTop: '20px', padding: '10px 20px', borderRadius: '5px', backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}>
                        Download Certificate
                    </button>
                </div>
            )}
        </div>
    );
};

export default Certificate;
