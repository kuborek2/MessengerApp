
import UserListElement from '../usersListElement/UserListElement'
import './UsersList.css'

const UsersList = ({ list }) => {

  const statusColors = {
    OFFLINE: "red",
    ONLINE: "green",
    AWAY: "yellow"
  }

  const userStatusToStatusColor = (status) => {
    switch (status){
      case 'online':
        return statusColors.ONLINE
        break;

      case 'offline':
        return statusColors.OFFLINE
        break;

      case 'AWAY':
        return statusColors.AWAY
        break;

      default:
        return "white"
    }
  }

  const chatRoom = {
    userName: "CHATROOM",
    status: "online",
    imageSrc: "https://cdn-icons-png.flaticon.com/512/259/259987.png"
  }

  if( list && list.length <= 0 ){
      return (<></>);
  } else {
    console.log(list)
    let actuallList = [chatRoom,...list]
    let result = actuallList.map((elem) => {
      if ( typeof elem === 'object' ){
        let keys = Object.keys(elem);
        if( keys.includes("userName") && keys.includes("status") && keys.includes("imageSrc") ){
          return (
            <UserListElement
              key={elem.userName}
              imageSrc={elem.imageSrc}
              userName={elem.userName} 
              statusColor={userStatusToStatusColor(elem.status)}/>
          );
        }
      }
      return '';
    })
    return result;
  }
}

export default UsersList;

{/* <UserListElement 
imageSrc={"https://steamuserimages-a.akamaihd.net/ugc/938339513159173288/2A192A5863DF25EDF9C83AA2E92F5205DB5D3649/?imw=512&imh=442&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true"}
userName="Jakub" 
statusColor="red"/> */}

// "userName": "jakub",
//     "status": "offline",
//     "password": "123",
//     "imageSrc"