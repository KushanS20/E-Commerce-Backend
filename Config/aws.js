const { S3Client } = require("@aws-sdk/client-s3");
const { Upload } = require("@aws-sdk/lib-storage");

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

/**
 * Uploads a file buffer to S3
 * @param {Buffer} fileBuffer - The file content buffer
 * @param {string} fileName - The key (filename) in the bucket
 * @param {string} mimetype - The content type of the file
 * @returns {Promise<string>} - Returns the uploaded file URL
 */
async function uploadFile({ fileBuffer, fileName, mimetype }) {
  const upload = new Upload({
    client: s3Client,
    params: {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: fileName,
      Body: fileBuffer,
      ContentType: mimetype,
      // ACL: 'public-read',
    },
  });

  const result = await upload.done();
  return result.Location;
}

module.exports = {
  s3Client,
  uploadFile,
};
