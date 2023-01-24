import { CircularProgress, FilledInput, FormControl, InputAdornment, InputLabel } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addChatRoom, changeUserStatus, pushToChatRoom, setChatRooms, setStompClient, setUsersList } from '../../../store/chatSlice';
import SimpleAlert from '../../reusable/simple_alert/SimpleAlert';
import UserRequests from '../../reusable/UserRequests';
import './ChatPage.css'
import MessegesList from './messegesList/MessegesList';
import UsersList from './usersList/UsersList';
import MessageStatus from '../../../enum/MessageStatus';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import axios from "axios"

var stompClient = null;

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

  // change user status
  const changeUserStatusInStore = (userName, status) => {
    let index = chat.usersList.findIndex((elem) => elem.userName === userName)
    if( index !== -1 )
      dispatch(changeUserStatus({index: index, newStatus: status}));
  }

  // Chat handeling

  const OnError = (err) => {
    console.log(err);
  }

  const OnConnected = () => {
    chat.stompClient.subscribe('/chatroom/public', OnPublicMessageReceived);
    // stompClient.subscribe('/user/'+userData.username+'/private', onPrivateMessage);
    userJoin();
  }

  const Connect = () => {
    let Sock = new SockJS('http://localhost:8080/ws');
    stompClient = over(Sock);
    stompClient.connect({}, OnConnected, OnError);
    dispatch(setStompClient(stompClient));
  }

  // messages handeling

  const handlePreviousPublicMessage = (message) => {
    dispatch(pushToChatRoom({chatName: "CHATROOM",chatMessage: message}));
  }

  const OnPublicMessageReceived = (payload)=>{
    const payloadData = JSON.parse(payload.body);
    switch( payloadData.status ){
      case MessageStatus.JOIN:
        if(!chat.chatRooms.get(payloadData.senderName)){
            dispatch(addChatRoom({name: payloadData.senderName, list: []}));
        }
        sendNoticeMessage();
        //TODO: Zmien status goscia
        changeUserStatusInStore(payloadData.senderName, "online")
        break;

      case MessageStatus.MESSAGE:
        dispatch(pushToChatRoom({chatName: "CHATROOM",chatMessage: payloadData}));
        break;

      case MessageStatus.NOTICE:
        if(!chat.chatRooms.get(payloadData.senderName))
          UserRequests.RequestAllUsersData(requestUserDataSettled, requestUserDataRejected)
        break;

      case MessageStatus.LEAVE:
          UserRequests.RequestAllUsersData(requestUserDataSettled, requestUserDataRejected)
        break; 
    }
  }

  // sending message

  const userJoin = () => {
    var chatMessage = {
      senderName: login.userName,
      status: MessageStatus.JOIN
    };
    chat.stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
  }

  const sendNoticeMessage = () => {
    var chatMessage = {
        senderName: login.userName,
        status: MessageStatus.NOTICE
      };
    chat.stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
  }

  const sendLeaveMessage = () => {
    var chatMessage = {
      senderName: login.userName,
      status: MessageStatus.LEAVE
    };
    if( chat.stompClient )
      chat.stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
  }

  const sendMessage = () => {
    if (chat.stompClient) {
      if( chat.selectedUserName === "CHATROOM" ){
        const chatMessage = {
          senderName: login.userName,
          message: inputMessage,
          status: MessageStatus.MESSAGE
        };
        console.log(chatMessage);

        chat.stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
        setInputMessage("");
      }
    }
  }

  // request messeges

    const getAllPreviousPublicMessages = () => {
      axios.get(`http://localhost:8080/messages?userName=null`)
          .then(res => {
              const messages = res.data;
              console.log(messages)
              messages.map((message) => handlePreviousPublicMessage(message))
          })
    }

  // Request user Data

  const requestUserDataSettled = (response) => {
    if( response.status === 200 ){
      dispatch(setUsersList(response.data))
      response.data.map((elem) => {
        dispatch(addChatRoom({name: elem.userName, list: []}));
      })
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

  // request status change

  const requestUserStatusChangeSettled = (response) => {
  }

  const requestUserStatusChangeRejected = (response) => {
    setAlertInfo({
      title: "Users data status change failed",
      content: "Error code: "+response.status
    })
    handleClickOpen();
  }

  const intialList = [
    {
      messageId: 1,
      senderName: 'jakub',
      receiverNam: "testUser",
      message: "hi testUser from jakub",
      messageDate: null,
      status: "MESSAGE",
    },
    {
      messageId: 2,
      senderName: "testUser",
      receiverNam: "jakub",
      message: "hi jakub from testUser",
      messageDate: null,
      status: "MESSAGE",
    },
  ]

  const StartChat = () => {
    changeUserStatusInStore(login.userName, "online")
    UserRequests.RequestUserStatusChange(login.userName, "online")
    Connect();
    // getAllPreviousPriavteMessages();
    getAllPreviousPublicMessages();
  }

  useEffect(() => {
    if( login.userName !== "" )
      StartChat();
  }, [ login.userName ])

  return (
    <div className="chat-container">
      <div className="users-list">
        <UsersList list={chat.usersList}/>
      </div>
      <div className="chat-box">
        <div>
          <div className="messages-box">
            <MessegesList list={chat.chatRooms}/>
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
            <button className='navButton' onClick={() => sendMessage()}>
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