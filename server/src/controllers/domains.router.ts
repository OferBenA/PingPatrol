import express from "express";
import { v4 as uuidv4 } from "uuid";
import { DomainModel } from "../models/domain.model";
import { UserModel } from "../models/users.model";

const domainsRouter = express.Router();

//here we want to get the body, check if the domain is already in the domain model,
//if is on domain model: add is to the domains in UserModel
//if not in domain model: create new DomainModel and add is to the domains in UserModel
domainsRouter.put("/create", async (req, res) => {
	const { ipAddr, name, isFavorite, userId } = req.body;
	const domainId = uuidv4();

	try {
		const user = await UserModel.findOne({ userId: userId });
		if (user) {
			const domainAlreadyExist = await DomainModel.findOne({ domain: ipAddr });

			//the domain is already created in the domainModel, just need to update
			if (domainAlreadyExist) {
				const domainAlreadyInUserModel = user.domains.some((domain) =>
					domain.ipAddr?.includes(ipAddr)
				);
				if (!domainAlreadyInUserModel) {
					user.domains.push({
						ipAddr,
						isFavorite,
						name,
						domainId: domainAlreadyExist.id ?? "",
					});
					await user.save();
					res
						.status(201)
						.json({ message: "domain added to user successfully", domainId });
					return;
				}
			}
			//if there is no domainModel already created, create new domain, and update the user model with the new domain.
			else {
				console.log(`${ipAddr} domain not exist, creating a new domain `)
				await DomainModel.create({
					id: domainId,
					createdDate: new Date(),
					ipAddr: ipAddr,
				});
				user.domains.push({
					ipAddr,
					isFavorite,
					name,
					domainId: domainId,
				});
				await user.save();
				res.status(201).json({
					message: "domain created successfully and added to the user!",
					domainId,
				});
			}
			return;
		}
		res.status(403).send("not able to add domain is forbidden!");
	} catch (error) {
		console.error("Error creating a domain in the db: ", error);
		res.status(500).send("Error creating new domain.");
	}
});

domainsRouter.get("/domainDetails/:ipAddr", async (req, res) => {
	const { ipAddr } = req.params;

	try {
		const domainToRes = await DomainModel.findOne({ ipAddr: ipAddr });

		if (!domainToRes) {
			res.status(404).json({ message: "domain not found" });
			return;
		}

		res.json({
			history: domainToRes.history,
			lastUpdate: domainToRes.history[domainToRes.history.length - 1],
			createdDate: domainToRes.createdDate,
			ipAddr: domainToRes.ipAddr,
		});
		return;
	} catch (error) {
		console.error("Error finding domain in the db: ", error);
		res.status(500).send("Error finding domain in DB.");
	}
});
domainsRouter.get("/allPerUser", async (req, res) => {
	const { userId } = (req as any).userData;
	try {
		const userData = await UserModel.findOne({ userId: userId });
		if (!userData) {
			res.status(400).send("Error finding the user in the DataBase");
			return;
		}
		//get all the domain hes registered to
		const domainIdArray = userData.domains.map((domain) => domain.domainId);
		//query the DomainModel for each of the user domain
		const domainSpecificData = await DomainModel.find({
			id: { $in: domainIdArray },
		});
		//match the domain from DomainModel to UserModel and add 'lastUpdate' field to send to the front
		//TODO - Make this more efficient, not O(n*m)
		userData.domains.forEach((domain) => {
			const findDomain = domainSpecificData.find(
				(domainData) => domainData.id == domain.domainId
			);
			if (findDomain) {
				const lastUpdate = findDomain.history[findDomain.history.length - 1];
				if (lastUpdate) {
					domain.lastUpdate = lastUpdate;
				}
			}
		});
		res.status(200).json(userData.domains);
	} catch (error) {
		console.error("Error finding user in the db: ", error);
		res.status(500).send("Error finding user in DB.");
	}
});

domainsRouter.post("/updateDomainPerUser", async (req, res) => {
	const { userId } = (req as any).userData;
	const domainToUpdate = req.body;
	if (!domainToUpdate) {
		res.status(400).send("error changing domain details");
		return;
	}
	try {
		const user = await UserModel.findOne({ userId: userId });
		if (!user) {
			res.status(400).send("error finding user");
			return;
		}
		//i want to find the currect domain from UserModel.domains,
		// remove the old one, and replace it with the new one
		const indexToDelete = user?.domains.findIndex(
			(domain) => domainToUpdate.domainId == domain.domainId
		);
		if (!indexToDelete && indexToDelete != 0) {
			res.status(400).send("error changing domain details");
			return;
		}
		user?.domains.splice(indexToDelete, 1, domainToUpdate);
		await user?.save();
		res.send(`user changed successfully`);
		return;
	} catch (error) {
		console.error(`error accrued while trying to change a user ${error}`);
	}
});
domainsRouter.delete("/deleteDomainPerUser/:domainId", async (req, res) => {
	const { userId } = (req as any).userData;
	const { domainId } = req.params;
	if (!domainId) {
		res.status(400).send("error changing domain details");
		return;
	}
	// console.log(domainId)
	try {
		const user = await UserModel.findOne({ userId: userId });
		if (!user) {
			res.status(400).send("error finding user");
			return;
		}
		const indexToDelete = user?.domains.findIndex(
			(domain) => domainId == domain.domainId
		);
		if (!indexToDelete && indexToDelete != 0) {
			res.status(400).send(`error deleting domain ${domainId}`);
			return;
		}
		user?.domains.splice(indexToDelete, 1);

		await user?.save();
		res.send(`domain in user deleted successfully`);
		return;
	} catch (error) {
		console.error(`error accrued while trying to change a user ${error}`);
	}
});

export default domainsRouter;
