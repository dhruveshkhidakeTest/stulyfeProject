const { error } = require('./CommonFunction/Responses');
const admin = require('./firebase');
const authenticate = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return error(401,"Unauthorized",res)
    }
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = decodedToken;
        next();
    } catch (err) {
        return error(401,"Unauthorized",res)
    }
};
module.exports = authenticate;