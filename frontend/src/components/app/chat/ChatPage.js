import { CircularProgress, FilledInput, FormControl, InputAdornment, InputLabel } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUsersList } from '../../../store/chatSlice';
import SimpleAlert from '../../reusable/simple_alert/SimpleAlert';
import UserRequests from '../../reusable/UserRequests';
import './ChatPage.css'
import UsersList from './usersList/UsersList';


const ChatPage = () => {

  const login = useSelector(state => state.login)
  const chat = useSelector(state => state.chat)
  const dispatch = useDispatch();

  // Visiability of loading screen control
  const blockerDisplayOption = {
    visable: {
        display: "flex"
    },
    hidden:  {
        display: "none"
    }
  }
  
  const [isBlockerOut, setIsBLockerOut] = useState(blockerDisplayOption.hidden)

  //Alert control
  const [open, setOpen] = useState(false);
  const [alertInfo, setAlertInfo] = useState({
      title: "",
      content: ""
  })

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

  // Request user Data
  const requestUserDataSettled = (response) => {
    if( response.status === 200 ){
      dispatch(setUsersList(response.data))
    }
  }

  const requestUserDataRejected = (response) => {
    setAlertInfo({
      title: "Users data request failed",
      content: "Error code: "+response.status
    })
    handleClickOpen();
  }

  useEffect(() => {
    if( login.isUserLoggedIn){
        setIsBLockerOut(blockerDisplayOption.visable)
        UserRequests.RequestAllUsersData(requestUserDataSettled, requestUserDataRejected)
        setIsBLockerOut(blockerDisplayOption.hidden)
    }
}, [login])

  return (
    <div className="chat-container">
      <div className="users-list">
        <UsersList list={chat.usersList}/>
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
      <div className='loadingBlocker' style={isBlockerOut}>
        <CircularProgress />
      </div>
      <SimpleAlert
                open={open}
                onClose={handleClose}
                info={alertInfo}
            />
    </div>
  )
}

export default ChatPage;