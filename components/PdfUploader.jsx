import React, { useState } from 'react';
import axios from 'axios';
import { API_URL_2 } from '../pages/api/upload';
import LoadingProgressBar from './LoadingProgressBar';
import Button from '@material-tailwind/react/components/Button';
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";

const PdfUploader = () => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const [loading, setLoading] = useState(false);

  const handleFileUpload = async () => {
    try {
      if (!file) {
        alert("Please choose a file to upload.");
        return;
      }
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(API_URL_2 + "/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percentCompleted);
        },
      });

      if (response.data.status === "success") {
        alert("File indexed.");
      } else {
        alert(response.data.message);
      }
      console.log("File upload response:", response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file.");
    }
  };

  return (
    <div className="flex flex-col items-center">
      
<label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload file</label>
<input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        id="file_input" 
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        />
      {/* <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
      /> */}
      <Button
        variant="gradient"
        className="flex items-center gap-3 mt-2"
        onClick={handleFileUpload}
      >
        <CloudArrowUpIcon strokeWidth={2} className="h-5 w-5" />
        Upload File
      </Button>
      <div className="w-full mt-4">
        <LoadingProgressBar progress={progress} />
      </div>
    </div>
  );
};

export default PdfUploader;
