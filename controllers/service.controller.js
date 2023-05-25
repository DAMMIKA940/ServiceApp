const Service = require("../models/service.model");

exports.create = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const service = new Service({
    title: req.body.title,
  });

  Service.create(service, (err, data) => {
    if (err)
      res.status(500).send({
        code: 500,
        success: false,
        message:
          err.message || "Some error occurred while creating the Service.",
      });
    else res.send(data);
  });
};

exports.findAll = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json({
      code: 200,
      success: true,
      users: services,
      message: "Services fetched successfully",
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.findOne = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    res.status(200).json({
      code: 200,
      success: true,
      users: service,
      message: "Service fetched successfully",
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.update = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
      },
      { new: true }
    );
    res.status(200).json({
      code: 200,
      success: true,
      users: service,
      message: "Service updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    res.status(200).json({
      code: 200,
      success: true,
      users: service,
      message: "Service deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      success: false,
      message: "Internal Server Error",
    });
  }
};
