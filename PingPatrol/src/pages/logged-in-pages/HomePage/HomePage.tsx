import { memo } from 'react';
import NavBar from '../../../components/NavBar/NavBar';
import './HomePage.css'
function HomePage() {
  return (
  <>
    <NavBar></NavBar>
  <div className='home-page'>home</div>
  </>
  )
}

export default memo(HomePage)
