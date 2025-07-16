import React, { useState } from "react";
import { FaCopy } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"; // ✅ Import axios

export default function UrlShortenerUI() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleShorten = () => {
    if (!url.trim()) {
      toast.warn("Please enter your long URL", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    axios.post("http://localhost:8000/url/getLongUrl", { longUrl: url })
      .then((response) => {
       setShortUrl (response.data.SortUrl); 
      })
      .catch((err) => {
        console.error(err);
        toast.error("Server error. Please try again later.", {
          position: "top-center",
          autoClose: 3000,
        });
      });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    toast.success("Short URL copied!", {
      position: "bottom-right",
      autoClose: 2000,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-xl">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-2">
          URL Shortener
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Paste your long URL below and shorten it instantly!
        </p>

        <div className="flex flex-col sm:flex-row items-stretch gap-4">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/very/long/url"
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleShorten}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Shorten
          </button>
        </div>

        {shortUrl && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg flex justify-between items-center">
            <a href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 font-semibold hover:underline truncate"
            >
              {shortUrl}
            </a>
            <button
              onClick={handleCopy}
              className="text-blue-600 hover:text-blue-800 ml-4"
              title="Copy to clipboard"
            >
              <FaCopy />
            </button>
          </div>
        )}
      </div>

      {/* Toast Message Container */}
      <ToastContainer />
    </div>
  );
}
