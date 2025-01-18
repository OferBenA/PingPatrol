import { memo, useCallback, useEffect, useState } from "react";
import { axiosClient } from "../../../axiosClient";
import { domainDataType } from "../../../types/MainTypes";
import DomainListSkeletons from "./Skeletons/DomainListSkeletons/DomainListSkeletons";
import { FRONT_REFRESH_RATE_SLOW } from "../../../services/consts.service";
import Domain from "./Domain";
function Domains() {
	const [domainData, setDomainData] = useState<domainDataType[] | null>();
	const [timeFetched, setTimeFetched] = useState<number>()

	const fetchData = useCallback(async () => {
		try {
			setTimeFetched(Date.now())
			const data = await axiosClient.get(`/api/domains/allPerUser`);
			if (data) {
				console.log(`fetched new data at: ${new Date()}`);
				setDomainData(data.data);
			}
		} catch (error) {
			console.error(error);
		}
	}, [domainData]);

	useEffect(() => {
		let intervalKey: number;
		try {
			fetchData();
			intervalKey = setInterval(fetchData, FRONT_REFRESH_RATE_SLOW);
		} catch (error) {
			console.error(`error getting user data: ${error}`);
		} finally {
			return () => {
				clearInterval(intervalKey);
			};
		}
	}, []);

	if (!domainData) {
		return <DomainListSkeletons />;
	}
	return (
		<>
		<div className={`w-full flex justify-around  mb-1`}>
			<h1 >last Update: {String(new Date(timeFetched ?? 0).toLocaleTimeString("en-GB")) }</h1>
		</div>
			<div className="flex justify-center flex-wrap gap-4 align-top">
				{domainData?.map((domain: domainDataType, index: number) => (
					<Domain key={index} domain= {domain}  setDomainData={setDomainData} fetchData={fetchData}/>
				))}
			</div>
		</>
	);
}

export default memo(Domains);
