const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const userControllers = require("../controllers/user-controllers");
const fileUpload = require("../middleware/file-upload");

router.get("/", userControllers.getUsers);
router.get("/:userID", userControllers.getUsers);
router.post(
  "/signup",
  fileUpload.single("image"),
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  userControllers.signup
);
router.post("/login", userControllers.login);

module.exports = router;
