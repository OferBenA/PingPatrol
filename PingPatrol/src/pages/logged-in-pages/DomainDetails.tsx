import { memo, useCallback, useEffect, useState } from "react";
import { axiosClient } from "../../axiosClient";
import DomainDetailsSkeletons from "./components/Skeletons/domainDetailsSkeletons/domainDetailsSkeletons";
import arrowUp from "../../assets/arrow_up.svg";
import arrowDown from "../../assets/arrow_down.svg";
import { ReceivedDomainDataType } from "../../types/MainTypes";
import DomainDetailsSyncing from "./components/DomainDetailsSyncing";
function DomainDetails() {
	const [domainData, setDomainData] = useState<ReceivedDomainDataType>();

	const pathParts = window.location.pathname.split("/");
	const relevantDomainUrl = pathParts[pathParts.length - 1];

	const fetchDomainData = useCallback(async () => {
		try {
			const data = await axiosClient.get(
				`/api/domains/domainDetails/${relevantDomainUrl}`
			);
			if (data) {
				console.log(data.data);
				setDomainData(data.data);
			}
		} catch (error) {
			console.error(error);
		}
	}, []);

	useEffect(() => {
		fetchDomainData();
	}, []);
	if (!domainData) {
		return <DomainDetailsSkeletons />;
	}
	if (!domainData.lastUpdate) {
		return <DomainDetailsSyncing domain={domainData.ipAddr}/>;
	}
	return (
		<div className=" pt-20 p-8 mt-32 ml-36 min-h-[600px] min-w-[500px] max-w-[calc(80vw-300px)] rounded-3xl bg-[#2d3535] shadow-[10px_10px_20px_20px_rgba(0,0,0,0.5)]">
			<h1 className="text-5xl mb-5">{domainData.ipAddr}</h1>
			<div className="w-full flex justify-center align-middle pb-5">
				{domainData.lastUpdate.alive && (
					<img className="w-20" src={arrowUp} alt="arrowUp" />
				)}
				{domainData.lastUpdate.alive == false && (
					<img className="w-20" src={arrowDown} alt="arrowDown" />
				)}
			</div>

			<div className="flex justify-center flex-wrap gap-4 align-top">123</div>
		</div>
	);
}

export default memo(DomainDetails);
