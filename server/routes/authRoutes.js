import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../prismaClient.js";
import verifyToken from "../middleware/authmiddleWare.js";

//This line creates a new express router
//Router is a express function that returns an object GET POST PUT DELETE
//Router can now do everything app can do.

const router = express.Router();

//Register new account
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  //encrypt password
  const hashedPassword = bcrypt.hashSync(password, 10);

  //save new user and password to the db
  const user = await prisma.user.create({
    data: {
      name: username,
      password: hashedPassword,
      email: email,
    },
  });

  res.status(201).json({ message: "Register route works", user: user });
});

//User Login//
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  console.log(req.userId);

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
     
  }

  const isPasswordValid = bcrypt.compareSync(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid password" });
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return res.json({
    token: token,
    user: {
      name: user.name,
    }

});

  
  
});

// const verifyToken = async (req, res, next) => {
//     const authHeader = req.headers.authorization

//   if (!authHeader) {
//     return res.status(403).json({ message: "No token provided" })
//   }

//   const token = authHeader.split(" ")[1]

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET)
//     req.userId = decoded.id
//     next()
//   } catch (err) {
//     return res.status(401).json({ message: "Invalid token" })
//   }

// }

router.get("/home", verifyToken, async (req, res) => {
  res.json({ message: "Home route works" });
});

router.get("/dashboard", verifyToken, async (req, res) => {
  res.json({ message: "Dashboard route works" });
});

export default router;
