import React,{useState,useEffect} from 'react';
import UserFunctionalityNavbar from './UserFunctionalityNavbar';
import "./CreateItineraryPageStyles.css";
import CreateImg from  "../assets/create.png";
import { ToastContainer } from 'react-toastify';


function CreateItineraryPage() {

  const [title, setTitle] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [remarks, setRemarks] = useState('');

  const [itineraries, setItineraries] = useState([]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    const response = await fetch('https://tripper-apis.vercel.app/api/itineraries/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ title, from, to, remarks }),
    });

    const data = await response.json();

    if (response.ok) {
      alert('Itinerary created successfully!');
      
      setTitle('');
      setFrom('');
      setTo('');
      setRemarks('');
    } else {
      alert(`Failed to create itinerary: ${data.message}`);
    }
  };


  const fetchItineraries = async () => {
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('https://tripper-apis.vercel.app/api/itineraries/user-itineraries', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setItineraries(data.itineraries);
      } else {
        console.error(`Failed to fetch itineraries: ${data.message}`);
      }
    } catch (error) {
      console.error('Error fetching itineraries:', error);
    }
  };

  useEffect(() => {
    fetchItineraries();
  }, []);


  return (

    <>    
    <UserFunctionalityNavbar/>

    <div className='create-head'>
    <h1>Create Your Itinerary</h1>
    </div>

    <div className="iti-page">
    
        <div className="create-iti-img">
          <img src={CreateImg} alt="Create Itinerary" />
        </div>

        <div className="create-iti-form">
          <form onSubmit={handleSubmit}>

          <input
              type='text'
              name='trip-title'
              placeholder='Trip Title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <label htmlFor='from'>From:</label>
            <input
              type='date'
              id='from'
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              required
            />

            <label htmlFor='to'>To:</label>
            <input
              type='date'
              id='to'
              value={to}
              onChange={(e) => setTo(e.target.value)}
              required
            />

            <textarea
              placeholder='Remarks'
              rows='10'
              name='remarks'
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              required
            ></textarea>

            <button type="submit">Create Itinerary</button>

          </form>
        </div>
      </div>


      <h1>Your Itinerary</h1>
      <div className='itineraries'>
        {itineraries.length > 0 ? (
          itineraries.map((itinerary) => (
            <div key={itinerary._id} className="itinerary-card">
              <h2>{itinerary.title}</h2>
              <p><strong>From:</strong> {new Date(itinerary.from).toLocaleDateString()}</p>
              <p><strong>To:</strong> {new Date(itinerary.to).toLocaleDateString()}</p>
              <p><strong>Remarks:</strong> {itinerary.remarks}</p>
            </div>
          ))
        ) : (
          <p>No itineraries found.</p>
        )}
      </div>


      <ToastContainer/>
    </>
    
  )
}

export default CreateItineraryPage
