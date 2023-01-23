const passport = require("passport")
const localStrategy = require("passport-local").Strategy
const bcrypt = require("bcrypt")
const LogUser = require("./models/log.model")

passport.use("login", new localStrategy({
    usernameField: "email"
}, async (email, password, done) => {
    const user = await LogUser.findOne({email : email})
    if(!user){
        return done(null, false, {message: "failed authentication"})
    }else{
        const login = await bcrypt.compare(password,user.password)
        if(login){
            return done(null, user, )
        }else{
            return done(null, false, {message: "failed authentication"})
        }
    }
}))