const express = require("express");
const app = express();
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");


const sessionOptions = { 
    secret : "mysupersecretstring",
    resave : false, 
    saveUninitialized : true
}

app.use(session(sessionOptions));
app.use(flash());

app.use((req, res, next)=>{
    res.locals.successMsg = req.flash("success");
    res.locals.errorMsg = req.flash("error");
    next();
})

app.get("/register", (req, res)=>{
    let {name = "anonymous"} = req.query;
    req.session.name = name;

    if(name === "anonymous"){
        req.flash("error", " user not regitsered");
    }else{
        req.flash("success", " user regitser successfully");
    }
   
    res.redirect("/hello");
})

app.get("/hello", (req, res)=>{
    //res.send(`hello ${req.session.name}`);
    res.render("page.ejs", {name : req.session.name });
})

// app.get("/reqcount", (req, res)=>{
//     if(req.session.count){
//         req.session.count++;
//     }else{
//         req.session.count = 1;
//     }
//      res.send(`You sent a request ${req.session.count} times`);
// })

// app.get("/test", (req, res)=>{
//     res.send("test successfull");
// })

             //COOKIE
// const cookieParser = require("cookie-parser");

// app.use(cookieParser("secretcode"));

// app.get("/getsignedcookie", (req, res)=>{
//     res.cookie("made-in", "india", {signed : true});
//     res.send("done!");
// })

// app.get("/verify", (req, res) =>{
//     console.log(req.signedCookies);
// })

// app.get("/getcookies", (req, res)=>{
//     res.cookie("greet", "namaste");
//     res.cookie("origin", "India");
//     res.send("we sent you a cookie");
// })

// app.get("/greet", (req, res)=>{
//     let {name = "anonymous"} = req.cookies;
//     res.send(`Hi, ${name}`);
// })

// app.get("/", (req, res)=>{
//     console.log(req.cookies);
//     res.send("welcome to root page");
// })

app.listen(3000, ()=>{
   console.log("app listen on port 3000");
})