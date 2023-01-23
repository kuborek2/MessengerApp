

const connect =()=>{
  let Sock = new SockJS('http://localhost:8080/ws');
  stompClient = over(Sock);
  stompClient.connect({},onConnected, onError);
}