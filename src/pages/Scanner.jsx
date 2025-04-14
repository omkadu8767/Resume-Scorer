import { GoogleGenerativeAI } from '@google/generative-ai';
import { Loader, Upload } from 'lucide-react';
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

function Scanner() {
  const [file, setFile] = useState(null);
  const [jobRequirements, setJobRequirements] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const onDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'text/plain': ['.txt'],
      'image/*': ['.jpg', '.jpeg', '.png']
    },
    maxFiles: 1
  });

  const parseResultText = (text) => {
    const match = text.match(/(?<=match score.*?)(\d{1,3})/i);
    const techStackMatch = text.match(/technology stack match.*?(\d{1,3})%/i);
    const highlights = text.match(/highlights and achievements\s*[:\-]?\s*([\s\S]*?)(?:strengths|areas for improvement|$)/i);
    const strengths = text.match(/strengths\s*[:\-]?\s*([\s\S]*?)(?:areas for improvement|recommendations|$)/i);
    const improvements = text.match(/areas for improvement\s*[:\-]?\s*([\s\S]*?)(?:recommendations|$)/i);
    const recommendations = text.match(/recommendations\s*[:\-]?\s*([\s\S]*)/i);

    return {
      matchScore: match ? match[1] : 'N/A',
      stackMatch: techStackMatch ? `${techStackMatch[1]}%` : 'N/A',
      highlights: highlights ? highlights[1].trim().split('\n') : [],
      strengths: strengths ? strengths[1].trim().split('\n') : [],
      improvements: improvements ? improvements[1].trim().split('\n') : [],
      recommendation: recommendations ? recommendations[1].trim() : 'No specific recommendations.'
    };
  };

  const analyzeResume = async () => {
    if (!file || !jobRequirements) {
      alert('Please upload a resume and enter job requirements');
      return;
    }

    setLoading(true);

    try {
      const text = await file.text();

      const genAI = new GoogleGenerativeAI(apiKey || import.meta.env.VITE_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

      const prompt = `
        Analyze this resume against the following job requirements: ${jobRequirements}
        
        Resume content:
        ${text}
        
        Please provide a detailed analysis including:
        1. Overall match score (0-100)
        2. Technology stack match percentage
        3. Key technologies identified
        4. Experience level assessment
        5. Key highlights and achievements
        6. Strengths
        7. Areas for improvement
        8. Specific recommendations
        
        Format the response in a clear, structured way.
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const analysisText = response.text();

      const parsed = parseResultText(analysisText);

      setResults({
        raw: analysisText,
        ...parsed
      });
    } catch (error) {
      console.error('Error analyzing resume:', error);
      alert('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const InsightSection = ({ title, icon, color, items, isParagraph = false }) => {
    return (
      <div className={`p-5 bg-${color}-50 border-l-4 border-${color}-400 rounded-lg shadow`}>
        <h3 className={`text-lg font-semibold text-${color}-700`}>{icon} {title}</h3>
        {isParagraph ? (
          <p className="text-sm text-gray-800 mt-2 whitespace-pre-line">{items}</p>
        ) : (
          <ul className="list-disc list-inside text-sm text-gray-800 mt-2 space-y-1">
            {items.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        )}
      </div>
    );
  };


  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Resume Scorer</h1>
        <p className="mt-2 text-gray-600">AI-powered resume analysis for finding the perfect candidate</p>
      </div>

      <div className="space-y-6">
        {/* Upload Resume */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Upload Resume</h2>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
              ${isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-500'}`}
          >
            <input {...getInputProps()} />
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">Drag and drop a file here, or click to select</p>
            <p className="mt-1 text-xs text-gray-500">Supports PDF, text, and image files</p>
          </div>
          {file && (
            <p className="mt-2 text-sm text-gray-600">Selected file: {file.name}</p>
          )}
        </div>

        {/* Job Requirements */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Job Requirements / Tech Stack</h2>
          <textarea
            value={jobRequirements}
            onChange={(e) => setJobRequirements(e.target.value)}
            placeholder="e.g., MERN stack, Docker, AWS, GitHub Actions"
            className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* API Key */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Gemini API Key (optional)</h2>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your Gemini API key (optional)"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <p className="mt-2 text-xs text-gray-500">
            You can use your own key from Google AI Studio. A default one is used otherwise.
          </p>
        </div>

        {/* Analyze Button */}
        <button
          onClick={analyzeResume}
          disabled={loading || !file || !jobRequirements}
          className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <Loader className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
              Analyzing Resume...
            </span>
          ) : (
            'Analyze Resume'
          )}
        </button>

        {/* Analysis Results */}
        {results && (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">📊 Analysis Results</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-gray-50 border-l-4 border-green-500 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-green-700">🎯 Overall Match Score</h3>
                <p className="text-3xl font-bold text-green-600 mt-2">{results.matchScore} / 100</p>
                <p className="text-sm text-gray-600 mt-1">Job Match for: <span className="font-medium text-indigo-600">{jobRequirements}</span></p>
              </div>

              <div className="p-4 bg-purple-50 border-l-4 border-purple-500 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-purple-700">🧠 Tech Stack Match</h3>
                <p className="text-2xl text-purple-600 mt-2">{results.stackMatch}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">

              <InsightSection
                title="Key Highlights"
                icon="🌟"
                color="yellow"
                items={results.highlights}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InsightSection
                  title="Strengths"
                  icon="✅"
                  color="green"
                  items={results.strengths}
                />
                <InsightSection
                  title="Areas for Improvement"
                  icon="⚠️"
                  color="red"
                  items={results.improvements}
                />
              </div>

              <InsightSection
                title="Recommendations"
                icon="📌"
                color="indigo"
                items={results.recommendation}
                isParagraph={true}
              />

            </div>

          </div>
        )}
      </div>
    </div>
  );
}

export default Scanner;
