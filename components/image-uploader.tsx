"use client";

import axios from "axios";
import React, { FormEvent, useRef, useState } from "react";

const ImageUploader = () => {
    const [file, setFile] = useState<File>()
    const ref = useRef<HTMLInputElement>(null);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!file) return

        try {
            const data = new FormData()
            data.set('file', file, file.name)

            const res = await fetch('/api/upload', {
                method: 'POST',
                body: data
            })
            // handle the error
            if (!res.ok) throw new Error(await res.text())
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
