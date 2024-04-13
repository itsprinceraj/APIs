const File = require("../models/fileModel");
const cloudinary = require("cloudinary").v2;

// write Bussiness Logic for file Upload
exports.localUpload = async (req, res) => {
  try {
    // fetch file from request file
    const file = req.files.file;
    console.log(file);

    // define server path
    let path =
      __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`; // __dirname defined the current durectory where you are;
    console.log(path);

    // move file on defined path
    file.mv(path, (err) => {
      console.log(err);
    });

    res.status(200).json({
      success: true,
      message: "File Uploaded SuccessFully ",
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      success: false,
      message: "Unable to upload file",
    });
  }
};

// defining function for validation (to check that image is supported or not)

function isFileSupported(type, supportedFormat) {
  return supportedFormat.includes(type);
}

// function for uploading file to cloudinary
const uploadToCloudinary = async (file, folder, /*height, width,*/ quality) => {
  // define options
  const options = {
    folder,
    // height: height,
    // width: width,
    crop: "fill",
    quality: quality,
    resource_type: "auto", // detect automatically which kind of file you are sending
  };

  // if (quality) {
  //   options.quality = quality;
  // }

  console.log("tempfilePath", file.tempFilePath);
  return await cloudinary.uploader.upload(file.tempFilePath, options);
};

// For Image upload on cloudinary

exports.imageUpload = async (req, res) => {
  try {
    // fetch data from req body
    const { name, tags, email } = req.body;
    console.log(name, tags, email);

    // fetch data from file
    const file = req.files.imageFile;
    console.log(file);

    // define validation , if the image extension type is supported or not
    const supportedFormat = ["jpg", "jpeg", "png"];
    const fileType = file.name.split(".")[1].toLowerCase();

    // do validation
    if (!isFileSupported(fileType, supportedFormat)) {
      return res.status(400).json({
        success: false,
        message: "image format not supported",
      });
    }

    // if file format matched  then upload file to cloudinary and create database entry
    const response = await uploadToCloudinary(file, "mediaFiles");
    console.log(response);

    // create entry to db
    const fileData = await File.create({
      name,
      email,
      tags,
      imageUrl: response.secure_url,
    });

    // send response with success flag
    res.status(200).json({
      success: true,
      data: fileData,
      message: "File uploaded successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Something Went wrong",
    });
  }
};

// for Video upload on cloudinary

exports.videoUpload = async (req, res) => {
  try {
    // fetch data from req.body
    const { name, tags, email } = req.body;

    // fetch file
    const file = req.files.videoFile;
    console.log(file);

    //  define validation
    const supportedFormat = ["mp4", "mov"];
    const fileType = file.name.split(".")[1].toLowerCase();

    // validation kar lo bhaiya
    if (!isFileSupported(fileType, supportedFormat)) {
      return res.status(400).json({
        success: false,
        message: "video format not supported",
      });
    }

    // file format supported
    // then upload it to cloudinary and create database entry
    const response = await uploadToCloudinary(file, "mediaFiles", 20);

    // creating database entry
    const videoFileData = await File.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    });
    // send response with success flag
    res.status(200).json({
      success: true,
      data: videoFileData,
      message: "video uploaded successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Something Went wrong",
    });
  }
};

// for imageReducer upload on cloudinary

exports.imageReducer = async (req, res) => {
  try {
    // fetch data from req body
    const { name, tags, email } = req.body;
    console.log(name, tags, email);

    // fetch data from file
    const file = req.files.reducedImage;
    console.log(file);

    // define validation , if the image extension type is supported or not
    const supportedFormat = ["jpg", "jpeg", "png"];
    const fileType = file.name.split(".")[1].toLowerCase();

    // do validation
    if (!isFileSupported(fileType, supportedFormat)) {
      return res.status(400).json({
        success: false,
        message: "image format not supported",
      });
    }

    // if file format matched  then upload file to cloudinary and create database entry
    const response = await uploadToCloudinary(file, "mediaFiles", 300, 200);
    //here third parameter depicts that , imageSize and Quality is reduced by 50%
    console.log(response);

    // create entry to db
    const fileData = await File.create({
      name,
      email,
      tags,
      imageUrl: response.secure_url,
    });

    // send response with success flag
    res.status(200).json({
      success: true,
      data: fileData,
      message: "File uploaded successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Something Went wrong",
    });
  }
};
