const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const Payments = require("../models/paymentModel")

const userCtrt = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      const user = await Users.findOne({ email });
      if (user) 
        return res.status(400).json({ msg: "the email already exits." });
      
      if (password.length < 6) {
        return res
          .status(400)
          .json({ msg: "password must be at least 6 characters" });
      }
      // Password Encryption
      const passwordHash = await bcrypt.hash(password, 10);
      const newUser = new Users({
        name,
        email,
        password: passwordHash,
      });

      //Save mongoDB
      await newUser.save();

      // then create jsonwebtoken to authention
      const accesstoken = createAccessToken({ id: newUser._id });
      const refreshtoken = createRefreshToken({ id: newUser._id });

      res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        path: "/user/refresh_token",
      });

      res.json({ accesstoken });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  login: async (req, res) => {
    try {
      const {email, password} = req.body;

      const user = await Users.findOne({email})
      if(!user) return res.status(400).json({msg: "User dose not exist"});

      const isMath = await bcrypt.compare(password, user.password)
      if(!isMath) return res.status(400).json({msg: "incorrect passwrod"})

      // If Loggin success, create accsess token and refresh token
      const accesstoken = createAccessToken({ id: user._id });
      const refreshtoken = createRefreshToken({ id: user._id });

      res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        path: "/user/refresh_token",
        maxAge: 7*24*68*60*1000 // 7d
      });

      res.json({ accesstoken });

    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", {path: "/user/refresh_token"})
      return res.json({ msg: "logged out"})
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  refreshToken: (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token)
        return res.status(400).json({ msg: "Please Login or register" });

      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err)
          return res.status(400).json({ msg: "Please Login or register" });

        const accesstoken = createAccessToken({id: user.id});

        res.json({ accesstoken });
      });
      // res.json({rf_token})

    } catch (err) {
      return res.status(500).json({ message: err.message });
    }

    // res.json({ rf_token });
  },
  getUser: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id).select('-password')
      if(!user) return res.status(400).json({msg: "User does not exist" }); 

      res.json(user) 
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  addCart: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id)
      if(!user) return res.status(400).json({msg: "User does not exist" }); 

      await Users.findOneAndUpdate({_id: req.user.id}, {
        cart: req.body.cart
      })

      return res.json({msg: "added to cart"})
    } catch (error) {
      return res.status(500).json({msg: err.message});
    }ry
  },
  history: async (req, res) => {
    try {
      const history = await Payments.find({user_id: req.user.id})

      res.json(history)
    } catch (err) {
      return res.status(500).json({msg: err.message})
    }
  }
};

const createAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "11m" });
};
const createRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};

module.exports = userCtrt;
