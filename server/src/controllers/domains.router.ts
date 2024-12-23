import express from "express";
import { v4 as uuidv4 } from "uuid";
import { DomainModel } from "../models/domain.model";
import { UserModel } from "../models/users.model";

const domainsRouter = express.Router();

//here we want to get the body, check if the domain is already in the domain model,
//if is on domain model: add is to the domains in UserModel
//if not in domain model: create new DomainModel and add is to the domains in UserModel
domainsRouter.put("/create", async (req, res) => {
	const { ipOrDns, name, isFavorite, isIpOrDns, userId } = req.body;

	const domainId = uuidv4();

	try {
		const user = await UserModel.findOne({ userId: userId });
		if (user) {
			const domainAlreadyExist = await DomainModel.findOne({ domain: ipOrDns });

			if(domainAlreadyExist){
				const domainAlreadyInUserModel = user.domains.some((str) =>str.includes(ipOrDns));
				if (!domainAlreadyInUserModel) {
					user.domains.push(ipOrDns);
					await user.save();
					res.status(201).json({ message: 'domain added to user successfully', domainId });
					return;
				}
			}else{
				await DomainModel.create({
					id: domainId,
					createdDate: new Date(),
					name,
					isFavorite,
					isIpOrDns: isIpOrDns == 'ip' ? 'ip' : 'dns',
					domain: ipOrDns,
				});
				user.domains.push(ipOrDns);
				await user.save();
				res.status(201).json({ message: 'domain created successfully and added to the user!', domainId });
			}
			return;
		}
		res.status(403).send("not able to add domain is forbidden!");
	} catch (error) {
		console.error("Error creating a domain in the db: ", error);
		res.status(500).send("Error uploading new domain.");
	}
});

export default domainsRouter;
