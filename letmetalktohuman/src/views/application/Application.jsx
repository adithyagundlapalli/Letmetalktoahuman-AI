import React, { useState } from 'react';
import './AppStyles.css';
import NavBar from '../navbar/NavBar';

export default function IVRAgentComponent() {
  const [formData, setFormData] = useState({
    myName: '',
    myPhoneNum: '',
    callerName: '',
    callerPhoneNum: '',
    description: ''
  });
  const [response, setResponse] = useState(''); // To store the assistant's response

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { callerPhoneNum, description } = formData;

    // Ensure the phone number has a country code
    const formattedCallerPhoneNum = callerPhoneNum.startsWith('+')
      ? callerPhoneNum
      : `+1${callerPhoneNum}`; // Assuming US country code, replace if necessary

    const callPayload = {
      phoneNumberId: 'fcc60a94-7078-4d08-9084-589ae478e0c4',  // Replace with your actual phone number ID
      assistantId: '34393b9a-ac80-4661-9b9f-0634b7fd2aeb',  // Your IVR assistant ID
      customer: {
        number: formattedCallerPhoneNum,  // Caller phone number from the form
      },
      type: 'outboundPhoneCall',
      // assistant: {
      //   model: {
      //     provider: 'openai', // LLM provider to assist with IVR
      //     model: 'gpt-3.5-turbo', // Replace with a valid model name
      //     messages: [
      //       {
      //         role: 'system',
      //         content: `You are an agent assisting a caller in navigating a company's phone menu. You are helping the caller reach customer service to address the issue: ${description}. You will only respond with the correct number of the option they should press on the phone. Your goal is to wait until the caller has finished listening to the entire menu, and then respond with the correct option.`,
      //       },
      //     ],
      //   },
      //   dialKeypadFunctionEnabled: true,  // Enable DTMF tone dialing
      // },
    };

    try {
      // Make the call and send instructions to the assistant
      const callResponse = await fetch('/call', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer 2ac772ff-5902-40bd-af27-cc01063b776e',  // Replace with your actual API key
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(callPayload),
      });

      if (!callResponse.ok) {
        const errorDetails = await callResponse.json(); // Get error details
        console.error('Error Details:', errorDetails);
        throw new Error(`Error initiating the call: ${errorDetails.message}`);
      }

      const callData = await callResponse.json();
      setResponse(`Call initiated successfully: ${JSON.stringify(callData)}`);
      
    } catch (error) {
      console.error('Error handling the call:', error);
      setResponse('Error handling the call.');
    }
  };

  return (

    <div className='container'>
    <NavBar />
        <div className="form-container">
      <h1 className="form-title">Let me talk to a HUMAN!</h1>
      <form className="form-content" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="myName" className="form-label">My Name:</label>
          <input
            type="text"
            id="myName"
            name="myName"
            className="form-input"
            value={formData.myName}
            onChange={handleChange}
            placeholder='John Doe'
          />
        </div>
        <div className="form-group">
          <label htmlFor="myPhoneNum" className="form-label">My Phone Number:</label>
          <input
            type="text"
            id="myPhoneNum"
            name="myPhoneNum"
            className="form-input"
            value={formData.myPhoneNum}
            onChange={handleChange}
            placeholder='1234567890'
          />
        </div>
        <div className="form-group">
          <label htmlFor="callerName" className="form-label">Caller Name:</label>
          <input
            type="text"
            id="callerName"
            name="callerName"
            className="form-input"
            value={formData.callerName}
            onChange={handleChange}
            placeholder='Chase Bank'
          />
        </div>
        <div className="form-group">
          <label htmlFor="callerPhoneNum" className="form-label">Caller Phone Number:</label>
          <input
            type="text"
            id="callerPhoneNum"
            name="callerPhoneNum"
            className="form-input"
            value={formData.callerPhoneNum}
            onChange={handleChange}
            placeholder='1234567890'
          />
        </div>
        <div className="form-group">
          <label htmlFor="description" className="form-label">Description:</label>
          <textarea
            id="description"
            name="description"
            className="form-textarea"
            value={formData.description}
            onChange={handleChange}
            placeholder='Ex: I need help with creating a new checkings account!'
          />
        </div>
        <button type="submit" className="form-submit-button">Submit</button>
      </form>
    </div>
    </div>
  );
}
