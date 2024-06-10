import { useLocation, Link } from 'react-router-dom';

import colorHome from '../../assets/colorHome.png'
import arrowDown from '../../assets/arrowDown.png'
import flagSymbol from '../../assets/flagSymbol.png'
import notifications from '../../assets/notifications.png'

import './index.css' 
const TopBar = () => {
  const location = useLocation()
  const path = location.pathname
  return (
    <div className='upload-flow-header'>
        <div className='path-container'>
            <Link to={'/'} className='link'>
              <img src={colorHome} alt='home-icon' className='path-home-icon' />
            </Link> 
            <p className='project-path'>/ {path.split('/')[1]?.replaceAll('%20',' ')} /</p> 
            <p className='section-path'>{path.split('/')[2]?.replaceAll('%20',' ').includes('upload')?"Upload":"Widget Configuration" }</p>
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
  )
}

export default TopBar