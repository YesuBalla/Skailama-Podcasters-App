import {useState} from 'react'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'

import Header from '../Header'
import ProjectItem from '../ProjectItem'

import cuate from '../../assets/cuate.png'
import homeIcon from '../../assets/homeIcon.png'
import Vector from '../../assets/Vector.png'

import './index.css'

const Home = () => {
    const initialData = localStorage.getItem('data')
    const [data, setData] = useState(initialData === null ? {projectList: []} : JSON.parse(initialData))
    
    const [errorMsg, setErrorMsg] = useState(false)
    const [userProjectName, setUserProjectName] = useState("")
    const onEnterProjectName = (event) => {
        setUserProjectName(event.target.value)
    }

    const onProjectCreate = () => {
        const updatedData = data
        if (userProjectName?.length === 0) {
            setErrorMsg(true)
        } else {
            setErrorMsg(false)
        }

        updatedData['projectList'].push(
            {
                "id":updatedData['projectList']?.length + 1,
                "projectName":userProjectName,
                "uploads":[],
                "episodes": []
              }
        )
        setData(updatedData)
        localStorage.setItem('data', JSON.stringify(updatedData))
        setUserProjectName("")
        

    }
    
    const renderCreateProjectView = () => {
        const onCreate = (close) =>{
            if (userProjectName.length > 0) {
                onProjectCreate()
                close()
            } else {
                setErrorMsg(true)
            }
        }
        return (
            <div className='create-project-container'>
                <h1 className='create-project-heading'>Create a New Project</h1>
                <img src={cuate} alt='create-project' className='create-project-image' />
                <p className='create-project-description'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                    Duis aute irure dolor in reprehenderit in
                </p>
                <div className="popup-container">
                    <Popup
                        modal
                        trigger={
                            <button type="button" className="create-project-button">
                                <span className='span-vector-icon'>
                                    <img src={Vector} alt='vector icon' className='vector-icon' />
                                </span>
                                <span className='span-new-project-text'>Create New Project</span>
                            </button>
                            }
                            >
                            {close => (
                                    <div className='popup-content-container'>
                                        <h2 className='content-create-project-heading'>Create Project</h2>
                                        <div className='input-container'>
                                            <label className='label-text' htmlFor='name'>Enter project Name:</label>
                                            <input id='name' type='text' value={userProjectName} placeholder='Type here' onChange={onEnterProjectName} className='input-bar' />
                                            {errorMsg === true ? <p className='error-msg'>*Project Name Can't be empty</p>: ''}
                                        </div>
                            <div className='popup-buttons-container'>
                                <button
                                type="button"
                                className="cancel-button"
                                onClick={() => close()}
                                >
                                Cancel
                                </button>
                                <button
                                type="button"
                                className="create-button"
                                onClick={() => onCreate(close)}
                                >
                                Create
                                </button>
                            </div>
                        </div>
                        )}
                    </Popup>
                </div>
            </div>
        )
    }

    const renderProjectsListingPage = () => {
        const {projectList} = data
        const onCreate = (close) =>{
            onProjectCreate()
            close()
        }
        return (
            <div className='projects-listing-page-container'>
                <div className='listing-page-header'>
                    <h1 className='listing-page-heading'>Projects</h1>
                    <div className="popup-container">
                    <Popup
                        modal
                        trigger={
                            <button type="button" className="create-project-button">
                                <span className='span-vector-icon'>
                                    <img src={Vector} alt='vector icon' className='vector-icon' />
                                </span>
                                <span className='span-new-project-text'>Create New Project</span>
                            </button>
                            }
                            >
                            {close => (
                                    <div className='popup-content-container'>
                                        <h2 className='content-create-project-heading'>Create Project</h2>
                                        <div className='input-container'>
                                            <label className='label-text' htmlFor='name'>Enter project Name:</label>
                                            <input id='name' type='text' value={userProjectName} placeholder='Type here' onChange={onEnterProjectName} className='input-bar' />
                                        </div>
                            <div className='popup-buttons-container'>
                                <button
                                type="button"
                                className="cancel-button"
                                onClick={() => close()}
                                >
                                Cancel
                                </button>
                                <button
                                type="button"
                                className="create-button"
                                onClick={() => onCreate(close)}
                                >
                                Create
                                </button>
                            </div>
                        </div>
                        )}
                    </Popup>
                    </div>
                </div>
                <ul className='projects-list'>
                    {projectList?.map((eachItem) => <ProjectItem key={eachItem.id} projectDetails={eachItem} />)}
                </ul>
            </div>
        )
    }

    return (
        <div className='home-container'>
                    <Header />
                    <div className='home-content-cotainer'>
                        <button type='button' className='back-to-home-button'>
                            <span className='span-button-icon'>
                                <img src={homeIcon} alt='home-icon' className='home-icon' />
                            </span>
                            <span className='span-button-text'>
                                Back to Home
                            </span>
                        </button>
                        {data?.projectList?.length > 0 ? renderProjectsListingPage() : renderCreateProjectView()}
                    </div>
                </div>
    )
}



export default Home