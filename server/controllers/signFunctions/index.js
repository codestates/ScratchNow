require('dotenv').config();
const { sign, verify } = require('jsonwebtoken');
// 필요하면 model 연결
// const {  } = 

module.exports = {
    generateAccessToken: (data) => {
        return sign(data, process.env.ACCESS_SECRET, { expiresIn: "1m" });
    },

    sendAccessToken: (res, accessToken) => {
        res.cookie('accessToken', accessToken, {
            httpOnly: true, secure: true, samSite: 'None'
        })
        .json({ data: { accessToken }, message: "ok" });
    },
    
    isAuthorized: (req) => {
        const authorization = req.headers["authorization"];
        if (!authorization) return null;
        const token = authorization.split(" ")[1];
        try {
            return verify(token, process.env.ACCESS_SECRET);
        } catch (err) {
            return null;
        }
    }
};