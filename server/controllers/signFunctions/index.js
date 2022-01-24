require('dotenv').config();
const { sign, verify } = require('jsonwebtoken');
// 필요하면 model 연결
// const {  } = 

module.exports = {
    generateAccessToken: (data) => {
        return sign(data, process.env.ACCESS_SECRET, { expiresIn: "1m" });
    },

    sendAccessToken: (res, accessToken) => {
        res.cookie('jwt', accessToken, {
            httpOnly: true, secure: true, samSite: 'None'
        })
        .json({ data: { accessToken }, message: "Login Success" });
        
        // res.append('Set-Cookie', `jwt=${accessToken}; SameSite=none; Secure; HttpOnly`).json({ data: { accessToken }, message: 'ok'});
    },
    
    isAuthorized: (req) => {
        // const authorization = req.headers["authorization"];
        const cookie = req.cookies;
        
        if (!cookie) return null;
        // const token = authorization.split(" ")[1];
        try {
            const token = cookie.jwt;
            return verify(token, process.env.ACCESS_SECRET);
        } catch (err) {
            return null;
        }
    }
};