const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const placeControllers = require("../controllers/place-controllers");
const fileUpload = require("../middleware/file-upload");
router.get("/", placeControllers.getAllPlaces);
router.get("/:placeID", placeControllers.getPlaceByID);
router.get("/user/:userID", placeControllers.getPlaceByUserID);
router.post(
  "/",
  fileUpload.single("image"),
  [
    check("title").notEmpty().escape(),
    check("description").notEmpty().escape(),
  ],
  placeControllers.createPlace
);
router.patch("/:pid", placeControllers.updatePlace);
router.delete("/:pid", placeControllers.deletePlace);

module.exports = router;
