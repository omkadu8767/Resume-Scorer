import { Github, Linkedin, Twitter } from 'lucide-react';
import React from 'react';

function Footer() {
  return (
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto py-4 px-6 flex items-center justify-between lg:px-8">
        {/* Left side: Copyright */}
        <div className="text-base font-medium text-gray-600" style={{ color: '#443CCC' }}>
          &copy; 2025 ResumeScorer. All rights reserved.
        </div>

        {/* Center: Powered by Gemini */}
        <div
          className="text-base font-semibold text-center"
          style={{ color: '#443CCC', fontFamily: 'Poppins, sans-serif' }}
        >
          Made Using Gemini 2.0 Flash<br />
          Developed By <a href='https://www.linkedin.com/in/om-kadu-53305425a/'>Om Kadu</a>
        </div>

        {/* Right side: Social Media Icons */}
        <div className="flex space-x-6">
          <a href="https://x.com/OmKadu79824376" target="_blank" className="hover:text-gray-500" style={{ color: '#443CCC' }}>
            <Twitter className="h-6 w-6" />
          </a>
          <a href="https://github.com/omkadu8767" target="_blank" className="hover:text-gray-500" style={{ color: '#443CCC' }}>
            <Github className="h-6 w-6" />
          </a>
          <a href="https://www.linkedin.com/in/om-kadu-53305425a/" target="_blank" className="hover:text-gray-500" style={{ color: '#443CCC' }}>
            <Linkedin className="h-6 w-6" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
