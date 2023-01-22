
import { popoverClasses } from '@mui/material';
import './UserListElement.css'

const UserListElement = ({props, imageSrc, userName, statusColor}) => {
  return (
    <div className='user-list-element-container'>
      <div>
        <img src={imageSrc} alt=""/>
        <div className="user-status" style={{ backgroundColor: statusColor }}/>
      </div>
      <h1>{userName}</h1>
    </div>
  );
}

export default UserListElement;