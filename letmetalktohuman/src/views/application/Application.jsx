import React, { useState } from 'react';
import './AppStyles.css';
export default function IVRAgentComponent() {
import NavBar from '../navbar/NavBar';
import ErrorAlert from './ErrorAlert';
import PhoneInput from 'react-phone-input-2'; // Importing PhoneInput
import 'react-phone-input-2/lib/style.css'; // Import styles for PhoneInput
export default function Component() {
  const [formData, setFormData] = useState({
    myName: '',
    myPhoneNum: '',
    callerName: '',
    callerPhoneNum: '',
    description: ''
  });
  const [response, setResponse] = useState(''); // To store the assistant's response

  const [nameError, setNameError] = useState(false);  // To track validation error

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update form data
    setFormData({ ...formData, [name]: value });

    // Reset the error if the user is typing in the myName field
    if (name === 'myName' && nameError) {
      setNameError(false);  // Clear error when typing starts again
    }
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

  const handlePhoneChange = (value, name) => {
    setFormData({ ...formData, [name]: value }); // Update phone number with the selected value
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const nameRegex = /^[a-zA-Z]+\s[a-zA-Z]+$/i;

    // Validate myName using the regex
    if (!nameRegex.test(formData.myName)) {
      setNameError(true); // Set error if regex doesn't match
    } else {
      setNameError(false); // Clear error if regex matches
      console.log(formData);
      // Proceed with form submission logic here
    }
  };

  return (

    <div>
      <h1>Welcome to the IVR Assistant Page!</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>My Name:</label>

    <div className='container'>
        <div className="form-container">
      <h1 className="form-title">Lemme talk to a HUMAN!</h1>
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

        <div>
          <label>Caller Name (e.g., Best Buy):</label>

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

        <div>
          <label>Description (What do you need?):</label>

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

      {/* Display the assistant's response */}
      {response && (
        <div>
          <h2>Response:</h2>
          <p>{response}</p>
        </div>
      )}
    </div>

    <><NavBar/>
    <div className='container'>
      <NavBar />
      <div className="form-container">
        <h1 className="form-title">Lemme talk to a HUMAN!</h1>
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
            {nameError && (
              <ErrorAlert 
                message="Please enter a valid name (Firstname Lastname)." 
                onClose={() => setNameError(false)} // Close button to clear error
              />
            )}
          </div>
          <div className="form-group">
            <label htmlFor="myPhoneNum" className="form-label">My Phone Number:</label>
            <PhoneInput
              country={'us'} // Default country can be changed
              value={formData.myPhoneNum}
              onChange={(value) => handlePhoneChange(value, 'myPhoneNum')}
              className="form-input"
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
            <PhoneInput
              country={'us'} // Default country can be changed
              value={formData.callerPhoneNum}
              onChange={(value) => handlePhoneChange(value, 'callerPhoneNum')}
              className="form-input"
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
              placeholder='Ex: I need help with creating a new checking account!'
            />
          </div>
          <button type="submit" className="form-submit-button">Submit</button>
        </form>
      </div>

    </div>
    </>
  );
}