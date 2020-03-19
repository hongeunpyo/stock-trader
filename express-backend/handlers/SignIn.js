const User = require('../schema/UserSchema');

const SignIn = async (req, res) => {
    // Read username and password from request body
    console.log("Signin Request received...")
    const { email, password } = req.body;

    const user = await User.findOne({email: email});
    try {
        if (!user) {
            return res.status(401).json({
                message: `The email address ${email} is not associated with any account. Double-check your email address and try again.`,
            });
        }

        // validate password against DB
        const passwordsMatch = user.comparePassword(password);
        if (!passwordsMatch) {
            return res.status(401).json({
                message: 'Invalid email or password',
            });
        };

        const token = user.generateJWT();
        // Login successful, write token, and send back user
        // res.cookie('jwt', token, { maxAge: jwtExpirySeconds * 1000 })
        return res.status(200).json({token: token, user: user});
    }
    catch(err) {
        res.status(500).json({message: err.message});
    } 
}

module.exports = SignIn;
