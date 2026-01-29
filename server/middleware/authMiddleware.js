import jwt from "jsonwebtoken";


const verifyToken = (req, res, next) => {
  // 1️⃣ Get the Authorization header
  const authHeader = req.headers.authorization;

  // If no header exists
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  // Header looks like:
  // "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  const token = authHeader.split(" ")[1];

  // If token is missing
  if (!token) {
    return res.status(401).json({ message: "Token missing" });
  }

  try {
    // 2️⃣ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3️⃣ Attach userId to request
    req.userId = decoded.userId;

    // 4️⃣ Continue to route
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

export default verifyToken;
