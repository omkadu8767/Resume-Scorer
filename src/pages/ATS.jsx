import { DownloadCloud } from "lucide-react";
import React from "react";

const ATS = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] bg-gray-100 px-4">
            <div className="bg-white shadow-lg rounded-2xl p-10 max-w-md w-full text-center border">
                <DownloadCloud className="h-12 w-12 text-indigo-600 mx-auto mb-4" />

                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    ATS Resume Download
                </h2>
                <p className="text-gray-600 mb-6">
                    Download your ATS-optimized resumes instantly with just one click.
                </p>

                <div className="flex justify-center items-center">
                    <a href="https://drive.google.com/file/d/1EaqTvAdTS6YpMQj6rsNCDbVAFzuxb2q9/view?usp=sharing" target="_blank"><button
                        className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition hidden sm:block sm:mt-4"
                    >
                        Click to Download PDF
                    </button></a>
                </div>

                {/* only for mobile  */}
                <a
                    href="https://drive.google.com/file/d/1EaqTvAdTS6YpMQj6rsNCDbVAFzuxb2q9/view?usp=sharing"
                    target="_blank"
                    className="inline-flex items-center justify-center bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition sm:hidden"

                > Click to Download PDF</a>

            </div>
        </div>
    );
};

export default ATS;



