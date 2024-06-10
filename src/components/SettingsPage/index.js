import { useLocation, Link } from 'react-router-dom';

import colorHome from '../../assets/colorHome.png'
import arrowDown from '../../assets/arrowDown.png'
import flagSymbol from '../../assets/flagSymbol.png'
import notifications from '../../assets/notifications.png'
import profileImage from '../../assets/profileImage.png'


import Sidebar from '../Sidebar'

import './index.css'
const SettingsPage = () => {
    const location = useLocation()
  const path = location.pathname
  return (
    <div className='settings-page-container'>
        <Sidebar />
        <div className='settings-content-container'>
            <div className='upload-flow-header'>
                <div className='path-container'>
                    <Link to={'/'} className='link'>
                    <img src={colorHome} alt='home-icon' className='path-home-icon' />
                    </Link> 
                    <p className='project-path'>/ {path.split('/')[2]?.replaceAll('-',' ')}</p> 
                </div>
                <div className='options-container'>
                    <div className='region-section'>
                    <img src={arrowDown} alt='arrow' className='arrow-icon' />
                    <p className='language-text'>EN</p>
                    <img src={flagSymbol} alt='flag' className='country-icon' />
                    </div>
                    <img src={notifications} alt='notification' className='top-bar-notification-icon' />
                </div>
            </div>
            <div className='settings-content'>
                <h1 className='settings-heading'>Account Settings</h1>
                <div className='profile-details-section'>
                    <img src={profileImage} alt='profile' className='profile-img' />
                    <div className='inputs'>
                        <label className='label-text-input'>User Name</label>
                        <input placeholder='alphauser' type='text' className='profile-input' />
                    </div>
                    <div className='inputs'>
                        <label className='label-text-input'>Email</label>
                        <input placeholder='alphauser@gmail.com' type='email' className='profile-input' />
                    </div>
                </div>
                <h1 className='settings-heading'>Subscriptions</h1>
                <div className='subscription-banner'>
                    <p className='banner-text'>You are currently on the <span className='span-banner-text'>Ques AI Basic Plan!</span></p>
                    <button className='upgrade-button' type='button'>Upgrade</button>
                </div>
                <p className='cancel-subscription-text'>Cancel Subscription</p>
            </div>
        </div>
    </div>
  )
}

export default SettingsPage