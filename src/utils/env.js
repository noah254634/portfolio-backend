import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const ENV = () => {
  const mongo_uri = process.env.MONGO_URI;
  const port = process.env.PORT || 5000;
  const cloudinary_cloud_name = process.env.CLOUDINARY_CLOUD_NAME;
  const cloudinary_api_key = process.env.CLOUDINARY_API_KEY;
  const cloudinary_url = process.env.CLOUDINARY_URL;
  const cloudinary_api_secret = process.env.CLOUDINARY_API_SECRET;
  const jwt_secret=process.env.JWT_SECRET;
  const node_env=process.env.NODE_ENV;
  const arcjet_api_key=process.env.ARC_JET_API_KEY;

  return {
    mongo_uri,
    port,
    cloudinary_cloud_name,
    cloudinary_api_key,
    cloudinary_url,
    cloudinary_api_secret,
    jwt_secret,
    node_env,
    arcjet_api_key,
  };
};
export default ENV;
