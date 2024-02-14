const { validationResult } = require("express-validator");
const Place = require("../models/place");
const User = require("../models/user");
const HttpError = require("../models/http-error");
const { default: mongoose } = require("mongoose");

const getAllPlaces = async (req, res, next) => {
  let place;
  try {
    place = await Place.find();
  } catch (err) {
    const error = new Error(err.message, err.code);
    return next(error);
  }
  res.json(place);
};
const getPlaceByID = async (req, res, next) => {
  const placeID = req.params.placeID;
  let place;
  try {
    place = await Place.findById(placeID);
  } catch (err) {
    const error = new HttpError("Not able to complete the request", 422);
    return next(error);
  }

  if (!place) {
    return res.status(404).json({ error: "this place does not exist" });
  } else {
    res.json({ place });
  }
};

const getPlaceByUserID = async (req, res, next) => {
  const userID = req.params.userID;
  let userplace;
  try {
    userplace = await User.findById(userID).populate("places");
    console.log(userplace)
  } catch (err) {
    const error = new Error(err.message, err.code);
    return next(error);
  }

  if (!userplace || userplace.length === 0) {
    return res.status(404).json({ error: "this place user does not exist" });
  } else {
    res.json({
      places: userplace.places.map((place) => {
       
       return place.toObject({ getters: true });
        
      }),
    });
  }
};

const createPlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    throw new Error("There is validation error", 422);
  }
  const { title, description, address, creator } = req.body;
  const newCreatedPlace = new Place({
    title,
    address,
    description,
    image:
      "https://www.savaari.com/blog/wp-content/uploads/2023/05/Dharamshala-mountain-range-min-1-1.webp",
    location: {
      lat: 28.679079,
      lng: 77.06971,
    },
    creator,
  });
  let user;
  try {
    user = await User.findById(creator);
   
  } catch (err) {
    const error = new Error(err.message, err.code);
    return next(error);
  }
  if (!user) {
    const error = new HttpError("Not able to complete the request", 422);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await newCreatedPlace.save({ session: sess });
    user.places.push(newCreatedPlace);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new Error(err.message, err.code);
    return next(error);
  }

  res.status(201).json({ place: newCreatedPlace });
};

const updatePlace = async (req, res, next) => {
  const { title, description } = req.body;
  const placeID = req.params.pid;
  let place;
  try {
    place = await Place.findById(placeID);
  } catch (err) {
    const error = new Error(err.message, err.code);
    return next(error);
  }

  place.title = title;
  place.description = description;
  try {
    await place.save();
  } catch (err) {
    const error = new Error(err.message, err.code);
    return next(error);
  }

  res.status(200).json({ place: place.toObject({ getters: true }) });
};

const deletePlace = async (req, res, next) => {
  const placeID = req.params.pid;
  let place;

  try {
    place = await Place.findById(placeID).populate("creator");
  } catch (err) {
    const error = new Error(err.message, err.code);
    return next(error);
  }
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await place.deleteOne({ session: sess });
    await place.creator.places.pull(place);
    await place.creator.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new Error(err.message, err.code);
    return next(error);
  }

  res.status(200).json({ sucess: "The data was deleted" });
};
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
exports.getPlaceByID = getPlaceByID;
exports.getAllPlaces = getAllPlaces;
exports.createPlace = createPlace;
exports.getPlaceByUserID = getPlaceByUserID;
