import  { memo } from 'react'
import sync from '../../../assets/sync.svg'
import { useThemeStore } from '../../../Store/useTheme'
function DomainDetailsSyncing({domain}: {domain:string}) {
		const theme = useThemeStore((state) => state.theme)

  return (
    <div className={`pt-20 p-8 mt-32 ml-36 min-h-[400px] min-w-[500px] max-w-[calc(80vw-300px)] rounded-3xl  ${
				theme == "dark"
					? "bg-[#1a2222] text-white"
					: "bg-[#BCCCDC] text-slate-700"
			}`}>
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
