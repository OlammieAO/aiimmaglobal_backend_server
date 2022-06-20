const jwt = require("jsonwebtoken");
const {StatusCodes} = require('http-status-codes');

exports.getGreetMe = async (req, res, next) => {
	//res.send("Congratulations Developer Olammie Wisdom!!! You can access the api server.");

	//const userData = dbhelper.agentLoginVW(req.body.username);

	const jwtExpirySeconds = "2h";
	
	const userData = {
        username: "Olammie",
		email: "olamijiwisdomodeyemi@gmail.com"
	}                        

             const token = jwt.sign({userData}, process.env.TOKEN_SECRET, {
                algorithm: 'HS256',
                expiresIn: jwtExpirySeconds
              });

              /* return res.status(StatusCodes.OK).send({"expires_in":jwtExpirySeconds,"access_token":token,"token_type": "bearer","userData":userData});  */

              return res.status(StatusCodes.OK).send({"expires_in":jwtExpirySeconds,"access_token":token,"token_type": "bearer","userData":userData}); 
};