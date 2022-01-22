require('dotenv').config();

// model 연결
// const 

// token function
const { generateAccessToken, sendAccessToken, isAuthorized } = require('./signFunctions');

// 클라이언트 token 확인하는 컨트롤러 필요할지도
module.exports = {
    login: (req, res) => {

    },

    logout: (req, res) => {
        res.clearCookie('accessToken', {
            httpOnly: true, secure: true, sameSite: 'None'
        }).json( { message: "success" } );
    },

    register: (req, res) => {

    },

    check: (req, res) => {

    }
};