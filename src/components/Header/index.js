import directright from '../../assets/directright.png'
import Icon from '../../assets/Icon.png'
import notifications from '../../assets/notifications.png'

import './index.css'

const Header = () => (
    <nav className='nav-header'>
        <div className='logo-container'>
            <img src={directright} alt='logo' className='app-logo' />
            <h1 className='logo-text'>LAMA.</h1>
        </div>
        <ul className='nav-items-list'>
            <li>
                <button className='nav-item'>
                    <img src={Icon} alt='settings icon' className='nav-icons' />
                </button>
            </li>
            <li>
                <button className='nav-item'>
                    <img src={notifications} alt='notification icon'className='nav-icons' />
                </button>
            </li>
        </ul>
    </nav>
)

export default Header