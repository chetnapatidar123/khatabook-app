var express = require('express');
var router = express.Router();

const User = require("../models/userModel");
const passport = require("passport");
const localStrategy = require("passport-local");
passport.use(new localStrategy(User.authenticate()));

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('signin', { title: 'Express' });
});

router.post("/signin", passport.authenticate("local", { successRedirect: "/khata", failureRedirect: "/signin", }),
 function (req, res, next) { });

router.get("/signup", function (req, res, next) {
  res.render("signup", { title: "signup", isLoggedIn: req.user ? true : false, user: req.user, });
});

router.post("/signup", function (req, res, next) {
  const { username, email, number, password } = req.body;
  User.register({ username, email, number}, password)
    .then((user) => {
      res.redirect("/")
    })
    .catch((err) => res.send(err));
});

router.get("/khata",isLoggedIn, function (req, res, next) {
  res.render("khata", { title: "khata", isLoggedIn: req.user ? true : false, user: req.user, });
});

router.get("/old",isLoggedIn, async function (req, res, next) {
  const users = await User.find({})
  res.render("old", { title: 'old', isLoggedIn: req.user ? true : false, user: req.user,users });
});

router.get("/newcustomer", isLoggedIn, async function (req, res, next) {
  // const user = await User.findOne({username: req.body.username})
  res.render("newcustomer", { title: "newcustomer", isLoggedIn: req.user ? true : false, user: req.user, });
});

router.post("/newcust", async function (req, res, next) {
  const data = await User.create({ fullname: req.body.fullname, city: req.body.city, contact: req.body.contact,detail: [],entry:[] })
  // if (user) return res.send("user allready found")
  //  res.json(req.body)
  // req.user.newcustomer.push(req.body);
  // await req.user.save();
  res.redirect("/old")
});

router.get("/detail",isLoggedIn, async function (req, res, next) {
  const data = await User.findById(req.params.id,req.body.fullname,req.body.city,req.body.contact)
      // const used = await User.find({})
  res.render("detail" ,{ title: "detail", isLoggedIn: req.user ? true : false, user: req.user,data });
});

router.post("/add-entry", async function (req, res, next) {
  const data =await User.create({particular:req.body.particular,credit:req.body.credit,debit: req.body.debit,date: req.body.date});
  // req.data.entry.push(req.body);
  // await req.data.save();
  res.json(req.body)
  res.redirect("/detail")
});

   // get /delete-ent page
  //  router.get("/delete-ent/:index", isLoggedIn, async function (req, res, next) {
  //   const eduCopy = [...req.data.detail];
  //   eduCopy.splice(req.params.index, 1); 
  //   req.data.detail = [...eduCopy];
  //   await req.data.save();
  //   res.redirect("/detail");
  // });




function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    next();
  }else{
    res.redirect("/")
  }
};


module.exports = router;
