import React, { useState } from "react";
import { storage } from "@/config/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const metadata = {
    contentType: "image/jpeg",
};

const ImageUpload = () => {
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };
    const handleUpload = () => {
        const storageRef = ref(storage, `images/${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image, metadata);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(progress);
                switch (snapshot.state) {
                    case "paused":
                        console.log("Upload is paused");
                        break;
                    case "running":
                        console.log("Upload is running");
                        break;
                }
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    alert(
                        "Upload image successfully, download URL: " +
                            downloadURL
                    );
                    setImage(null);
                    setProgress(0);
                });
            }
        );
    };
    return (
        <div className="py-10">
            <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
                <div className="mb-4">
                    <input
                        type="file"
                        multiple
                        onChange={handleChange}
                        className="hidden"
                        id="imageInput"
                    />
                    <label
                        htmlFor="imageInput"
                        className="block bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer"
                    >
                        Select Image
                    </label>
                    {image && <p className="mt-2">Selected: {image.name}</p>}
                    {image && (
                        <img
                            src={URL.createObjectURL(image)}
                            alt="Preview"
                            className="mt-2 rounded-lg shadow-md"
                            style={{ maxWidth: "100%", maxHeight: "200px" }}
                        />
                    )}
                </div>
                {progress > 0 && (
                    <progress value={progress} max="100" className="w-full" />
                )}
                {image && (
                    <button
                        onClick={handleUpload}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg"
                    >
                        Upload
                    </button>
                )}
            </div>
        </div>
    );
};
export default ImageUpload;
