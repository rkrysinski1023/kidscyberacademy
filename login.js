//Kyle Johnson
//KidsCyberAcademy Login-Code
//This code runs on node.js, which connects to an express server and allows the user to login, save the username and password, and keeps in encrypted until it is decrypted to check 



const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const passportID = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')

if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}
//Connect this to a databse, do not leave for final project
const users = []

const initPassport = require('./passport')
initPassport(passportID, email => 
    users.find(user => user.email === email),
    id => users.find(user=>user.id === id)

)

//------------------------------------------

app.set('view-engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SEC,
    resave: false,
    saveUninitialized: false
}))
app.use(passportID.initialize())
app.use(passportID.session())
app.use(methodOverride('_method'))

//----
app.get('/', checkAuth, (req, res) => {
    res.render('index.ejs', {name: req.user.name})
})
//----

app.get('/loginChoice', (req, res) => {
    res.render('loginChoice.ejs')
})
app.get('/student_login', (req, res) => {
    res.render('student_login.ejs')
})
app.get('/teacher_login', checkNotAuth,(req, res) => {
    res.render('teacher_login.ejs')
})
app.get('/student_signup', (req, res) => {
    res.render('student_signup.ejs')
})
app.get('/teacher_signup', checkNotAuth,(req, res) => {
    res.render('teacher_signup.ejs')
})
app.post('/student_login', (req, res) => {
    req.body.userName
    req.body.password
})
app.post('/student_signup', async(req, res) => {
    
    try{
        //add part  for password checker
        //req.body.password
        //req.body.passwordCheck
        //check if they are the same before you run

        const hashPSWD = await bcrypt.hash(req.body.password, 15)
        //change when working with database
        users.push({
            id: Date.now().toString(), 
            name: req.body.userName,
            password: hashPSWD,
            email: req.body.email
            
        })
        res.redirect('/student_login')
    }catch{
        res.redirect('/student_signup')
    }  
    console.log(users)
})
app.post('/teacher_login', checkNotAuth,passportID.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/teacher_login',
    failureFlash: true
}))
app.post('/teacher_signup', checkNotAuth,async(req, res) => {
    try{
        //add part  for password checker
        //req.body.password
        //req.body.passwordCheck
        //check if they are the same before you run

        const hashPSWD = await bcrypt.hash(req.body.password, 15)
        //change when working with database
        users.push({
            id: Date.now().toString(), 
            name: req.body.userName,
            password: hashPSWD,
            email: req.body.email,
            school: req.body.school
            
        })
        res.redirect('/teacher_login')
    }catch{
        res.redirect('/teacher_signup')
    }  
    console.log(users)
    req.body.userName
    req.body.password
    req.body.passwordCheck
    req.body.email
    req.body.school
})

app.delete('/logout', (req, res, next) =>{
    req.logOut((err)=>{
        if (err){
            return next (err);
        }
        res.redirect('/teacher_login')
    })
})

    

function checkAuth(req, res, next) {
    if (req.isAuthenticated()){
        return next()
    }

    res.redirect('/teacher_login')
}
function checkNotAuth(req, res, next){
    if (req.isAuthenticated()){
        return res.redirect('/')
    }
    next()
}


app.listen(3000)