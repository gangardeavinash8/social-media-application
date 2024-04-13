const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { error ,success} = require("../utils/responseWrapper");

const signupController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      // return res.status(400).send("All fielda are required"); //400 is a status code
      return res.send(error(400, "All filds are required"));
    }

    const oldUser = await User.findOne({ email });

    if (oldUser) {
      //return res.status(409).send("User already exists");
      return res.send(error(409, "User already exists"));
    }

    const hashedPassword = await bcrypt.hash(password, 10); //i use bcrypt libreary for password hashing

    const user = await User.create({
      email,
      password: hashedPassword,
    });

    // return res.status(201).json({
    //   user,
    // });

    return res.send(success(201, { user }));
  } catch (error) {
    console.log("error occoured to connect signupController ", error);
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      // return res.status(400).send("All fields are required");
      return res.send(error(400, "All fields are required"));
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      // return res.status(404).send("User is not registered");
      return res.send(error(404, "User is not registered"));
    }

    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      //return res.status(403).send("Incorrect password");
      return res.send(error(403, "Incorrect password"));
    }

    const accessToken = generateAccessToken({
      _id: user._id,
    });

    const refreahToken = generateRefreshToken({
      _id: user._id,
    });

    res.cookie("jwt", refreahToken, {
      httpOnly: true, //if we pass these fronteend is not able to access cookies
      secure: true, //this helps in production during deployment
    });

    res.send(success(201,{accessToken}))
  } catch (error) {
    console.log("error occoured to loginController ", error);
  }
};

//this api will check the refreshtoken validity and generate a new access token
const refreshAccessTokenController = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies.jwt) {
    //return res.status(401).send("refresh token in cookies is required");
    return res.status(error(401, "refresh token in cookies is required"));
  }

  const refreshToken = cookies.jwt; //we recieve these cookies in cookies

  console.log("refresh",refreshToken)

  // const { refreshToken } = req.body;

  // if(!refreshToken) {
  //   return res.status(401).send("refresh token is reqired")
  // }

  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_PRIVATR_KEY
    );
    const _id = decoded._id;
    const accessToken = generateAccessToken({ _id });

    return res.send(success(201,{accessToken}))
  } catch (e) {
    console.log(e);
    // return res.status(401).send("Invalid refresh token");
    return res.status(error(401, "Invalid refresh token"));
  }
};
//internal function to creat token

const generateAccessToken = (data) => {
  try {
    const token = jwt.sign(data, process.env.ACCESS_TOKEN_PRIVATR_KEY, {
      expiresIn: "1d",
    });
    console.log(token);
    return token;
  } catch (error) {
    console.log(error);
  }
};

const generateRefreshToken = (data) => {
  try {
    const token = jwt.sign(data, process.env.REFRESH_TOKEN_PRIVATR_KEY, {
      expiresIn: "1y",
    });
    console.log(token);
    return token;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  loginController,
  signupController,
  refreshAccessTokenController,
};
