
const jwt = require('jsonwebtoken');
require('dotenv').config();

//...........................authantication .............................................../

exports.auth = async (req, res, next) => {
	try {
		// destructured token from req.cookie

		const token = req.headers['x-access-token']
				console.log(token,"tokennnnnnnnnnnnnnnnnnn")

		//validation

		if (!token) {
			return res.json({
				success: false,
				message: 'Please login, missing token',
			});
		}

		try {
			const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY);

			console.log("Decode" ,decode , "]]]]]]]]]]]]]]]]]]]]]]]]]]]]")

			req.user = decode;

			next();

		} catch (error) {
			console.log(error);
			res.json({
				message: 'Found some error while decode token',
			});
		}

	} catch (error) {
		console.log(error);
		res.json({
			success: false,
			message: 'Found some error while  validating token',
		});
	}
};



//..........................is user ............................/

exports.isUser = async(req,res,next)=>{
    try {
        if(req.user.role == !0 ){

			console.log(req.user.role , "/////////////////////////////////////////////")

            //response
            return res.json({
                message:"You can not access this resource"
            })

         }
         next()
} catch (error) {
        console.log(error)
        
    }
}

//...................................... is admin ..................................../

exports.isAdmin = async (req, res, next) => {
	try {
		if (req.user.role !== 1) {
			console.log(req.user ,";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;	")

			console.log(req.user.role , "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<")

			return res.json({
				success: false,
				message: 'You can not access this resource',
			});
		}
		next();
	} catch (error) {
		console.log(error);
		res.json({
			success: false,
			message: 'Found some error while  check role of admin',
		});
	}
};