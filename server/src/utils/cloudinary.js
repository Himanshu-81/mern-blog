import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { ApiError } from "./apiError.js";

cloudinary.config({
  cloud_name: "dyqzxyi5x",
  api_key: "884517964684874",
  api_secret: "YlREzsMNTdTTnUBDmEG1Q6_zveQ",
});

const uploadOnCloudinary = async (localFilePath, folder) => {
  try {
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder: `${folder}`,
    });

    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    return null;
  }
};

const deleteFromCloudinary = async (localFilePath, folder) => {
  try {
    if (!localFilePath) return null;

    const publicIdWithExtension = localFilePath.substring(
      localFilePath.lastIndexOf("/") + 1
    );

    const publicId = publicIdWithExtension.substring(
      0,
      publicIdWithExtension.lastIndexOf(".")
    );

    const response = await cloudinary.uploader.destroy(`${folder}/${publicId}`);
    return response;
  } catch (error) {
    throw new ApiError(400, "Error in deleting old avatar from cloudinary");
  }
};

export { uploadOnCloudinary, deleteFromCloudinary };
