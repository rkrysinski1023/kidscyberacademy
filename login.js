//Kyle Johnson
//KidsCyberAcademy Login-Code

//Beta. Very simplistic will be changing to work in Wix at a later date, main usage is to facilitate login and encryption processes. 
//This code runs on node.js, which connects to an express server and allows the user to login, save the username and password, and keeps in encrypted until it is decrypted to check
// This code is built upon a view on creating a Passport Node JS login https://www.youtube.com/watch?v=-RCnNyD0L-s, however I have added my own design, pages, and attributes into my 
// own unqiue version
//NOTE This code does not currently work without the node_modules file. This should be fine since I have a package.json file but lmk if you do need it.
const express = require('express') //Temp server, will intergrate with Wix by the end of project
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const app = express()// This also
const bcrypt = require('bcrypt')
const passportID = require('passport')

if (process.env.NODE_ENV !== 'production')
{
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
//Creates a session for each passport attempt
//Change it to a personal session with a session id
app.set('view-engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SEC,
    resave: false,
    saveUninitialized: false
}))
app.use(passportID.initialize())//initialize a passport ID session
app.use(passportID.session())
app.use(methodOverride('_method'))


app.get('/', ifAuth, (req, res) => 
{
    res.render('index.ejs', {name: req.user.name})
})


//Different calls when the page is needed to then pull up the html .ejs file for that page
app.get('/loginChoice', (req, res) => 
{
    res.render('loginChoice.ejs')
})
app.get('/student_login', (req, res) => 
{
    res.render('student_login.ejs')
})
app.get('/teacher_login', ifAuthCurrent,(req, res) => 
{
    res.render('teacher_login.ejs')
})
app.get('/student_signup', (req, res) => 
{
    res.render('student_signup.ejs')
})
app.get('/teacher_signup', ifAuthCurrent,(req, res) => 
{
    res.render('teacher_signup.ejs')
})
app.get('/loginChoice', ifAuthCurrent,(req,res)  => 
{
    res.render('loginChoice.ejs')
})

//calls for requests and responses to inputs on the pages. 
//app.post('/student_login', (req, res) => 
//{
    //req.body.userName
  //  req.body.password
//})
app.post('/loginChoice', ifAuthCurrent,passportID.authenticate('local', 
{
    successRedirect: '/',
    failureRedirect: '/loginChoice',
    failureFlash: true
}))

/*app.post('/student_login', ifAuthCurrent,passportID.authenticate('local', 
{
    successRedirect: '/',
    failureRedirect: '/student_login',
    failureFlash: true
}))*/
app.post('/student_signup', async(req, res) => 
{
    
    try{
        //add part  for password checker
        //req.body.password
        //req.body.passwordCheck
        //check if they are the same before you run
        //hash the password when obtained, this is the value that will be kept in the database, not the plaintext
        const hashPSWD = await bcrypt.hash(req.body.password, 15)
        //change when working with database
        users.push({
            id: Date.now().toString(), //Id is a call to date pushed to a string value. Will also add a random value character 
            name: req.body.userName,
            password: hashPSWD, //Hashed password, never plaintext
            email: req.body.email 
            
        })
        res.redirect('/student_login')
    }catch{
        res.redirect('/student_signup')
    }  
    console.log(users)
})
app.post('/teacher_login', ifAuthCurrent,passportID.authenticate('local', 
{
    successRedirect: '/',
    failureRedirect: '/teacher_login',
    failureFlash: true
}))
app.post('/teacher_signup', ifAuthCurrent,async(req, res) => 
{
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
//Simple logout button, will change later
app.delete('/logout', (req, res, next) =>
{
    req.logOut((err)=>{
        if (err){
            return next (err);
        }
        res.redirect('/teacher_login')
    })
})

    
//Check if the user is authenticated. If they are not, instead of just going to any link they want, it will send them to the login page. #Change to login choice page#
function ifAuth(req, res, next) 
{
    if (req.isAuthenticated()){
        return next()
    }

    res.redirect('/teacher_login')
}
//Check if the authenticated. IF they are, makes sure they cannot go back to a page if they are already logined in. 
function ifAuthCurrent(req, res, next)
{
    if (req.isAuthenticated()){
        return res.redirect('/')
    }
    next()
}

//Temp server host http://localhost:3000/ via express
app.listen(3000)
