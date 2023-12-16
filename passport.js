//Passport.js
//This file is used to authenticate each section of the login. It is the middleware between our database and the login prompts and does a simple check. 
const Strat = require('passport-local').Strategy
const bcrypt = require('bcrypt')
/*
const authenticateTeacher = (email, password, done) =>{

}
const authenticateStudent = (userName, password, done) =>{

}
*/
function initPassport(passport, getUserViaEmail, getUserById){
    const authenticateTeacher = async (email, password, done) =>{
        const user = getUserViaEmail(email)
        if (user == null){
            return done(null, false, {message: "No Account Found"})
        }

        try{
            if(await bcrypt.compare(password, user.password)){
                return done(null, user)
            } else{
                return done(null, false, {message: 'Login Failed'})
            }
        }catch (error){
            return done(error)

        }

    }
    passport.use(new Strat({usernameField: 'email'}, authenticateTeacher))
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => {return done(null, getUserById(id))})

}

module.exports = initPassport