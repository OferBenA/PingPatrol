import { memo, useCallback, useEffect, useState } from "react";
import { axiosClient } from "../../../axiosClient";
import deleteIcon from "../../../assets/delete.svg";
import emptyStarIcon from "../../../assets/star.svg";
import fillStarIcon from "../../../assets/fillstar.svg";
import { domainDataType } from "../../../types/MainTypes";
import Skeleton from "./Skeleton/Skeleton";

function Domains() {
	// const { userData } = useUserContext();
	const [domainData, setDomainData] = useState<domainDataType[] |null>();

	const handleFavorite = useCallback(
		async (domain: domainDataType) => {
			domain.isFavorite = !domain.isFavorite;
			setDomainData(null)
			await axiosClient.post(`/api/domains/updateDomainPerUser`, domain);
			fetchData();
		},
		[domainData]
	);

	const handleDelete = useCallback(
		async (domain: domainDataType) => {
			const affirm = confirm(`are you sure you want to delete ${domain.ipOrDns} ?`)
			if(affirm){
				setDomainData(null)
				await axiosClient.delete(`/api/domains/deleteDomainPerUser/${domain.domainId}`);
				fetchData();
			}
		},
		[domainData]
	);

	const fetchData = useCallback(async () => {
		const data = await axiosClient.get(`/api/domains/allPerUser`);
		if (data) {
			setDomainData(data.data);
		}
	}, [domainData]);

	useEffect(() => {
		try {
			fetchData();
		} catch (error) {
			console.error(`error getting user data: ${error}`);
		}
	}, []);


	if(!domainData){
		return(

			<Skeleton/>
		)
	}
	return (
		<>
			<div className="flex justify-center flex-wrap gap-4 align-top">
				{domainData?.map((domain: domainDataType, index: number) => (
					<div
						key={index}
						className="hover:cursor-pointer min-w-48 w-fit bg-blue-950 py-5 px-4 rounded-lg hover:shadow-2xl"
					>
						<h1 className="text-2xl">{domain.name}</h1>
						<h1 className="text-lg">{domain.ipOrDns}</h1>
						<div className=" mt-2 flex justify-between align-middle">
							{domain.isFavorite ? (
								<img
									onClick={() => handleFavorite(domain)}
									title='Remove from favorites &#11088;'
									className="w-12  hover:animate-bounce hover:cursor-pointer p-1 drop-shadow-xl"
									src={fillStarIcon}
									alt="star"
								/>
							) : (
								<img
									onClick={() => handleFavorite(domain)}
									title={`Add to favirites ⭐`}
									className="w-12 hover:animate-bounce hover:cursor-pointer p-1 drop-shadow-xl"
									src={emptyStarIcon}
									alt="star"
								/>
							)}
							<img
								onClick={() => handleDelete(domain)}
								title={`Delete Domain 🗑`}
								className=" w-12 hover:animate-bounce hover:cursor-pointer p-1 drop-shadow-xl"
								src={deleteIcon}
								alt="delete"
							/>
						</div>
					</div>
				))}
			</div>
		</>
	);
}

export default memo(Domains);
