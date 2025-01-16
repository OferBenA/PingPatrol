import { DomainModel } from "../models/domain.model";
import ping from "ping";
import dotenv from "dotenv";
import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

dotenv.config();
const updateDomainHistoryRate =
	Number(process.env.UPDATE_DOMAIN_HISTORY_RATE) || 60000;
//update domain.history every UPDATE_DOMAIN_HISTORY_RATE seconds
export const domainHistoryLogger = () => {
	setInterval(updateHistory, updateDomainHistoryRate);
};

const updateHistory = async () => {
	try {
		const allDomains = await DomainModel.find();
		if (allDomains) {
			await Promise.all(
				allDomains.map(async (domain) => {
					const lastUpdate = domain.history[domain.history.length - 1];
					if (!domain) {
						return;
					}
					let res: any = await ping.promise.probe(domain?.ipAddr as string);
					if (!res) {
						return;
					}
					if (domain.history && domain.history.length > 0 && lastUpdate) {
						if (lastUpdate.alive == res.alive) {
							lastUpdate.endCurrentStatus = Date.now();
						}
						//status change, creating a new object and pushing on the the history
						else {
							console.log(`${domain?.ipAddr} is now ${res.alive ? 'up' : 'down'}, pushing new change to history array`)
							domain.history.push({
								alive: res.alive,
								startCurrentStatus: Date.now(),
								endCurrentStatus: Date.now(),
							});
						}
					} else {
						console.log(`Starting new log object, for: ${res.host}`);
						domain.history.push({
							alive: res.alive,
							startCurrentStatus: Date.now(),
							endCurrentStatus: Date.now(),
						});
					}
					domain.save();
				})
			);
		}
	} catch (error) {
		console.error(error);
	}
};

export const clearDomainHistory = async () => {
	try {
		const rl = readline.createInterface({ input, output });
		const answer = await rl.question(
			"Are you sure you want to delete the Entire domain history? [Y][N]\n"
		);
		if (answer.toLowerCase() == "y") {
			const allDomains = await DomainModel.updateMany(
				{},
				{ $pull: { history: {} } }
			);
			console.log(`DomainModel history deleted`);
		} else {
			console.log(`nothing was deleted`);
		}
		rl.close();
	} catch (error) {
		console.error(error);
	}
};
