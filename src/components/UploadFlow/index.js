import { useLocation } from 'react-router-dom';
import {useState} from 'react'
import Sidebar from '../Sidebar'
import UploadItem from '../UploadItem'
import TopBar from '../TopBar'

import youtubeIcon from '../../assets/youtubeIcon.png'
import spotifyIcon from '../../assets/spotifyIcon.png'
import rssFeed from '../../assets/rssFeed.png'
import cloudIcon from '../../assets/cloudIcon.png'
import pencilIcon from '../../assets/pencilIcon.png'
import searchIcon from '../../assets/searchIcon.png'

import './index.css'

const uploadItemsList = [
  {
    id: 1,
    icon: youtubeIcon,
    name: 'Upload Youtube Video'
  },
  {
    id: 2,
    icon: spotifyIcon,
    name: 'Upload Spotify Podcast'
  },
  {
    id: 3,
    icon: rssFeed,
    name: 'Upload from RSS Feed'
  },
  
]


const UploadFlow = () => {

  const projectDataTemp = JSON.parse(localStorage.getItem('data'))

  const [projectData,setProjectData] = useState(projectDataTemp)
  const [fileName, setFileName] = useState('')
  const [fileDescription, setFileDescription] = useState('')
  const [isEditButtonClicked, setisEditButtonClicked] = useState(false)
  const [editMode, setEditMode] = useState(false)

  const location = useLocation()
  const path = location.pathname
  const projectName = path.split('/')[1].replaceAll('%20',' ')
 
  
  const getProjectUploadsLength = () => {
    return projectData?.projectList?.filter((eachItem) => (eachItem.projectName === projectName))[0]?.uploads?.length
  }

  const isClickedEdit = () => {
    setisEditButtonClicked(true)
  }

  const onEditMode = () => {
      setEditMode(true)
  }

  const onCloseEdit = () => {
    setEditMode(false)
  }

  const onFileSave1 = () =>{
     const updatedData = projectData?.projectList?.map((eachItem) => {
        if (eachItem.projectName === projectName) {
          eachItem.uploads.push({
            'Name': fileName,
            'Description': fileDescription,
            'Upload Data & Time': '12 Jun 24 | 15:67',
            'Status': 'Done',
          })
        }
        return eachItem
     })
     setProjectData({"projectList":updatedData})
     setFileName('')
     setFileDescription('')
     localStorage.setItem("data",JSON.stringify({"projectList":updatedData}))

  }

  const renderUploadFileContainer = () => (
      <>
        <p className='or-text'>or</p>
          <div className='upload-file-container'>
                <img src={cloudIcon} alt='icon' className='cloud-icon' />
                <p className='upload-file-description'>Select a file or drag and drop here (Podcast Media or Transcription Text)</p>
                <p className='format-text'>MP4, MOV, MP3, WAV, PDF, DOCX or TXT file </p>
                <button className='select-file-button'>Select File</button>
          </div>
      </>
  )

  const renderFilesListingView = () => {
    const uploadFilesData = projectData?.projectList?.filter((eachItem) => (eachItem.projectName === projectName))[0]?.uploads 
    return (
        <>
          <div className='files-banner'>
            <p className='files-banner-text'>All files are processed! Your widget is ready to go!</p>
            <button className='try-button' type='button'>Try it out!</button>
          </div>
          <ul className='table-container'>
              <li className='row-container'>
                <p className='first-row first-col col-text'>Name</p>
                <p className='first-row col-text'>Upload Date & Time</p>
                <p className='first-row col-text'>Status</p>
                <p className='first-row last-col col-text'>Actions</p>
              </li>
              {uploadFilesData.map((eachItem) => (
                  <li className='row-container'>
                  <p className='first-row first-col row row-text'>{eachItem.Name}</p>
                  <p className='first-row row row-text'>12 Jun 24 | 15:67</p>
                  <p className='first-row row row-text'>Done</p>
                  <div className='table-button-container first-row row'>
                    <button type='button' className='edit-button' onClick={isClickedEdit}>Edit</button>
                    <button type='button' className='delete-button'>Delete</button>
                  </div>
                </li>
              ))}
          </ul>
        </>
    )
  }

  const renderUploadFlowContent = () => {
    return (
        <div className='upload-flow-content-container'>
          <TopBar />
          <div className='upload-flow-content'>
            <h1 className='upload-flow-heading'>Upload</h1>
            <ul className='upload-items-list'>
                {uploadItemsList.map((eachItem) => <UploadItem key={eachItem.id} itemDetails={eachItem} fileName={fileName} setFileName={setFileName} fileDescription={fileDescription} setFileDescription={setFileDescription} onFileSaved={onFileSave1}/>)}
            </ul>
            {getProjectUploadsLength() > 0 ? renderFilesListingView() : renderUploadFileContainer()}
          </div>
        </div>
      )
  }

  const renderButtonsContainer = () => (
    <div className='transcript-flow-buttons-container'>
      <button type='button' className='discard-button' onClick={onCloseEdit}>Discard</button>
      <button type='button' className='transcript-save-button' onClick={onCloseEdit}>Save & exit</button>
  </div>
  )

  const renderTranscriptFlow = () => {
      return(
        <div className='transcript-flow-container'>
          <TopBar />
          <div className='transcript-flow-content'>
              <div className='transcript-flow-header'>
                  <h1 className='transcript-heading'>Edit Transcript</h1>
                  {editMode ? renderButtonsContainer() : null}
              </div>
              <div className='text-area-container'>
                <div className='text-area-header'>
                    <button type='button' className='edit-mode-button' onClick={onEditMode}>
                      <img src={pencilIcon} alt='pencil icon' className='pencil-icon' />
                      <p className='edit-mode-text'>Edit Mode</p>
                    </button>
                    <img src={searchIcon} alt='search icon' className='search-icon' />
                </div>
                <label htmlFor='speaker' className='text-area-label'>Speaker</label>
                <textarea id='speaker' disabled={!editMode} rows="15" cols="50" className='text-area-input'></textarea>
              </div>
          </div>
        </div>
      )
  }

  return (
    <div className='ulpoad-flow-container'>
        <Sidebar />
        {isEditButtonClicked ? renderTranscriptFlow() : renderUploadFlowContent()}
    </div>
  )
}

export default UploadFlow 