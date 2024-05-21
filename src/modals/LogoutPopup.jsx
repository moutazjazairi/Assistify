import React from 'react'
import "./LogoutPopup.css"
import B1 from "../Assets/B1.png"

const LogoutPopup = ({onClose, onLogout}) => {
  return (
    <div className='LogoutPopup'>
      <div className='Logpopup-content'>
        <div className='Logleft-section' >
          <img src={B1} alt=''/>
        </div>
        <div className='Logright-section'>
        <h2>هل أنت متأكد من تسجيل الخروج</h2>
        <button  onClick={onLogout} >تأكيد</button>
        <button onClick={onClose} > تراجع</button>
        </div>
      </div>
    </div>
  )
}

export default LogoutPopup