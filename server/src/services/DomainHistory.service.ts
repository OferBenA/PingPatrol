import { DomainModel } from "../models/domain.model";
import ping from "ping";
import dotenv from "dotenv";
dotenv.config();
const updateDomainHistoryRate = Number(process.env.UPDATE_DOMAIN_HISTORY_RATE) || 30000;
//update domain.history every UPDATE_DOMAIN_HISTORY_RATE seconds
export const domainHistoryLogger = () => {
	setInterval(updateHistory, updateDomainHistoryRate)
};

const updateHistory = async () =>{
	try {
		const allDomains = await DomainModel.find();
		if (allDomains) {
			await Promise.all(allDomains.map(async (domain) => {
					if (domain) {
						// console.log(domain.domain)
						let res: any = await ping.promise.probe(domain?.domain as string);
						domain.history.push({ date: Date.now(), alive: res.alive });
						domain.save();
					}
				})
			);
		}
	} catch (error) {
		console.error(error);
	}

}

export const clearDomainHistory = async () => {
	try {
		const allDomains = await DomainModel.updateMany(
			{},
			{ $pull: { history: {} } }
		);
	} catch (error) {
		console.error(error);
	}
};
