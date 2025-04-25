import { DownloadCloud } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const ATS = () => {
    const [countdown, setCountdown] = useState(null);
    const [downloaded, setDownloaded] = useState(false);
    const downloadRef = useRef(null);

    useEffect(() => {
        if (countdown === null || countdown === 0) return;

        const timer = setTimeout(() => {
            setCountdown(prev => prev - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [countdown]);

    useEffect(() => {
        if (countdown === 0) {
            const link = document.createElement("a");
            link.href = "src/public/ATS_Resume.pdf";
            link.download = "ATS.pdf";
            link.click();
            setCountdown(null);
            setDownloaded(true);
        }
    }, [countdown]);

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
                <button
                    className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition hidden sm:block sm:mt-4"
                    onClick={() => {
                        setCountdown(3);
                        setDownloaded(false);
                    }}
                >
                    Click to Download PDF
                </button>
                </div>

                  {/* only for mobile  */}
                <a
                    href="src/public/ATS_Resume.pdf"
                    download="ATS_Resume.pdf"
                    ref={downloadRef}
                    className="inline-flex items-center justify-center bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition sm:hidden"
                    
                > Click to Download PDF</a>

                {countdown !== null && (
                    <div className="mt-4 text-indigo-700 font-medium text-lg">
                        Downloading in {countdown}...
                    </div>
                )}

                {downloaded && (
                    <div className="mt-4 text-green-600 font-medium text-sm">
                        ✅ Download started!
                    </div>
                )}
            </div>
        </div>
    );
};

export default ATS;
