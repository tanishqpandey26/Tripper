import React, { useState, useEffect } from 'react';
import UserFunctionalityNavbar from './UserFunctionalityNavbar';
import "./CreateItineraryPageStyles.css";
import CreateImg from "../assets/create.png";
import EditImg from "../assets/edit-iti.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdDelete, MdEdit,MdShare } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';

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

        try {
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
        } catch (error) {
            toast.error('An error occurred while creating the itinerary');
            console.error('Error creating itinerary', error);
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
            const response = await fetch(`https://tripper-apis.vercel.app/api/itineraries/delete-itinerary/${itineraryId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                setItineraries(itineraries.filter(itinerary => itinerary._id !== itineraryId));
                toast.success('Itinerary deleted successfully.');
            } else {
                toast.error('Failed to delete itinerary.');
            }
        } catch (error) {
            toast.error('An error occurred while deleting the itinerary');
            console.error('Error deleting itinerary:', error);
        }
    };

    const [isEditing, setIsEditing] = useState(false);
    const [editItineraryId, setEditItineraryId] = useState(null);

    const startEditing = (itinerary) => {
        setTitle(itinerary.title);
        setFrom(itinerary.from.split('T')[0]);
        setTo(itinerary.to.split('T')[0]);
        setRemarks(itinerary.remarks);
        setIsEditing(true);
        setEditItineraryId(itinerary._id);
    };

    const handleEdit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`https://tripper-apis.vercel.app/api/itineraries/edit-itinerary/${editItineraryId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ title, from, to, remarks }),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success('Itinerary updated successfully!');
                setTitle('');
                setFrom('');
                setTo('');
                setRemarks('');
                setIsEditing(false);
                setEditItineraryId(null);
                fetchItineraries();
            } else {
                toast.error(`Failed to update itinerary: ${data.message}`);
            }
        } catch (error) {
            toast.error('An error occurred while updating the itinerary');
            console.error('Error updating itinerary:', error);
        }
    };

    const navigate = useNavigate();

    const handleShareClick = () => {
        navigate('/shareitinerarypage')
    };

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
            
            <div className='edit-page'>
            {isEditing && (
                   <>

                        <div className="edit-iti-img">
                        <img src={EditImg} alt="Edit Itinerary" />
                        </div>

                        <div className='edit-form'>
                        <h1>Edit Itinerary</h1>
                        <form onSubmit={handleEdit}>
                            <input
                                type='text'
                                name='trip-title'
                                placeholder='Trip Title'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                            <label htmlFor='edit-from'>From:</label>
                            <input
                                type='date'
                                id='edit-from'
                                value={from}
                                onChange={(e) => setFrom(e.target.value)}
                                required
                            />
                            <label htmlFor='edit-to'>To:</label>
                            <input
                                type='date'
                                id='edit-to'
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
                            <button type="submit">Update Itinerary</button>
                            <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                        </form>
                        </div>
                        </>
                )}
                </div>
                

            <div className='itineraries'>
                
                {itineraries.length > 0 ? (
                    itineraries.map((itinerary) => (
                        <div key={itinerary._id} className="itinerary-card">
                            <div className="itinerary-header">
                                <h2>{itinerary.title}</h2>
                                <div className="button-group">
                                    <button onClick={() => handleOptionsMenu(itinerary._id)}><BsThreeDotsVertical/></button>
                                    {showOptionsMenu === itinerary._id && (
                                        <div className="options-menu">

                                            <button onClick={() => startEditing(itinerary)}><MdEdit /> Edit</button>
                                            <button onClick={() => handleDelete(itinerary._id)}><MdDelete /> Delete</button>
                                            <button onClick={handleShareClick}><MdShare /> Share</button>

                                        </div>
                                    )}
                                </div>
                            </div>
                            <p><strong>From:</strong> {new Date(itinerary.from).toLocaleDateString()}</p>
                            <p><strong>To:</strong> {new Date(itinerary.to).toLocaleDateString()}</p>
                            <p><strong>Remarks:</strong> {itinerary.remarks}</p>
                            <p><strong>Itinerary ID:</strong> {itinerary._id}</p> 
                        </div>
                    ))
                ) : (
                    <p>No itineraries found.</p>
                )}
            </div>
            <ToastContainer />
        </>
    );
}

export default CreateItineraryPage;

