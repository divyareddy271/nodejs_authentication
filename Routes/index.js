const express = require("express");
const passport = require("passport")
const routes = express.Router();
const signin_controller = require("../controllers/signin_controller")
const signup_controller = require("../controllers/signup_controller")
const forget_reset_controller = require("../controllers/forgot_reset_controler")
console.log("Router loaded");
routes.get("/sign-up",signup_controller.signup);
routes.post("/sign-up/register",signup_controller.register)

routes.get("/sign-in",signin_controller.signin);
routes.post("/sign-in/create-session",passport.authenticate(
    "local",
    {failureRedirect : "/sign-in"},),signin_controller.createsession);
routes.get("/",passport.checkauthentication,signup_controller.home);
routes.get("/reset",signin_controller.reset);
routes.get("/signout",passport.checkauthentication,signin_controller.logout);
routes.post("/reset/updation",signin_controller.update);
routes.get("/sign-in/forgot",forget_reset_controller.forgot)
//google routes
routes.get("/auth/google",passport.authenticate("google",{scope : ['profile','email']}))
routes.get("/auth/google/callback",passport.authenticate("google",{failureRedirect : "/users/sign-in" }),signup_controller.home)
routes.post("/sign-in/forgot/reset",forget_reset_controller.reset)

module.exports = routes;