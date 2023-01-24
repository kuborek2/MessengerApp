
import { useSelector } from 'react-redux';
import MessegesListElement from '../messegesListElement/MessegesListElement';
import './MessegesList.css'

const MessegesList = ({list}) => {

  const chat = useSelector(state => state.chat)
  let filteredList;

  const findProfilePicture = (userName) => {
    let userIndex = chat.usersList.findIndex((elem) => elem.userName === userName)
    return userIndex === -1 ? "https://cdn-icons-png.flaticon.com/512/259/259987.png" : chat.usersList[userIndex].imageSrc
  }

  const shouldShowIcon = (index, userName) => {
    if( index-1 !== -1 )
      return filteredList[index-1].senderName === userName ? false : true
    else
      return true
  }

  if( list.findIndex((elem) => elem.name === chat.selectedUserName) !== -1 ){
    let filteredObjectsList = list.filter((elem) => elem.name === chat.selectedUserName)
    filteredList = filteredObjectsList[0].list
    console.log("this is filetered objects list")
    console.log(filteredObjectsList)
    console.log("this is filteredlist: ")
    console.log(filteredList)
  } else {
    return (<></>)
  }

  if( filteredList && filteredList.length <= 0 ){
    return (<></>);
  } else {
    let result = filteredList.map((elem, index) => {
      if ( typeof elem === 'object' ){
        let keys = Object.keys(elem);
        if( keys.includes("senderName") && keys.includes("message") ){
          return (
            <MessegesListElement 
              key={elem.messageId+elem.senderName+String(Math.floor(Math.random()))}
              imageSrc={findProfilePicture(elem.senderName)} 
              message={elem.message}
              senderName={elem.senderName}
              showIcon={shouldShowIcon(index, elem.senderName)}/>
          );
      }
      }
      return '';
    })
    return (
      <div style={{ display: "flex", flexDirection: "column" }}> 
        {result} 
      </div>
    );
  }
}

export default MessegesList;

/**
 * Message {
 *  id: 1, <- autogenerate
 *  senderName: jakub, <- not null
 *  receiverNam: testUser,
 *  message: message,
 *  messageDate: null,
 *  status: Status,
 * }
 */