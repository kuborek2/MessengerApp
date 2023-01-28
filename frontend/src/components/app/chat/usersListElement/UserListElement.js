
import { popoverClasses } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUserName } from '../../../../store/chatSlice';
import './UserListElement.css'

const UserListElement = ({props, imageSrc, userName, statusColor}) => {

  const backgroundColor = {
    selected: {
      backgroundColor: "white"
    },
    default: {
      backgroundColor: "#00C9C7"
    }
  }

  const chat = useSelector(state => state.chat)
  const dispach = useDispatch();
  
  const handleClick = () => {
    dispach(setSelectedUserName(userName))
  }

  const assessElementBackgroundColor = () => {
    if( chat.selectedUserName === userName )
      return backgroundColor.selected
    return backgroundColor.default
  }

  const [colorOfElemnt, setColorOfElement] = useState(assessElementBackgroundColor())

  useEffect(() => {
    setColorOfElement(assessElementBackgroundColor())
  }, [chat.selectedUserName])

  return (
    <div className='user-list-element-container' style={colorOfElemnt} onClick={() => handleClick()}>
      <div>
        <img src={imageSrc === "" ? "https://cdn-icons-png.flaticon.com/512/259/259987.png" : imageSrc} alt=""/>
        <div className="user-status" style={{ backgroundColor: statusColor }}/>
      </div>
      <h1>{userName}</h1>
    </div>
  );
}

export default UserListElement;