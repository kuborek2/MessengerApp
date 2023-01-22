
import { popoverClasses } from '@mui/material';
import { useState } from 'react';
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

  const [colorOfElemnt, setColorOfElement] = useState(backgroundColor.default)

  return (
    <div className='user-list-element-container' style={colorOfElemnt}>
      <div>
        <img src={imageSrc} alt=""/>
        <div className="user-status" style={{ backgroundColor: statusColor }}/>
      </div>
      <h1>{userName}</h1>
    </div>
  );
}

export default UserListElement;