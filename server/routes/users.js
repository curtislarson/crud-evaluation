var ValidationError = require("mongoose").Error.ValidationError;
var winston = require("winston");
var router = require("express").Router();

var User = require("../models/user");

router.post("/", createUser);
router.post("/search", searchUsers);
router.post("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/:id", getUser);

function validationError(err, res) {
  if (err) {
    if (err instanceof ValidationError) {
      res.status(400).send(err);
    } else {
      res.status(500).end();
    }
    return true;
  }

  return false;
}

function createUser(req, res) {
  winston.info("createUser", req.body);
  var user = new User(req.body);
  var saveFunc = (err, savedUser) => {
    if (validationError(err, res)) {
      return;
    }
    res.status(200).send({_id: user._id});
    // Anything else we want to do after creating a user...
  };
  user.save(saveFunc);
}

function updateUser(req, res) {
  winston.info("updateUser", req.params);
  User.update({_id: req.params.id}, req.body, (err) => {
    if (err) {
      res.status(400).send(err);
    }
    else {
      res.status(200).send({_id: req.params.id});
    }
  });
}

function searchUsers(req, res) {
  winston.info("searchUser", req.body);
  var query = {};

  if (req.body.name) {
    query.name = new RegExp(req.body.name, "g");
  }

  if (req.body.age) {
    query.age = req.body.age;
  }
  User.find(query).limit(req.body.limit).skip(req.body.skip).exec().then((users) => {
    return User.count(query).exec().then((count) => {
      return Promise.resolve({
        users: users,
        count: count,
      });
    });
  }).then((data) => {
    res.status(200).send(data);
  }).catch((err) => {
    res.status(500).send(err);
  });
}

function deleteUser(req, res) {
  winston.info("deleteUser", req.params);
  User.findById(req.params.id).exec().then((user) => {
    if (!user) {
      res.status(404).send("User not found");
      return;
    }
    user.remove();
  }).then(() => {
    res.sendStatus(200);
  }).catch((err) => {
    console.log("err", err);
    res.status(500).send(err);
  });
}

function getUser(req, res) {
  winston.info("getUser", req.params);
  User.findById(req.params.id).exec((err, user) => {
    if (err) {
      res.status(404).send(err);
    }
    else {
      res.send(user.toObject());
    }
  });
}

module.exports = router;
