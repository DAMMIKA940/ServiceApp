const Service = require("../models/service.model");
const cloudinary = require("../lib/cloudinary");
const image = null;

exports.create = async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }
    let result;
    if (req.file) {
      result = await cloudinary.uploader.upload(req.file.path, {
        folder: "service_App_Pictures",
      });
    }

    const service = new Service({
      serviceType: req.body.serviceType,
      serviceName: req.body.serviceName,
      image: result?.secure_url || image,
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
  } catch (error) {
    res
      .status(500)
      .json({ code: 500, success: false, message: "Internal Server Error" });
  }
};

exports.findAll = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json({
      code: 200,
      success: true,
      services: services,
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
      services: service,
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

exports.update = async function (req, res) {
  try {
    let service = await Service.findById(req.params.id);
    let result;

    if (req.file) {
      result = await cloudinary.uploader.upload(req.file.path, {
        folder: "service_App_Pictures",
      });
    }

    const data = {
      serviceType: req.body.serviceType || service.serviceType,
      serviceName: req.body.serviceName || service.serviceName,
      image: result?.secure_url || service.image,
    };

    service = await Service.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });
    res.status(200).json({
      code: 200,
      success: true,
      data: service,
      message: "Service Updated Successfully!",
    });
  } catch (err) {
    res
      .status(500)
      .json({ code: 500, success: false, message: "Internal Server Error" });
  }
};

exports.delete = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    res.status(200).json({
      code: 200,
      success: true,
      services: service,
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


exports.getbyServiceType = async (req, res) => {
  try {
    console.log("asdfsf",req.params.serviceType);
    const service = await Service.find({ serviceType: req.params.type });
    res.status(200).json({
      code: 200,
      success: true,
      services: service,
      message: "Service fetched successfully",
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      success: false,
      message: "Internal Server Error",
    });
  }
}