import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Search, Plus, BookOpen, X } from "lucide-react";

export default function Browse() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [myComics, setMyComics] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedType, setSelectedType] = useState("all");

  // Fetch user's comics on mount
  useEffect(() => {
    fetchMyComics();
  }, []);

  const fetchMyComics = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/comics");
      const data = await res.json();
      setMyComics(data);
    } catch (error) {
      console.error("Error fetching comics:", error);
      setMyComics([]);
    } finally {
      setIsLoading(false);
    }
  };

  const searchComics = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      setIsSearching(true);
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Error searching comics:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const addToMyList = async (comic) => {
    try {
      const res = await fetch("/api/comics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(comic),
      });
      
      if (res.ok) {
        await fetchMyComics();
        setShowSearchModal(false);
        setSearchTerm("");
        setSearchResults([]);
      } else {
        const error = await res.json();
        alert(error.error || "Failed to add comic");
      }
    } catch (error) {
      console.error("Error adding comic:", error);
      alert("Failed to add comic");
    }
  };

  // Filter user's comics
  const filteredComics = myComics.filter((comic) => {
    const matchesStatus = selectedStatus === "all" || comic.status === selectedStatus;
    const matchesType = selectedType === "all" || comic.type === selectedType;
    return matchesStatus && matchesType;
  });

  return (
    <div className="min-h-screen p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-fuchsia-400 to-purple-300 bg-clip-text text-transparent mb-2">
            My Comics
          </h1>
          <p className="text-purple-300/70">Your tracked manga, manwha, and manhua</p>
        </div>

        {/* Filters and Add Button */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex gap-3 flex-1">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 h-12 bg-slate-900/50 backdrop-blur border border-purple-800/50 rounded-xl text-sm font-medium focus:outline-none focus:border-purple-600 text-purple-200"
            >
              <option value="all">All Types</option>
              <option value="manga">Manga</option>
              <option value="manwha">Manwha</option>
              <option value="manhua">Manhua</option>
              <option value="comic">Comic</option>
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 h-12 bg-slate-900/50 backdrop-blur border border-purple-800/50 rounded-xl text-sm font-medium focus:outline-none focus:border-purple-600 text-purple-200"
            >
              <option value="all">All Status</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
              <option value="hiatus">Hiatus</option>
            </select>
          </div>

          <button
            onClick={() => setShowSearchModal(true)}
            className="h-12 px-6 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 text-white shadow-lg shadow-purple-500/30 rounded-xl font-medium flex items-center justify-center gap-2 transition-all"
          >
            <Plus className="w-5 h-5" />
            Add Comic
          </button>
        </div>

        {/* Comic Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-purple-900/20 rounded-2xl h-80" />
              </div>
            ))}
          </div>
        ) : filteredComics.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 bg-purple-900/20 rounded-full flex items-center justify-center mb-6">
              <BookOpen className="w-10 h-10 text-purple-400" />
            </div>
            <h3 className="text-2xl font-bold text-purple-200 mb-2">No comics yet</h3>
            <p className="text-purple-300/70 mb-6">Start building your collection</p>
            <button
              onClick={() => setShowSearchModal(true)}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 text-white shadow-lg shadow-purple-500/30 rounded-xl font-medium flex items-center gap-2 transition-all"
            >
              <Plus className="w-5 h-5" />
              Add Your First Comic
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredComics.map((comic) => (
              <div
                key={comic.id}
                onClick={() => router.push(`/comic/${comic.id}`)}
                className="group cursor-pointer bg-slate-900/30 backdrop-blur rounded-2xl overflow-hidden border border-purple-900/30 hover:border-purple-600/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20"
              >
                <div className="aspect-[3/4] bg-gradient-to-br from-purple-900/40 to-fuchsia-900/40 relative overflow-hidden">
                  {comic.cover_image ? (
                    <img 
                      src={comic.cover_image} 
                      alt={comic.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <BookOpen className="w-16 h-16 text-purple-400/30" />
                    </div>
                  )}
                  {comic.type && (
                    <div className="absolute top-3 right-3 px-3 py-1 bg-purple-600/90 backdrop-blur rounded-full text-xs font-semibold text-white">
                      {comic.type}
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg text-purple-100 mb-1 line-clamp-2 group-hover:text-purple-300 transition-colors">
                    {comic.title}
                  </h3>
                  {comic.author && (
                    <p className="text-sm text-purple-300/70 mb-2">{comic.author}</p>
                  )}
                  {comic.status && (
                    <span className="inline-block px-2 py-1 bg-purple-900/40 text-purple-300 text-xs rounded-md">
                      {comic.status}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Search Modal */}
      {showSearchModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-purple-900/50 rounded-2xl w-full max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="p-6 border-b border-purple-900/30">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-purple-200">Search Comics</h2>
                <button
                  onClick={() => {
                    setShowSearchModal(false);
                    setSearchTerm("");
                    setSearchResults([]);
                  }}
                  className="p-2 hover:bg-purple-900/30 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-purple-300" />
                </button>
              </div>
              
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
                <input
                  placeholder="Search ComicK database..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    searchComics(e.target.value);
                  }}
                  className="w-full pl-12 h-12 bg-slate-900/50 backdrop-blur border border-purple-800/50 focus:border-purple-600 rounded-xl text-purple-100 placeholder:text-purple-400/50 outline-none"
                  autoFocus
                />
              </div>
            </div>

            {/* Search Results */}
            <div className="flex-1 overflow-y-auto p-6">
              {isSearching ? (
                <div className="text-center py-12 text-purple-300">Searching...</div>
              ) : searchResults.length === 0 ? (
                <div className="text-center py-12 text-purple-300/70">
                  {searchTerm ? "No results found" : "Type to search comics"}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {searchResults.map((comic) => (
                    <div
                      key={comic.id}
                      className="flex gap-4 p-4 bg-slate-900/30 rounded-xl border border-purple-900/30 hover:border-purple-600/50 transition-all"
                    >
                      <div className="w-24 h-32 flex-shrink-0 bg-purple-900/20 rounded-lg overflow-hidden">
                        {comic.cover_image ? (
                          <img src={comic.cover_image} alt={comic.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <BookOpen className="w-8 h-8 text-purple-400/30" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-purple-100 mb-1 line-clamp-2">{comic.title}</h3>
                        <p className="text-sm text-purple-300/70 mb-3">{comic.author}</p>
                        <button
                          onClick={() => addToMyList(comic)}
                          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded-lg transition-colors"
                        >
                          Add to List
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}