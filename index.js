// implement your API here

const express = require("express");
const cors = require("cors");
//bring in the model so we can talk to the db

const db = require("./data/db");
const server = express();

server.use(cors());
server.use(express.json());

server.post("/api/users", createUser);
server.get("/api/users", getUsers);
server.get("/api/users/:id", getUser);
server.delete("/api/users/:id", deleteUser);
server.put("/api/users/:id", editUser);

function createUser(req, res) {
  const { name, bio } = req.body;

  if (!name || !bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else {
    db.insert(req.body)
      .then(user => {
        res.status(201).json(user);
      })
      .catch(() => {
        res.status(500).json({
          errorMessage:
            "There was an error while saving the user to the database"
        });
      });
  }
}

function getUsers(req, res) {
  db.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(() => {
      res.status(500).json({
        errorMessage: "The users information could not be retrieved."
      });
    });
}

function getUser(req, res) {
  db.findById(req.params.id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(() => {
      res
        .status(500)
        .json({ errorMessage: "The user information could not be retrieved." });
    });
}

function deleteUser(req, res) {
  db.remove(req.params.id)
    .then(count => {
      if (count && count > 0) {
        res.status(200).json({
          message: "the user was deleted."
        });
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(() => {
      res.status(500).json({ errorMessage: "The user could not be removed" });
    });
}

function editUser(req, res) {
  const { name, bio } = req.body;

  if (!name || !bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else {
    db.update(req.params.id, req.body)
      .then(user => {
        if (user) {
          res.status(200).json(user);
        } else {
          res.status(404).json({
            message: "The user with the specified ID does not exist."
          });
        }
      })
      .catch(() => {
        res.status(500).json({
          errorMessage: "The user information could not be modified."
        });
      });
  }
}

server.listen(process.env.PORT || 5000, () => {
  console.log("listening on " + (process.env.PORT || 5000));
});
