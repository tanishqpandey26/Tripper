import React,{useState,useEffect} from 'react';
import UserFunctionalityNavbar from './UserFunctionalityNavbar';
import "./CreateItineraryPageStyles.css";
import CreateImg from  "../assets/create.png";
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdDelete,MdEdit } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";


function CreateItineraryPage() {

  const [title, setTitle] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [remarks, setRemarks] = useState('');

  const [itineraries, setItineraries] = useState([]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    if (!token) {
      toast.error('You need to be logged in to create an itinerary');
      return;
    }

    try{
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
        toast.success('Itinerary created successfully!');
        setTitle('');
        setFrom('');
        setTo('');
        setRemarks('');
        fetchItineraries();
    } else {
        toast.error(`Failed to create itinerary: ${data.message}`);
    }
  }catch (error){
    toast.error('an error occured while creating itinerary');
    console.error('error creating itinerary',error);
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
        toast.error(`Failed to fetch itineraries: ${data.message}`);
      }
    } catch (error) {
      toast.error('Error fetching itineraries:', error);
      console.error('Error fetching itineraries:', error);
    }
  };

  useEffect(() => {
    fetchItineraries();
  }, []);
  

  const [showOptionsMenu, setShowOptionsMenu] = useState(null);

  const handleOptionsMenu = (id) => {
    setShowOptionsMenu(showOptionsMenu === id ? null : id);
  };


  const handleDelete = async (itineraryId) => {
    
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('https://tripper-apis.vercel.app/api/itineraries/delete-itinerary/${itineraryId}', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if(response.ok){
        setItineraries(itineraries.filter(itinerary => itinerary._id !== itineraryId));
        toast.success('Itinerary deleted successfully.');
      }
      else{
        toast.error("Failed to delete itinerary");
      }
  } 
    catch(error) {
      toast.error('An error occured while deleting the itinerary');
      console.error('Error deleting itinerary',error);
    }
  }

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
              <div className="itinerary-header">
              <h2>{itinerary.title}</h2>
              <div className="button-group">
              <button onClick={() => handleOptionsMenu(itinerary._id)}><BsThreeDotsVertical /></button>
              {showOptionsMenu === itinerary._id && (
                  <div className="options-menu">
                    <button><MdEdit /> Edit</button>
                    <button onClick={() => handleDelete(itinerary._id)}><MdDelete /> Delete</button>
                  </div>
                )}
              </div>
              </div>
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


export default CreateItineraryPage;
