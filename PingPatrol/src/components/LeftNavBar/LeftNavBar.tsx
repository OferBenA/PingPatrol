import  { memo } from 'react'
import { PageViewingType } from '../../types/MainTypes'

function LeftNavBar({setPageViewing}: {setPageViewing: (arg0: PageViewingType) => void}) {
  return (
    <div className='ml-2 w-2/12 h-screen fixed left-0 top-0 -z-10 flex flex-col justify-center  gap-2'
    >
        <div onClick={() => setPageViewing('dashboard')} className='leftNavBarBtn'>dashboard</div>
        <div onClick={() => setPageViewing('addItem')} className='leftNavBarBtn'>add item</div>
        <div className='leftNavBarBtn'>3</div>
    </div>
  )
}

export default memo(LeftNavBar)
