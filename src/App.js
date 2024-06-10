import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './components/Home'
import UploadFlow from './components/UploadFlow'
import WidgetConfiguration from './components/WidgetConfiguration'
import SettingsPage from './components/SettingsPage'


import './index.css'

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route exact path='/' element={<Home />} />
      <Route path='/:projectname/upload' element={<UploadFlow />} />
      <Route path='/:projectname/widget-configuration' element={<WidgetConfiguration />} />
      <Route path='/:projectname/account-settings' element={<SettingsPage />} />
    </Routes>
  </BrowserRouter>
)

export default App