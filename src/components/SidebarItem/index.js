import {Link} from 'react-router-dom'
import './index.css'

const SidebarItem = (props) => {
    const {itemDetails,activeItem, projectName} = props 
    const {id, name, url} = itemDetails
    const deploymentClassname = url === 'deployment' ? 'deployment-class': ''
    const activeTab = activeItem ? 'active-tab' : ''
    const activeId = activeItem ? 'active-id' : '' 
    const pricingClass = url === 'pricing' ? 'pricing-class' : ''
    const deploymentDisabled = url === 'deployment' ? 'disabled-link' : ''
    const pricingDisabled = url === 'pricing' ? 'disabled-link' : ''

  return (
    <Link to={`/${projectName}/${url}`} className={`nav-item ${deploymentDisabled} ${pricingDisabled}`}>
        <li className={`side-bar-item ${activeTab} ${deploymentClassname} ${pricingClass}`}>
            <p className={`id-num ${activeId}`}>{id}</p>
            <p className='tab-name'>{name}</p>
        </li>
    </Link>
  )
}

export default SidebarItem