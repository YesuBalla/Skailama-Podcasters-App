import {Link} from 'react-router-dom'
import './index.css' 

const ProjectItem = (props) =>  {
    const {projectDetails} = props 
    const {projectName} = projectDetails
    const letters = projectName[0] + 'P'
    return (
        <Link to={`/${projectName}/upload`} className='nav-link'>
            <li className='project-item-container'>
                <div className='profile-image'>
                    <p className='first-letter'>{letters}</p>
                </div>
                <div className='item-details-container'>
                    <h3 className='item-heading'>{projectName}</h3>
                    <p className='item-episodes'>4 Episodes</p>
                    <p className='item-time'>Last edited a week ago</p>
                </div>
            </li>
        </Link>
    )
}

export default ProjectItem