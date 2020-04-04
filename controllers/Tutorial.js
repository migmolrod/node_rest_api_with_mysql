/**
 * Created by Christos Ploutarchou
 * Project : node_rest_api_with_mysql
 * Filename : Sequelize.js
 * Date: 04/04/2020
 * Time: 22:08
 **/

const db = require("../models");
const tutorialObj = db.tutorials;
const Op = db.Sequelize.Op;

// Create and save new Tutorial
exports.create = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({
      message: "Content cannot be empty"
    });
  }

  // Create a Tutorial object
  const tutorial = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false,
    publisher_name: req.body.publisher_name ? req.body.publisher_name : false
  };

  // Save Tutorial object to db
  tutorialObj.create(tutorial).then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while saving."
    });
  });
};

// Retrieve all Tutorial (Receive data with condition).
exports.getAll = (req, res) => {
  const title = req.query.title;
  const condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  tutorialObj.getAll({
    where: condition
  }).then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving data."
    });
  });
};

// Get Tutorial object by ID
exports.getByID = (req, res) => {
  const id = req.params.id;
  tutorialObj.findByPk(id).then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || `Some error occurred while retrieving data with id : ${id}`
    });
  });
};
// Update a Tutorial object by the id
exports.update = (req, res) => {
  const id = req.params.id;
  tutorialObj.update(req.body, {
    where: { id: id }
  }).then(num => {
    if (num === 1) {
      res.send({
        message: "Tutorial object successfully updated."
      });
    } else {
      res.send({
        message: `Cannot update Tutorial object with id=${id}!`
      });
    }
  }).catch(err => {
    res.status(500).send({
      message: err.message || `Error while updating Tutorial object with id=${id}!`
    });
  });
};

// Delete Tutorial object by ID
exports.delete = (req, res) => {
  const id = req.params.id;
  tutorialObj.destroy({
    where: { id: id }
  }).then(num => {
    if (num === 1) {
      res.send({
        message: "Tutorial object successfully deleted."
      });
    } else {
      res.send({
        message: `Cannot delete Tutorial object with id=${id}!`
      });
    }
  }).catch(err => {
    res.status(500).send({
      message: err.message || `Cannot delete Tutorial object with id=${id}!`
    });
  });
};

// Delete All Tutorial
exports.deleteAll = (req, res) => {

};

// Get all published Tutorial

exports.getAllPublished = (res, req) => {

};
// Get all published Tutorial by Publisher Name

exports.getAllPublisherName = (res, req) => {

};
