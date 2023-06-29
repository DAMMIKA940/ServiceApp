const Draf = require("../models/draf.model");

exports.create = async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }

    const draf = new Draf({
      serviceId: req.body.serviceId,
      date: req.body.date,
    });

    Draf.create(draf, (err, data) => {
      if (err)
        res.status(500).send({
          code: 500,
          success: false,
          message:
            err.message || "Some error occurred while creating the Draf.",
        });
      else
        res.status(200).send({
          code: 200,
          success: true,
          data: data,
          message: "Draf created successfully",
        });
    });
  } catch (error) {
    res
      .status(500)
      .json({ code: 500, success: false, message: "Internal Server Error" });
  }
};

exports.findAll = async (req, res) => {
  try {
    Draf.getAll((err, data) => {
      if (err)
        res.status(500).send({
          code: 500,
          success: false,
          message: err.message || "Some error occurred while retrieving draf.",
        });
      else
        res.status(200).send({
          code: 200,
          success: true,
          data: data,
          message: "Draf created successfully",
        });
    });
  } catch (error) {
    res
      .status(500)
      .json({ code: 500, success: false, message: "Internal Server Error" });
  }
};

exports.findOne = async (req, res) => {
  try {
    Draf.findById(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            code: 404,
            success: false,
            message: `Not found Draf with id ${req.params.id}.`,
          });
        } else {
          res.status(500).send({
            code: 500,
            success: false,
            message: "Error retrieving Draf with id " + req.params.id,
          });
        }
      } else
        res.status(200).send({
          code: 200,
          success: true,
          data: data,
          message: "Draf fetched successfully",
        });
    });
  } catch (error) {
    res
      .status(500)
      .json({ code: 500, success: false, message: "Internal Server Error" });
  }
};

exports.update = async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).send({
        code: 400,
        success: false,
        message: "Content can not be empty!",
      });
    }

    Draf.updateById(req.params.id, new Draf(req.body), (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            code: 404,
            success: false,
            message: `Not found Draf with id ${req.params.id}.`,
          });
        } else {
          res.status(500).send({
            code: 500,
            success: false,
            message: "Error updating Draf with id " + req.params.id,
          });
        }
      } else
        res.status(200).send({
          code: 200,
          success: true,
          data: data,
          message: "Draf updated successfully",
        });
    });
  } catch (error) {
    res
      .status(500)
      .json({ code: 500, success: false, message: "Internal Server Error" });
  }
};

exports.delete = async (req, res) => {
  try {
    Draf.remove(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            code: 404,
            success: false,
            message: `Not found Draf with id ${req.params.id}.`,
          });
        } else {
          res.status(500).send({
            code: 500,
            success: false,
            message: "Could not delete Draf with id " + req.params.id,
          });
        }
      } else
        res.status(200).send({
          code: 200,
          success: true,
          data: data,
          message: "Draf deleted successfully",
        });
    });
  } catch (error) {
    res
      .status(500)
      .json({ code: 500, success: false, message: "Internal Server Error" });
  }
};
