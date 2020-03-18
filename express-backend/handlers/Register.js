const User = require('../schema/schema');

const Register = async (req, res) => {
    try {
        // Read email and password from request body
        const { email, password, fullName } = req.body;
        // Check to see if email isn't already registered to an account
        const user = await User.findOne({email})
        // return 401 error if email is already registered
        if (user){
            return res.status(401).json({
                message: 'The email you entered is already registed to another account'
            });
        }
    
        const newUser = new User({email, password, fullName})
        const savedUser = await newUser.save()

        return res.status(200).json({
            token: savedUser.generateJWT(),
            user: savedUser
        });
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
}

module.exports = Register;
