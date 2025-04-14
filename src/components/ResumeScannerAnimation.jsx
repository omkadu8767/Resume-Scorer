import React, { useEffect, useState } from 'react';

const mockResumes = [
    "Analyzing Resume: Om Kadu.pdf",
    "Analyzing Resume: Jay Joshi.docx",
    "Analyzing Resume: Vedant Dhepe.pdf",
    "Evaluating Skills & Experience...",
    "Matching with: React Developer Role",
    "Generating Recommendations...",
    "Score: 84/100 – Strong Fit",
];

export default function ResumeScannerAnimation() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % mockResumes.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="mt-10 lg:mt-0 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 flex items-center justify-center">
            <div className="w-[90%] max-w-md bg-white rounded-xl shadow-lg p-6 border border-gray-200 animate-pulse">
                <div className="flex flex-col items-center space-y-4 text-center">
                    <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center">
                        <svg className="w-8 h-8 text-indigo-600 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                    </div>
                    <p className="text-lg font-medium text-gray-700">{mockResumes[currentIndex]}</p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div className="bg-indigo-600 h-2 rounded-full transition-all duration-1000 ease-in-out" style={{ width: `${(currentIndex + 1) * 14}%` }} />
                    </div>
                    <p className="text-sm text-gray-400 mt-1">AI-Powered Resume Analyzer in action</p>
                </div>
            </div>
        </div>
    );
}
