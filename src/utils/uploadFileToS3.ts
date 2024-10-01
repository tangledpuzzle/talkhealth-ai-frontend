import {
    S3Client,
    PutObjectCommand,
    DeleteObjectCommand,
} from "@aws-sdk/client-s3";

const s3Client = new S3Client({
    region: process.env.NEXT_PUBLIC_AUTH_AWS_REGION,
    credentials: {
        accessKeyId:process.env.NEXT_PUBLIC_AUTH_AWS_ACCESS_KEY_ID || "",
        secretAccessKey:
            process.env.NEXT_PUBLIC_AUTH_AWS_SECRET_ACCESS_KEY ||
            "",
    },
});

async function uploadFileToS3(file: any, fileName: any) {
    const fileBuffer = file;
    const date = new Date();
    const hour = date.getHours(); 

    const params = {
        Bucket: "pdfimageupload" || "",
        Key: hour+`${fileName}`,
        Body: fileBuffer,
    };
    // console.log(params);

    const command = new PutObjectCommand(params);
    const data = await s3Client.send(command);
    if (data.$metadata.httpStatusCode !== 200) {
        return "";
    }
    // console.log(data," data",command);
    return command.input.Key;
}

async function deleteFromS3(fileName: any) {

    const fileNameToBeDeleted = fileName[0].split("/")[3];
    const params = {
        Bucket: process.env.NEXT_AWS_S3_BUCKET_NAME || "",
        Key: fileNameToBeDeleted,
    };

    const command = new DeleteObjectCommand(params);
    const data = await s3Client.send(command);
    if (data.$metadata.httpStatusCode !== 200) {
        return "";
    }
    return command.input.Key;
}

export { uploadFileToS3, deleteFromS3 };
