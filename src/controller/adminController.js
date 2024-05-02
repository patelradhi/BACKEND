const db = require("../model/index");
let user = db.User;
const uuid = require("uuid");
const bcrypt = require("bcrypt");
const { where } = require("sequelize");
const { use } = require("../routes/router");
const jwt = require("jsonwebtoken")
require('dotenv').config()


//....................................... Create user ............................................./

exports.createUser = async (req, res) => {
  try {
    const { Email, Name, Password, Contact, Address } = req.body;

    console.log(req.body,">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")

    //validation

    if (!Email || !Password || !Name) {
      return res.json({
        success: false,
        message: "Required feild",
      });
    }

    //check that user is all ready registerd or not

    const userExist = await user.findOne({
        where: {
          Email: Email
        }
      });

      console.log(userExist,">>>>>>>>>>>>>>>>>>>>>>>>>>>")
      
    if (userExist) {
      return res.status(404).json({
        success: false,
        message: "User all ready exist",
      });
    }

    const encryptedPassword = await bcrypt.hash(Password, 10);
    console.log(encryptedPassword , ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");

    const newId = uuid.v4()

    const User = await user.create({
      Id:newId,
      Name: Name,
      Email: Email,
      Contact: Contact,
      Password: encryptedPassword,
      Address: Address,
    });

    console.log(User,">>>>>>>>>>>>>>>>>>>User")

    res.status(200).json({
      success: "true",
      message: "User created Successfully",
      data: User,
    });
  } catch (error) {
    console.error(error)  
     res.status(500).json({
      success: false,
      message: "Internal error",
    });
  }
};


//.........................................user login................................................................/

exports.login = async(req,res)=>{
  try {

    //destructure email and password

    const {Email,Password} = req.body

    //validation

    if(!Email || !Password){
      return res.status(401).json({
        success:false,
        message : "Required all feild"

      })
    }

    //check exist user



    const existUser = await user.findOne({where:{
      Email:Email
    }})

    if(!existUser){
      return res.json({
        success:false,
        message:"User not exist"
      })

    }


   //password check

   const checkPassword = await bcrypt.compare(Password,existUser.Password)

   if(!checkPassword){
     return res.json({
      success:false,
      message:"Password does not matched"

    })
   }


//if password matched then generate token and sent into cookie

if (checkPassword) {
  const payload = {
    email: existUser.Email,
    id: existUser.Id,
    role:existUser.Role

  };

  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: '3h',
  });

   //token send into cookie and res

   let Options = {
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  //response

  const ans = await user.findOne({where:{
    Email:Email
  },attributes: ['Email','Name']})

  res.status(200)
				.cookie('token', token, Options)
				.json({
					status: 'success',
					message: 'User logged in successfully',
					data: {
						...ans._doc,
						token,
					},
				});
   
} 
}catch (error) {
    console.log(error)
    
  }
}
  





//........................................update user......................................................./

exports.updateUser = async (req, res) => {
  try {
    const { Email, Name, Contact, Address,Password } = req.body;
    console.log(req.body,">>>>>>>>>>>>>>>>>>>>>>>")


// Check if the user exists
    const userToUpdate = await user.findOne({where:{
      Email:Email
    }});
    if (!userToUpdate) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Hash the password if provided

    let encryptedPassword=""
    if (Password) {
       encryptedPassword = await bcrypt.hash(Password, 10);
    }

    console.log(encryptedPassword ,">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>..")


    // Prepare data to update
    const data = {
      Name: Name,
      Email: Email,
      Contact: Contact,
      Address: Address,
      Password:encryptedPassword
    };

    // Update the user
    await userToUpdate.update(data);


    res.status(200).json({
      success: "true",
      message: "User updated Successfully",
      data: userToUpdate,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal error",
    });
  }
};

//....................................... list of user ............................................./

exports.fetchUsersList = async (req, res) => {
  try {
    //check that user is all ready registerd or not

    const fetchUser = await user.findAll({});
    console.log(fetchUser,">>>>>>>>>>>>>>>> fetched user")

    res.status(200).json({
      success: "true",
      message: "User fetched Successfully",
      data: fetchUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal error",
    });
  }
};

//............................listing user by id...............................................//

exports.fetchUsersListById = async (req, res) => {
  try {
    const { Id } = req.params;

    if (!Id) {
      return res.status(401).json({
        success: false,
        message: "Please provide user id",
      });
    }

    //check that user is all ready registerd or not
    console.log("Id>>>>>>>>>>>>>>>>>>>>>>>>>",Id)
    const fetchUserById = await user.findOne({where:{Id:Id},attributes: ['Email','Name','Contact','Address']});


    
    res.status(200).json({
      success: "true",
      message: "User fetched Successfully",
      data: fetchUserById,
    });
  } catch (error) {
    console.log(Error);
    res.status(500).json({
      success: false,
      message: "Internal error",
    });
  }
};

//........................................delete user......................................................./

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    //check that user is all ready registerd or not

    const userToDelete = await user.findByPk(id);
    if (userToDelete) {
      await userToDelete.destroy();
      console.log("User deleted successfully.");
    }

    res.status(200).json({
      success: "true",
      message: "User deleted Successfully",
    });
    
  } catch (error) {
    console.log(Error);
    res.status(500).json({
      success: false,
      message: "Internal error",
    });
  }
};
