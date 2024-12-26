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

			//the domain is already created in the domainModel, just need to update
			if(domainAlreadyExist){
				console.log(domainAlreadyExist)
				const domainAlreadyInUserModel = user.domains.some((domain) =>domain.ipOrDns?.includes(ipOrDns));
				if (!domainAlreadyInUserModel) {
					user.domains.push({
						ipOrDns,
						isFavorite,
						name,
						domainId: domainAlreadyExist.id ?? '',
					});
					await user.save();
					res.status(201).json({ message: 'domain added to user successfully', domainId });
					return;
				}
			}
			//if there is no domainModel already created, create new domain, and update the user model with the new domain.
			else{
				await DomainModel.create({
					id: domainId,
					createdDate: new Date(),
					isIpOrDns: isIpOrDns == 'ip' ? 'ip' : 'dns',
					domain: ipOrDns,
				});
				user.domains.push({
					ipOrDns,
					isFavorite,
					name,
					domainId: domainId,
				});
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

domainsRouter.get('/:userId' ,async (req,res) =>{
	const {userId} = req.params;
	try {
		const userData =await UserModel.findOne({userId: userId})
		if(!userData){
			res.status(400).send('Error finding the user in the DataBase');
			return
		}
		res.status(200).json(userData);
	} catch (error) {
		console.error("Error finding user in the db: ", error);
		res.status(500).send("Error finding user in DB.");

	}


});

export default domainsRouter;
