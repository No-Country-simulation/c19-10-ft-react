const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "posts",
    format: async (req, file) => {
      const extension = file.originalname.split(".").pop().toLowerCase();
      const allowedFormats = ["jpg", "jpeg", "png", "gif", "webp"];
      return allowedFormats.includes(extension) ? extension : "png";
    },
    public_id: (req, file) => file.originalname.split(".")[0],
    transformation: [
      {
        quality: "auto:best",
        fetch_format: "auto",
        width: 600,
        height: 600,
        crop: "limit",
      },
    ],
  },
});

const parser = multer({ storage: storage });

module.exports = parser;
