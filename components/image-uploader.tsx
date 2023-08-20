import { Button } from "@material-tailwind/react";
import axios from "axios";
import React, { FormEvent, useRef } from "react";

interface ImageUploaderProps {
    setUploadedFileId: React.Dispatch<React.SetStateAction<string>>;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ setUploadedFileId }) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (file: File | null) => {
        if (!file) return;

        try {
            const data = new FormData();
            data.set("file", file, file.name);
            const res = await axios.post<{ fileId: string }>("/api/upload", data);
            setUploadedFileId(res.data.fileId);
            if (!res.data) throw new Error("An error occurred");
        } catch (e: any) {
            console.error(e);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files) {
            handleSubmit(e.target.files[0]);
        }
    };

    return (
        <form onSubmit={(e: FormEvent) => e.preventDefault()}>
            <input
                ref={inputRef}
                type="file"
                name="files"
                onChange={handleFileChange}
                className="hidden"
            />
            <Button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="rounded-xl"
            >
                Upload image
            </Button>
        </form>
    );
};

export default ImageUploader;
