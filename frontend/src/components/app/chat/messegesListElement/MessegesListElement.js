
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './MessegesListElement.css'

const MessegesListElement = ({imageSrc, message, senderName, showIcon}) => {

  const login = useSelector(state => state.login)

  const messageImageVisability = {
    hidden: {
      display: "none"
    },
    visable: {
      display: "block"
    }
  }

  const messageOrientationOptions = {
    left: "left",
    right: "right"
  }

  const assessMessageOrientation = () => {
    if( login.userName === senderName )
      return messageOrientationOptions.right
    return messageOrientationOptions.left
  }

  const [messageOrientation, setMessageOrientation] = useState(messageOrientationOptions.left)

  useEffect(() => {
    setMessageOrientation(assessMessageOrientation())
  })

  const assessIconVisability = () => {
    return showIcon ? messageImageVisability.visable : messageImageVisability.hidden
  }

  return (
    <div className={messageOrientation}>
      <div className='messeges-list-element-container'>
        <div className='img-container' style={assessIconVisability()}>
          <img src={imageSrc} alt={senderName}/>
        </div>
        <div className='message-container'>
          <h4>{message}</h4>
        </div>
      </div>
    </div>
  );
}

export default MessegesListElement;