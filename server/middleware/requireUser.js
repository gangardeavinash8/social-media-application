

const jwt = require("jsonwebtoken");
const {error}=require('../utils/responseWrapper');


module.exports = async (req, res, next) => {
  //thsi is a middleware

  if (
    !req.headers ||
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer")
  ) {
    //return res.status(401).send("Authraization header is required");
    return res.status(error(401,"Authraization header is required"))
  }

  const accessToken = req.headers.authorization.split(" ")[1];
  //console.log(accessToken);
  try {
    const decode = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_PRIVATR_KEY
   
    );
    
    req._id=decode._id; //id of middleware
   // next();
  } catch (e) {
    console.log("the error is ",e);
    //return res.status(401).send("Invalid accrss token");
    return res.send(error (401,"Invalid accrss key"))
  }

  console.log(accessToken);
  next();
};


// const jwt = require("jsonwebtoken");
// //const User = require("../models/User");
// const { error } = require("../utils/responseWrapper");

// module.exports = async (req, res, next) => {
//     if (
//         !req.headers ||
//         !req.headers.authorization ||
//         !req.headers.authorization.startsWith("Bearer")
//     ) {
//         // return res.status(401).send("Authorization header is required");
//         return res.send(error(401, 'Authorization header is required'))
//     }

//     const accessToken = req.headers.authorization.split(" ")[1];

//     try {
//         const decoded = jwt.verify(
//             accessToken,
//             process.env.ACCESS_TOKEN_PRIVATR_KEY
//         );
//         req._id = decoded._id;
        
//         //const user = await User.findById(req._id);
//         // if(!user) {
//         //     return res.send(error(404, 'User not found'));
//         // }

//         next();
//     } catch (e) {
//         console.log(e);
//         // return res.status(401).send("Invalid access key");
//         return res.send(error(401, 'Invalid access key'))
//     }
// };


