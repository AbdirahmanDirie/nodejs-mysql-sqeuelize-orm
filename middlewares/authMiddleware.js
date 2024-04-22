const jwt = require('jsonwebtoken');
const User = require("../models/Users");

const userAuth = async (req, res, next) => {
    let token;

    if(
        req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
    ){

        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1]

      
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            
            // Get user from the token
            req.user = await User.findOne({where: {id: decoded.id}})


            if(!req.user ){
              return res.status(401).json({msg: 'Only Users Show'})
            }
      
            next()
          } catch (error) {
            return res.status(401).json({msg: 'Not authorized'})
          }

    }

    if (!token) {
        return res.status(401).json({msg: 'Not Authorized, No Token'})
      }

}


module.exports = {userAuth }