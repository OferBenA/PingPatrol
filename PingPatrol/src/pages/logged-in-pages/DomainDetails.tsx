import  { memo, useCallback, useEffect, useState } from 'react'
import { axiosClient } from '../../axiosClient';

function DomainDetails() {
	const [domainData , setDomainData ] = useState()

	const pathParts = window.location.pathname.split('/');
	const relevantDomainUrl = pathParts[pathParts.length-1];

	const fetchDomainData = useCallback(async () => {
		try {
			const data = await axiosClient.get(`/api/domains/domainDetails/${relevantDomainUrl}`);
			if (data) {
				console.log(data.data)
				setDomainData(data.data);
			}

		} catch (error) {
			console.error(error)

		}
	}, []);

	useEffect(() =>{
		fetchDomainData()

	},[])
	if(!domainData){
		return (
			<div className="mt-32 ml-36 w-10/12 h-[calc(100vh-140px)]">
			<h1 className="text-6xl mb-5">{relevantDomainUrl}</h1>
			<div className="flex justify-center flex-wrap gap-4 align-top">
			<h1 className='text-4xl'>404 Domain not found!</h1>

			</div>
		</div>
		)
	}
	return (
		<div className="mt-32 ml-36 w-10/12 h-[calc(100vh-140px)]">
			<h1 className="text-4xl mb-5">{relevantDomainUrl}</h1>
			<div className="flex justify-center flex-wrap gap-4 align-top">


			</div>
		</div>
	)
}

export default memo(DomainDetails)
