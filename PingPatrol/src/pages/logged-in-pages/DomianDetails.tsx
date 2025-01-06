import React, { memo } from 'react'

function DomianDetails() {
	const pathParts = window.location.pathname.split('/');
	const relaventDomain = pathParts[pathParts.length-1]
	console.log(relaventDomain)
	if(!relaventDomain){
		return (
			<h1 className='text-4xl'>404 Domain not found!</h1>
		)
	}
	return (
		<div className="mt-32 ml-36 w-10/12 h-[calc(100vh-140px)]">
			<h1 className="text-4xl mb-5">{relaventDomain}</h1>
			<div className="flex justify-center flex-wrap gap-4 align-top">

			</div>
		</div>
	)
}

export default memo(DomianDetails)
