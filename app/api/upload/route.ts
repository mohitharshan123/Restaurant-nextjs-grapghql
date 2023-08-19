import mongoose from 'mongoose'
import { NextRequest, NextResponse } from 'next/server'
import { Readable } from 'stream';

export const storeFile = async (upload: { filename: string, createReadStream: any, mimetype: string }) => {
    const { filename, createReadStream, mimetype } = await upload;
    const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, { bucketName: 'files' });
    const uploadStream = bucket.openUploadStream(filename, {
        contentType: mimetype
    });
    return new Promise((resolve, reject) => {
        createReadStream()
            .pipe(uploadStream)
            .on('error', reject)
            .on('finish', () => {
                resolve(uploadStream.id)
            })
    })
}

export async function POST(request: NextRequest) {
    const data = await request.formData()
    const file: any = data.get('file')
    if (!file) {
        return NextResponse.json({ success: false })
    }
    const { name: filename, type: mimetype } = file;
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const createReadStream = () => Readable.from(buffer);
    const fileId = await storeFile({ filename, createReadStream, mimetype });
    return NextResponse.json({ fileId })
}