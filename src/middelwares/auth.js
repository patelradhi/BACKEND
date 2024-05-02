
const jwt = require('jsonwebtoken');
require('dotenv').config();

//...........................authantication .............................................../

exports.auth = async (req, res, next) => {
	try {
		// destructured token from req.cookie

		const { token } = req.cookies;

		//validation

		if (!token) {
			return res.json({
				success: false,
				message: 'Please login, missing token',
			});
		}

		try {
			const decode = await jwt.decode(token, process.env.JWT_SECRET_KEY);

			req.user = decode;
		} catch (error) {
			console.log(error);
			res.json({
				message: 'Found some error while decode token',
			});
		}

		next();
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
			return res.json({
				success: false,
				message: 'You can not access this resource',
			});
		}
		next();
	} catch (error) {
		consolelog(error);
		res.json({
			success: false,
			message: 'Found some error while  check role of admin',
		});
	}
};