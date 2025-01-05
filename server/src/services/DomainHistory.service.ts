import { DomainModel } from "../models/domain.model";
import ping from "ping";
import dotenv from "dotenv";
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

dotenv.config();
const updateDomainHistoryRate = Number(process.env.UPDATE_DOMAIN_HISTORY_RATE) || 60000;
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
		const rl = readline.createInterface({input,output});
		const answer = await rl.question('Are you sure you want to delete the Entire domain history? [Y][N]\n');
		if(answer.toLowerCase() == 'y'){
			const allDomains = await DomainModel.updateMany(
				{},
				{ $pull: { history: {} } }
			);
			console.log(`DomainModel history deleted`)
		}
		else{
			console.log(`nothing was deleted`)
		}
		rl.close();

	} catch (error) {
		console.error(error);
	}
};
