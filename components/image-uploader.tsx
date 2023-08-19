"use client";

import axios from "axios";
import React, { FormEvent, useRef, useState } from "react";

const ImageUploader = ({ setUploadedFileId }) => {
    const [file, setFile] = useState<File>()

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!file) return

        try {
            const data = new FormData()
            data.set('file', file, file.name)

            const res = await axios.post('/api/upload', data)
            console.log(res.data?.fileId)

            setUploadedFileId(res.data?.fileId)
            if (!res.data) throw new Error("An error occurred")
        } catch (e: any) {
            // Handle errors herep
            console.error(e)
        }
    };
    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="file" name="files" onChange={(e) => setFile(e.target.files?.[0])}
                />
                <button
                    type="submit"
                    onClick={handleSubmit}
                    className="px-2 py-1 rounded-md bg-violet-50 text-violet-500"
                >
                    Upload
                </button>
            </form>
        </>
    );
};

export default ImageUploader;
