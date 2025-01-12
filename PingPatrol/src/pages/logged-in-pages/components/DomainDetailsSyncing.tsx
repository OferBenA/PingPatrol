import  { memo } from 'react'
import sync from '../../../assets/sync.svg'
function DomainDetailsSyncing({domain}: {domain:string}) {
  return (
    <div className=" pt-20 p-8 mt-32 ml-36 min-h-[400px] min-w-[500px] max-w-[calc(80vw-300px)] rounded-3xl bg-[#2d3535] shadow-[10px_10px_20px_20px_rgba(0,0,0,0.5)]">
				<h1 className="text-5xl mb-5">{domain}</h1>
				<div className="w-full flex justify-center align-middle pb-5">
					<img className="w-20" src={sync} alt="sync" />
				</div>
				<div className="flex justify-center flex-wrap gap-4 align-top">
					<h1 className='text-3xl'>Domain still syncing, please wait...</h1>

				</div>
			</div>
  )
}

export default memo(DomainDetailsSyncing)
