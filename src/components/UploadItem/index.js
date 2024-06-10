import {useState} from 'react'


import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'

import youtubeIcon from '../../assets/youtubeIcon.png'
import closeIcon from '../../assets/closeIcon.png'

import './index.css'

const UploadItem = (props) => {
    const {itemDetails,fileName, setFileName,fileDescription, setFileDescription,onFileSaved} = props
    const {icon, name} = itemDetails 
    
    const [errorMsg, setErrorMsg] = useState('false')
    const onEnterFileName = (event) => {
          setFileName(event.target.value)
    }
    const onEnterDescription = (event) => {
      setFileDescription(event.target.value)
    }

    const onFileSave = (close) => {
      if (fileName.length === 0) {
          setErrorMsg(true)
      } else {
        onFileSaved()
        setErrorMsg(false)
        close()
      }
    }
    
  return (
      <div className="popup-container">
      <Popup
        modal
        trigger={
          <button type="button" className="upload-item-container">
              <img src={icon} alt='icon' className='upload-item-icon' />
              <p className='upload-item-name'>{name}</p>
          </button>
        }
      >
        {close => (
          <>
            <div className='upload-item-modal-container'>
              <div className='modal-header'>
                <div className='modal-logo-container'>
                      <img src={youtubeIcon} alt='modal icon' className='modal-icon' />
                      <h1 className='modal-heading'>Upload from youtube</h1>
                  </div>
                  <button
                  type="button"
                  className="close-icon"
                  onClick={() => close()}
                >
                  <img src={closeIcon} alt='close-icon' className='close-icon-img' />
                </button>
              </div>
              <div className='input-field-container'>
                  <label className='modal-name'>Name</label>
                  <input id='fileName' type='text' value={fileName} onChange={onEnterFileName} className='modal-input' />
                  <label className='modal-name'>Description</label>
                  <input id='fileName' type='text' value={fileDescription} onChange={onEnterDescription} className='modal-input' />
              </div>
              {errorMsg === true ? <p className='error-msg'>*File Name Can't be empty</p>: ''}
              <button className='save-button' onClick={() => onFileSave(close)} type='button'>Save</button>
            </div>
            
          </>
        )}
      </Popup>
  </div>
  )
}

export default UploadItem  