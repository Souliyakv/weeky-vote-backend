import cloudinary from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

//  upload image to cloud ອັບຮູບພາບລົງໄປເກັບໃນ cloud

const UploadImage = async (imgURL, oldImg) => {
    try {
      if (!imgURL) return "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png";
      
      if (oldImg) {
        const spliturl = oldImg.split("/");
        const img_id = spliturl[spliturl.length - 1].split(".")[0];
        await cloudinary.uploader.destroy(img_id);
      }
      const res_upload = await cloudinary.uploader.upload(imgURL, null, {
        public_id: `${Date.now()}`,
        resource_type: "auto",
      });
      return res_upload.url;
    } catch (err) {
      console.log(err)
      return "";
    }
  };
  
  export default UploadImage;
  