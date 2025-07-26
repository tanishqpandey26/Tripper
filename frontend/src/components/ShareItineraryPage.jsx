import React, { useState, useEffect } from 'react';
import UserFunctionalityNavbar from './UserFunctionalityNavbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./ShareItineraryPageStyles.css";
import { MdDelete } from "react-icons/md";

function ShareItineraryPage() {
  const [itineraryId, setItineraryId] = useState('');
  const [recipientEmails, setRecipientEmails] = useState('');

  const handleShare = async (e) => {
    e.preventDefault();

    const emailsArray = recipientEmails.split(',').map(email => email.trim());
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`https://tripper-api.vercel.app/api/itineraries/share`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ itineraryId, recipientEmails: emailsArray }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Itinerary shared successfully');
      } else {
        toast.error(`Failed to share itinerary: ${data.message}`);
      }
    } catch (error) {
      toast.error('An error occurred while sharing the itinerary');
      console.error('Error sharing itinerary:', error);
    }
  };


  const [receivedItineraries, setReceivedItineraries] = useState([]);

  const fetchReceivedItineraries = async () => {
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('https://tripper-api.vercel.app/api/itineraries/received', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        throw new Error(`Unexpected response: ${text}`);
      }

      const data = await response.json();
      if (response.ok) {
        console.log('Received itineraries:', data);
        setReceivedItineraries(data);  
      } else {
        console.error(`Failed to fetch received itineraries: ${data.message}`);
      }
    } catch (error) {
      console.error('Error fetching received itineraries:', error.message);
    }
  };

  useEffect(() => {
    fetchReceivedItineraries();
  }, []);


  const handleDelete = async (itineraryId) => {
    const token = localStorage.getItem('token');
    
    try {
      const response = await fetch(`https://tripper-api.vercel.app/api/itineraries/received/${itineraryId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        setReceivedItineraries(receivedItineraries.filter(itinerary => itinerary._id !== itineraryId));
        toast.success('Itinerary deleted successfully');
      } else {
        const data = await response.json();
        toast.error(`Failed to delete itinerary: ${data.message}`);
      }
    } catch (error) {
      console.error('Error deleting itinerary:', error.message);
      toast.error('An error occurred while deleting the itinerary');
    }
  };


  return (
    <>
      <UserFunctionalityNavbar />

      <div className="share-iti-container">
        <div className="share-iti-form">
          <h2>Share Your Itinerary</h2>
          <form onSubmit={handleShare}>
            <input 
              type="text" 
              name="itinerary-id" 
              placeholder="Itinerary ID"
              value={itineraryId}
              onChange={(e) => setItineraryId(e.target.value)} 
              required 
            />
            <input
              type="email" 
              name="recipient-email" 
              placeholder="Recipient Email (comma-separated)"
              value={recipientEmails}
              onChange={(e) => setRecipientEmails(e.target.value)}
              required 
            />
            <button type="submit">Share Itinerary</button>
          </form>
        </div>

        <div className="receive-iti-section">
          <h2>Received Itineraries</h2>
          {receivedItineraries.length > 0 ? (
            receivedItineraries.map(itinerary => (
              <div key={itinerary._id} className="itinerary-card">
                <h3>{itinerary.title}</h3>
                <p><strong>From:</strong> {new Date(itinerary.from).toLocaleDateString()}</p>
                <p><strong>To:</strong> {new Date(itinerary.to).toLocaleDateString()}</p>
                <p><strong>Remarks:</strong> {itinerary.remarks}</p>
                <button onClick={() => handleDelete(itinerary._id)}><MdDelete/></button>
              </div>
            ))
          ) : (
            <p>No itineraries received.</p>
          )}
        </div>
      </div>

      <ToastContainer />
    </>
  );
}

export default ShareItineraryPage;
