
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { BUCKET_NAME } from "../../upload/route";

type Params = {
    params: { id: string };
};

export async function GET(req: Request, { params }: Params) {
    await mongoose.connect(process.env.DATABASE_URL ?? "")
    const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, { bucketName: BUCKET_NAME });
    const _id = params.id as string;

    if (!_id) {
        return new NextResponse(null, { status: 400, statusText: "Bad Request" });
    }
    const files = await bucket.find({ _id: new mongoose.mongo.ObjectId(_id) }).toArray();
    if (!files.length) {
        return new NextResponse(null, { status: 404, statusText: "Not found" });
    }

    const file = files.at(0)!;
    const stream = bucket.openDownloadStream(file._id) as unknown as ReadableStream;
    return new NextResponse(stream, {
        headers: {
            "Content-Type": file.contentType!,
        },
    });
}
