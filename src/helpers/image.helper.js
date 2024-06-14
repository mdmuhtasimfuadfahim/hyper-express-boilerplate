const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { v4: uuidv4 } = require('uuid');
const Jimp = require('jimp');
const path = require('path');

const s3Client = new S3Client({
    region: "us-east-1",
    credentials: {
        accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID,
        secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY,
    },
    endpoint: process.env.CLOUDFLARE_R2_ENDPOINT,
});


const readAndResizeImage = async (file) => {
    const image = await Jimp.read(file.buffer);
    return image.resize(400, Jimp.AUTO).getBufferAsync(Jimp.AUTO);
};

const generateUniqueName = (file) => {
    const uniqueName = uuidv4();
    const ext = path.extname(file.originalname);
    return `images/${uniqueName}${ext}`;
};

const uploadImage = async function (file) {
    const buffer = await readAndResizeImage(file);
    const key = generateUniqueName(file);

    const params = {
        Bucket: process.env.CLOUDFLARE_R2_BUCKET,
        Key: key,
        Body: buffer,
        ACL: 'public-read'
    };

    const command = new PutObjectCommand(params);
    await s3Client.send(command);

    return `${process.env.CLOUDFLARE_R2_URL}/${params.Key}`;
};

module.exports = {
    uploadImage,
};