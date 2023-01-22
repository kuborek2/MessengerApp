import { FilledInput, FormControl, InputAdornment, InputLabel, TextField } from '@mui/material';
import { useState } from 'react';
import './ChatPage.css'
import UserListElement from './usersListElement/UserListElement.js';

const ChatPage = () => {

  // Input message hanldeing
  const [inputMessage, setInputMessage] = useState("")

  const handleInputChange = (e) => {
    const { value } = e.target;
    setInputMessage(value);
  }

  //tesxt field style
  const inputStyle = { 
    width: "70%",
    '& .MuiInputBase-root': {
      backgroundColor: 'white',
      },
    '&:hover .MuiInputBase-root': {
      backgroundColor: 'white',
      '& .MuiInputBase-root:before': {
        borderBottom: '1px solid #00C9C7',
        },
      '& .MuiInputBase-root:after': {
        borderBottom: '1px solid #00C9C7',
        },
      },
    '& .MuiInputBase-root.Mui-focused': {
      backgroundColor: 'white',
      '& .MuiInputBase-root:before': {
        borderBottom: '1px solid #00C9C7',
        },
      '& .MuiInputBase-root:after': {
        borderBottom: '1px solid #00C9C7',
        },
      '& .MuiFormLabel-root': {
        color: 'black',
        },
      },
    '& .MuiInputBase-root:before': {
      borderBottom: '1px solid #00C9C7',
      },
    '& .MuiInputBase-root:after': {
      borderBottom: '1px solid #00C9C7',
      },
    '& .MuiFormLabel-root': {
      color: 'black',
      },
    // '& label.Mui-focused': {
    //   color: 'black',
    //   },
    }

  return (
    <div className="chat-container">
      <div className="users-list">
        <UserListElement 
          imageSrc={"https://steamuserimages-a.akamaihd.net/ugc/938339513159173288/2A192A5863DF25EDF9C83AA2E92F5205DB5D3649/?imw=512&imh=442&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true"}
          userName="Jakub" 
          statusColor="red"/>
        <div>Yes</div>
      </div>
      <div className="chat-box">
        <div>
          <div className="messages-box">

          </div>
          <div className='input-box'>
            <FormControl fullWidth sx={inputStyle} variant="filled">
              <InputLabel htmlFor="filled-adornment-amount">Message</InputLabel>
              <FilledInput
                id="filled-adornment-amount"
                multiline
                rows={2}
                value={inputMessage}
                onChange={handleInputChange}
                startAdornment={<InputAdornment position="start"></InputAdornment>}
                />
            </FormControl>
            <button className='navButton'>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatPage;