const express = require("express");
const passport = require("passport")
const routes = express.Router();
const signin_controller = require("../controllers/signin_controller")
const signup_controller = require("../controllers/signup_controller")
console.log("Router loaded");
routes.get("/sign-up",signup_controller.signup);
routes.post("/sign-up/register",signup_controller.register)
routes.get("/sign-in",signin_controller.signin);
routes.post("/sign-in/create-session",passport.authenticate(
    "local",
    {failureRedirect : "/sign-un"},),signin_controller.createsession);
routes.get("/",passport.checkauthentication,signup_controller.home);
routes.get("/reset",signin_controller.reset);
routes.get("/signout",passport.checkauthentication,signin_controller.logout);
routes.post("/reset/updation",signin_controller.update);



module.exports = routes;