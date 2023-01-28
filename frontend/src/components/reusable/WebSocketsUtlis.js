
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import axios from 'axios';

// const OnConnected = () => {
//   setUserData({...userData, "connected": true});
//   stompClient.subscribe('/chatroom/public', onMessageReceived);
//   stompClient.subscribe('/user/'+userData.username+'/private', onPrivateMessage);
//   userJoin();
// }

// const onError = (err) => {
//   console.log(err);
// }

const connect = (OnError, OnConnected) => {
  let Sock = new SockJS('http://localhost:8080/ws');
  stompClient = over(Sock);
  stompClient.connect({},OnConnected, OnError);
}

