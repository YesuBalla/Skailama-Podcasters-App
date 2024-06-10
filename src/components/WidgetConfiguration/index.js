import React, { useState } from 'react';
import AWS from 'aws-sdk'; 
import S3 from 'aws-sdk/clients/s3'; 

import Sidebar from '../Sidebar'
import TopBar from '../TopBar'

import roundIcon from '../../assets/roundIcon.png'
import uploadIcon from '../../assets/uploadIcon.png'

import './index.css'



function WidgetConfiguration() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false)
  const [tabId, setTabId] = useState('GENERAL')

  const allowedTypes = [
    'image/jpeg',
    'image/png',
    'application/pdf',
    'video/mp4',
    'video/quicktime',
    'audio/mpeg',
    'audio/wav',
    
  ];

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (allowedTypes.includes(selectedFile.type)) {
      setFile(selectedFile);
    } else {
      alert('Invalid file type. Only images and PDFs are allowed.');
    }
  };

  const uploadFile = async () => {
    setUploading(true)
    const S3_BUCKET = "skailama-profile-media"; // Replace with your bucket name
    const REGION = "ap-south-1"; // Replace with your region

    AWS.config.update({
      accessKeyId: "AKIATCKAQ7NKUQSSGPUD",
      secretAccessKey: "G4Sf5o3B3dEkm3oXqcscML7fA4ecA1jWUZMtf/xc",
    });

    const s3 = new S3({
      params: { Bucket: S3_BUCKET },
      region: REGION,
    });

    const params = {
      Bucket: S3_BUCKET,
      Key: file.name,
      Body: file,
    };

    try {
      const upload = await s3.putObject(params).promise();
      console.log(upload);
      setUploading(false)
      alert("File uploaded successfully.");

    } catch (error) {
      console.error(error);
      setUploading(false)
      alert("Error uploading file: " + error.message); 
    }
  };

  const renderUploadField = () => (
      <div className="upload-field-container">
      <input type="file" required onChange={handleFileChange} className='input-file-bar' />
      <button onClick={uploadFile} className='upload-file-button'>
        {uploading ? 'Uploading...' : 'Upload File'} 
        <img src={uploadIcon} alt='upload icon' className='upload-icon' />
      </button>
      <p className='tab-description'>Recommended Size: 48x48px</p>
    </div>
  )
  const renderGeneralTabView = () => (
      <div className='general-tab-content'>
        <label className='general-label-text'>Chatbot Name</label>
        <input type='text' className='general-tab-input' />
        <p className='tab-description'>Lorem ipsuim dolor sit Lorem ipsuim dolor sit</p>
        <label className='general-label-text'>Welcome Message</label>
        <input type='text' className='general-tab-input' />
        <p className='tab-description'>Lorem ipsuim dolor sit Lorem ipsuim dolor sit</p>
        <label className='general-label-text'>Input Placeholder</label>
        <input type='text' className='general-tab-input' />
        <p className='tab-description'>Lorem ipsuim dolor sit Lorem ipsuim dolor sit</p>
      </div>
  )

  const renderDisplayTabView = () => (
    <div className='display-tab-content'>
      <div className='color-section'>
        <div className='section'>
          <label className='display-label-text'>Primary Color</label>
          <div className='display-input-bar'>
            <input type='text' className='display-input' />
            <input type='color' className='display-color-input' />
          </div>
          <p className='tab-description'>Lorem ipsuim dolor sit Lorem ipsuim dolor sit</p>
          <label className='display-label-text'>Font Size (in px)</label>
          <input type='number' className='display-tab-input' />
          <p className='tab-description'>Lorem ipsuim dolor sit Lorem ipsuim dolor sit</p>
        </div>
        <div className='section'>
          <label className='display-label-text'>Font Color</label>
          <div className='display-input-bar'>
            <input type='text' className='display-input' />
            <input type='color' className='display-color-input' />
          </div>
          <p className='tab-description'>Lorem ipsuim dolor sit Lorem ipsuim dolor sit</p>
          <label className='display-label-text'>Chat Height (in % of total screen)</label>
          <input type='number' className='display-tab-input' />
          <p className='tab-description'>Lorem ipsuim dolor sit Lorem ipsuim dolor sit</p>
        </div>
      </div>
      <div className='radio-button-section'>
        <div className='radio-button-bar'>
            <label className='display-label-text'>Show Sources</label>
            <input type='radio' className='radio-input' />
        </div>
        <p className='tab-description'>Lorem ipsuim dolor sit Lorem ipsuim dolor sit</p>
      </div>
      <hr className='horizontal-line' />
      <h1 className='chat-icon-heading'>Chat Icon</h1>
      <div className='color-section'>
        <div className='section'>
          <label className='display-label-text'>Chat Icon Size</label>
          <select name='size' className='display-tab-input'>
            <option value={'Small (48x48 px)'} className='option'>Small (48x48 px)</option>
          </select>
          <p className='tab-description'>Lorem ipsuim dolor sit Lorem ipsuim dolor sit</p>
          <label className='display-label-text'>Distance from Bottom (in px)</label>
          <input type='number' className='display-tab-input' />
          <p className='tab-description'>Lorem ipsuim dolor sit Lorem ipsuim dolor sit</p>
        </div>
        <div className='section'>
          <label className='display-label-text'>Position on Screen</label>
          <select name='position' className='display-tab-input'>
            <option value={'Bottom Right'} className='option'>Bottom Right</option>
          </select>
          <p className='tab-description'>Lorem ipsuim dolor sit Lorem ipsuim dolor sit</p>
          <label className='display-label-text'>Horizontal Distance (in px)</label>
          <input type='number' className='display-tab-input' />
          <p className='tab-description'>Lorem ipsuim dolor sit Lorem ipsuim dolor sit</p>
        </div>
      </div>
      <div className='bot-icon-section'>
        <img src={roundIcon} alt='round-icon' />
        {renderUploadField()}
      </div>
    </div>
  )

  const renderTabView = () => {
    switch (tabId) {
      case 'GENERAL':
        return renderGeneralTabView()
      case 'DISPLAY':
        return renderDisplayTabView()
      default:
        return null
    }
  }

  const onClickGeneral = () => (
    setTabId('GENERAL')
  )
  const onClickDisplay = () => (
    setTabId('DISPLAY')
  )
  const activeGeneral = tabId === 'GENERAL' ? 'active-button' : ''
  const activeDisplay = tabId === 'DISPLAY' ? 'active-button' : ''
  return (
    <div className='widget-configuration-container'>
        <Sidebar />
        <div className='configuration-content-container'>
            <TopBar />
            <div className='configuration-content'>
                <h1 className='configuration-heading'>Configuration</h1>
                <div className='configuration-tab-container'>
                    <ul className='tabs-list'>
                      <li className='button-item'>
                        <button type='button' onClick={onClickGeneral} className={`tab-button ${activeGeneral}`}>General</button>
                      </li>
                      <li className='button-item'>
                        <button type='button' onClick={onClickDisplay} className={`tab-button ${activeDisplay}`}>Display</button>
                      </li>
                      <li className='button-item'>
                        <button type='button' className='tab-button'>Advanced</button>
                      </li>
                      <hr className='horizontal-line' />
                    </ul>
                    {renderTabView()}
                </div>
            </div>
        </div>
    </div>
  );
}

export default WidgetConfiguration;
