import JWT from "jsonwebtoken";

const Auth_token = process.env.JWT_SECRET;

//  protected routes token base...
const requireSignIn = async function(req, res, next) {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(400).send({ error: "Please authenticate using a valid token" });
    }

    try {
        const decode = JWT.verify(token, Auth_token);
        req.user = decode;
        next();
    } catch (error) {
        res.status(400).send({
            success: false,
            message: "Please authenticate using a valid token",
            error
        });
    }
};

export default requireSignIn;
