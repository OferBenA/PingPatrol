![Alt text](./PingPatrol/src/assets/PingPatrolLightIcon.png)
# PingPatrol

PingPatrol is a Monitoring app that can track IP addresses and gives you insight on them.

## Installation
In .env file change the `MONGO_URI` <br>
create an access and refresh tokens by using this command:
`require('crypto').randomBytes(48).toString('hex')`,<br>
And insert those tokens in the .env file to `ACCESS_TOKEN_SECRET` and `REFRESH_TOKEN_SECRET`<br>
### BackEnd
```bash
cd server
npm i
npm run dev
```
### FrontEnd
```bash
cd PingPatrol
npm i
npm run dev
```
