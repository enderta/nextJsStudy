const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const authMiddleware = (handler) => (req, res) => {
    // Get token from request header
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({error: "Unauthorized"});
    }
    // Verify token
    jwt.verify(token, 'secret', (error, decoded) => {
            if (error) {
                return res.status(401).json({error: "Unauthorized"});
            } else {
                req.user = decoded;
                handler(req, res);
            }
        }
    );
};

export default authMiddleware;