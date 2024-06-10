import { useLocation, Link} from 'react-router-dom'; 
import {useState} from 'react'

import SidebarItem from '../SidebarItem'

import directright from '../../assets/directright.png'
import sidebarSetting from '../../assets/sidebarSetting.png'

import './index.css'

const buttonsData = [
    {
        id: 1,
        name: 'Projects',
        url: 'upload'
    },

    {
        id: 2,
        name: 'Widget Configurations',
        url: 'widget-configuration'
    },
    {
        id: 3,
        name: 'Deployment',
        url: 'deployment',
    },
    {
        id: 4,
        name: 'Pricing',
        url: 'pricing'
    },
    
]


const Sidebar = () => {
    const location = useLocation()
    const path = location.pathname
    const projectName = path.split('/')[1]?.replaceAll('%20',' ')
    console.log(projectName)
    const onActive = path?.includes("account-settings")
    const CheckActive = (eachItem) => {
        if (!eachItem || !eachItem.url) {
            return false;
        }
        let act = path?.includes(eachItem?.url)
        return act
    }
    
    const activeSetting = onActive ? 'side-bar-item1 active-tab' : 'side-bar-item1'
  return (
    <nav className='sidebar-container'>
        <div className='side-bar-logo-container'>
            <img src={directright} alt='logo' className='side-bar-app-logo' />
            <h1 className='side-bar-logo-text'>LAMA.</h1>
        </div>
        <p className='sidebar-description'>Podcast Upload Flow</p>
        <ul className='sidebar-items-list'>
        <div>
            {buttonsData.map((eachItem) => <SidebarItem key={eachItem.id} itemDetails={eachItem} activeItem={CheckActive(eachItem)} projectName={path.split('/')[1]}/>)}
        </div>
        <div className='setting-container'>
            <Link to={`/${projectName}/account-settings`} className='side-link-item'>
                <li className={activeSetting}>
                    <img src={sidebarSetting} alt='icon' className='setting-icon' />
                    <p className='tab-name'>Settings</p>
                </li>
            </Link>
        </div>
            
        </ul>
    </nav>
  )
}

export default Sidebar