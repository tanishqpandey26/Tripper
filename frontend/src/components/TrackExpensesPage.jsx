import React, { useState } from 'react';
import UserFunctionalityNavbar from './UserFunctionalityNavbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './TrackExpensesPageStyles.css';
import Trackexp from '../assets/trackexpense.png';

function TrackExpensesPage() {
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [place, setPlace] = useState('');
  const [remarks, setRemarks] = useState('');
  const [isSplit, setIsSplit] = useState(false);
  const [splitEqually, setSplitEqually] = useState(true);
  const [participants, setParticipants] = useState([{ email: '', amount: '' }]);


  const handleAddParticipant = () => {
    setParticipants([...participants, { email: '', amount: '' }]);
  };

 
  const handleRemoveParticipant = (index) => {
    const newParticipants = participants.filter((_, i) => i !== index);
    setParticipants(newParticipants);
  };

  
  const handleParticipantChange = (index, field, value) => 
    {
    const newParticipants = participants.map((participant, i) =>
      i === index ? 
    { ...participant, [field]: value }
     : participant
    );
    setParticipants(newParticipants);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    toast.success('Expense submitted successfully!');
  };

  return (
    <>
      <UserFunctionalityNavbar />

      <div className='create-head'>
        <h1>Track Your Expenses</h1>
      </div>

      <div className='exp-func'>

      <img 
      alt='track expense iamge'
      src={Trackexp}
      ></img>

      <div className='expense-form'>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label>Amount:</label>
            <input
              type='number'
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          <div className='form-group'>
            <label>Date:</label>
            <input
              type='date'
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div className='form-group'>
            <label>Time:</label>
            <input
              type='time'
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>

          <div className='form-group'>
            <label>Place:</label>
            <input
              type='text'
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              required
            />
          </div>

          <div className='form-group'>
            <label>Remarks:</label>
            <textarea
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
            />
          </div>

          <div className='form-group'>
            <label>Is this a split expense?</label>
            <input
              type='checkbox'
              checked={isSplit}
              onChange={() => setIsSplit(!isSplit)}
            />
          </div>

          {isSplit && (
            <>
              <div className='form-group'>
  <label>Split Equally?</label>
  <div className="radio-group">
    <label>
      <input
        type='radio'
        checked={splitEqually}
        onChange={() => setSplitEqually(true)}
      />
      Yes
    </label>
    <label>
      <input
        type='radio'
        checked={!splitEqually}
        onChange={() => setSplitEqually(false)}
      />
      No
    </label>
  </div>
</div>

              <div className='form-group'>
                <label>Participants:</label>
                {participants.map((participant, index) => (
                  <div key={index} className='participant'>
                    <input
                      type='email'
                      placeholder='Enter email'
                      value={participant.email}
                      onChange={(e) =>
                        handleParticipantChange(index, 'email', e.target.value)
                      }
                      required
                    />
                    {!splitEqually && (
                      <input
                        type='number'
                        placeholder='Enter amount'
                        value={participant.amount}
                        onChange={(e) =>
                          handleParticipantChange(index, 'amount', e.target.value)
                        }
                      />
                    )}
                    <button
                      type='button'
                      onClick={() => handleRemoveParticipant(index)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button type='button' onClick={handleAddParticipant}>
                  Add Participant
                </button>
              </div>
            </>
          )}

          <button type='submit'>Submit Expense</button>
        </form>
      </div>

      </div>

      <ToastContainer />
    </>
  );
}

export default TrackExpensesPage;
