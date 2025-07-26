import React, { useEffect, useState } from "react";
import { FiCopy, FiExternalLink, FiTrash2 } from "react-icons/fi";

const Dashboard = () => {
  const [search, setSearch] = useState("");
  const [copiedId, setCopiedId] = useState(null);
  const [rows, setRows] = useState(() => {
    // চাইলে localStorage থেকে লোড করতে পারো
    // const saved = localStorage.getItem("urls");
    // return saved ? JSON.parse(saved) : demoData;
    return demoData;
  });

  // localStorage persist করতে চাইলে আনকমেন্ট করো
  // useEffect(() => {
  //   localStorage.setItem("urls", JSON.stringify(rows));
  // }, [rows]);

  const filtered = rows.filter(
    (r) =>
      r.pageName.toLowerCase().includes(search.toLowerCase()) ||
      r.longUrl.toLowerCase().includes(search.toLowerCase()) ||
      r.shortUrl.toLowerCase().includes(search.toLowerCase())
  );

  const copyToClipboard = async (text, id) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1500);
    } catch (e) {
      alert("Failed to copy!");
    }
  };

  const deleteRow = (id) => {
    setRows((prev) => prev.filter((r) => r.id !== id));
  };

  const faviconFromUrl = (url) => {
    try {
      const u = new URL(url);
      return `https://www.google.com/s2/favicons?sz=64&domain_url=${u.origin}`;
    } catch {
      return "";
    }
  };

  return (
    <div className="min-h-screen bg-white text-black p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

        {/* Search */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by page name, long/short url..."
            className="w-full md:w-96 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white shadow-md rounded-xl">
          <table className="min-w-full text-left">
          <thead className="border-b bg-gray-50">
              <tr>
                <th className="py-3 px-4 text-sm font-semibold">#</th>
                <th className="py-3 px-4 text-sm font-semibold">Page Name</th>
                <th className="py-3 px-4 text-sm font-semibold">Icon</th>
                <th className="py-3 px-4 text-sm font-semibold">Long URL</th>
                <th className="py-3 px-4 text-sm font-semibold">Short URL</th>
                <th className="py-3 px-4 text-sm font-semibold">Visits</th>
                <th className="py-3 px-4 text-sm font-semibold">Created</th>
                <th className="py-3 px-4 text-sm font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="8" className="py-6 text-center text-gray-500">
                    No data found.
                  </td>
                </tr>
              ) : (
                filtered.map((row, idx) => (
                  <tr key={row.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm">{idx + 1}</td>
                    <td className="py-3 px-4 text-sm font-medium">{row.pageName}</td>
                    <td className="py-3 px-4">
                      {row.longUrl && (
                        <img
                          src={faviconFromUrl(row.longUrl)}
                          alt="icon"
                          className="w-5 h-5"
                        />
                      )}
                    </td>
                    <td className="py-3 px-4 text-sm max-w-xs truncate">
                      <a
                        href={row.longUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-600"
                        title={row.longUrl}
                      >
                        {row.longUrl}
                      </a>
                    </td>
                    <td className="py-3 px-4 text-sm">
                      <span className="font-mono">{row.shortUrl}</span>
                    </td>
                    <td className="py-3 px-4 text-sm">
                      <span className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-semibold rounded-full bg-gray-200">
                        {row.visits}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm">{row.createdAt}</td>
                    <td className="py-3 px-4 text-sm">
                      <div className="flex items-center justify-end gap-3">
                        <button
                          onClick={() => copyToClipboard(row.shortUrl, row.id)}
                          className="p-2 rounded hover:bg-blue-100"
                          title="Copy short URL"
                        >
                          <FiCopy
                            className={
                              copiedId === row.id ? "text-blue-600" : "text-black"
                            }
                          />
                        </button>
                        <a
                          href={row.longUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded hover:bg-blue-100"
                          title="Open long URL"
                        >
                          <FiExternalLink />
                        </a>
                        <button
                          onClick={() => deleteRow(row.id)}
                          className="p-2 rounded hover:bg-blue-100"
                          title="Delete"
                        >
                          <FiTrash2 className="text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// demo data
const demoData = [
  {
    id: 1,
    pageName: "Home CTA",
    longUrl: "https://example.com/very/long/url/that/you/shortened",
    shortUrl: "https://sort.url/abc123",
    visits: 120,
    createdAt: "2025-07-20",
  },
  {
    id: 2,
    pageName: "Campaign A",
    longUrl: "https://google.com",
    shortUrl: "https://sort.url/goog1",
    visits: 45,
    createdAt: "2025-07-22",
  },
];

export default Dashboard;
