'use server';

import {PutObjectCommand, S3Client} from "@aws-sdk/client-s3";
import uniqid from 'uniqid';

export async function uploadToS3(formData:FormData) {
    const file = formData.get('file') as File;
    
    const s3Client = new S3Client({
        region: 'us-east-2',
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY as string,
            secretAccessKey: process.env.AWS_SECRET_KEY as string,
        },
    });

    const fileExtension = file.name.split('.').slice(-1)[0];
    const newFilename = uniqid() + '.' + fileExtension;

    // collect binary data of the image to upload to s3
    // stream file, compile each chunk into chunks arr, then
    // concat into buffer
    const chunks = [];
    // @ts-ignore
    for await (const chunk of file.stream()) { 
        chunks.push(chunk);  
    }

    const buffer = Buffer.concat(chunks);

    const bucket = process.env.AWS_BUCKET as string;
    await s3Client.send(new PutObjectCommand({
        Bucket: bucket,
        Key: newFilename,
        ACL: 'public-read',
        Body: buffer,
        ContentType: file.type,
    }))

    return {
        newFilename,
        fileExtension,
        url: `http://${bucket}.s3.us-east-2.amazonaws.com/${newFilename}`,
    };
} 