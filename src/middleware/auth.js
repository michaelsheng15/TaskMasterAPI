const jwt = require('jsonwebtoken')
const User = require('../models/user')


const auth = async (req, res, next) => {
    try{
        const token = req.header('Authorization').replace('Bearer ', '') //looks for header provided by user
        const decoded = jwt.verify(token, 'thisismynewcourse')  //validates the header
        const user = await User.findOne({_id: decoded._id, "tokens.token":token}) //finds the user associated with the validated token

        if(!user){
            throw new Error() //triggers the catch code
        }

        req.token = token

        req.user = user
        next()
    }catch (e){
        res.status(401).send({error: 'Please authenticate'})
    }
}

module.exports = auth