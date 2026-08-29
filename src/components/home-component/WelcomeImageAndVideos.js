"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, X, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

// Cloudinary can generate a still-frame JPG thumbnail from a video by simply
// swapping its file extension and keeping the /video/upload/ delivery path.
function getVideoThumbnail(url) {
  if (!url) return "";
  return url.replace("/upload/", "/upload/so_0/").replace(/\.[^./]+(\?.*)?$/, ".jpg$1");
}

const TABS = [
  { key: "all", label: "All" },
  { key: "image", label: "Photos" },
  { key: "video", label: "Videos" },
];

export default function WelcomeImageAndVideos() {
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    async function fetchGalleries() {
      setLoading(true);
      try {
        const res = await fetch("/api/gallery?status=active&limit=100");
        const data = await res.json();
        setGalleries(Array.isArray(data.galleries) ? data.galleries : []);
      } catch (err) {
        setGalleries([]);
      } finally {
        setLoading(false);
      }
    }
    fetchGalleries();
  }, []);

  const mediaItems = useMemo(() => {
    const items = [];
    galleries.forEach((gallery) => {
      const meta = {
        title: gallery.title,
        category: gallery.category,
        href: `/gallery/${gallery._id}`,
      };
      (gallery.images || []).forEach((img) => {
        items.push({ type: "image", src: img.url, ...meta });
      });
      (gallery.videos || []).forEach((video) => {
        items.push({ type: "video", src: video.url, thumb: getVideoThumbnail(video.url), ...meta });
      });
    });
    return items;
  }, [galleries]);

  const counts = useMemo(
    () => ({
      all: mediaItems.length,
      image: mediaItems.filter((i) => i.type === "image").length,
      video: mediaItems.filter((i) => i.type === "video").length,
    }),
    [mediaItems]
  );

  const filteredItems = useMemo(() => {
    const filtered = activeTab === "all" ? mediaItems : mediaItems.filter((item) => item.type === activeTab);
    return filtered.slice(0, 12);
  }, [mediaItems, activeTab]);

  useEffect(() => {
    setLightboxIndex(null);
  }, [activeTab]);

  function showPrev(e) {
    e.stopPropagation();
    setLightboxIndex((i) => (i === 0 ? filteredItems.length - 1 : i - 1));
  }

  function showNext(e) {
    e.stopPropagation();
    setLightboxIndex((i) => (i === filteredItems.length - 1 ? 0 : i + 1));
  }

  const activeItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  if (loading) {
    return (
      <section className="bg-white py-16">
        <div className="container mx-auto px-6 lg:px-20 flex items-center justify-center min-h-96">
          <Loader2 className="w-8 h-8 animate-spin text-blue-900" />
        </div>
      </section>
    );
  }

  if (mediaItems.length === 0) {
    return null;
  }

  return (
    <section className="relative bg-gradient-to-b from-white via-slate-50 to-white py-16 md:py-20 overflow-hidden">
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-sky-100 rounded-full blur-3xl opacity-60 pointer-events-none" />

      <div className="relative container mx-auto px-6 lg:px-20">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-blue-900 bg-blue-100 px-4 py-1.5 rounded-full mb-4">
            Our Work in Motion
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">See Our Projects Come to Life</h2>
          <p className="text-gray-600">
            Real photos and videos from our gallery, showcasing engineering work across the country.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all border cursor-pointer ${
                activeTab === tab.key
                  ? "bg-blue-900 text-white border-blue-900 shadow-md"
                  : "bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-900"
              }`}
            >
              {tab.label}{" "}
              <span className={activeTab === tab.key ? "text-blue-200" : "text-gray-400"}>
                ({counts[tab.key] || 0})
              </span>
            </button>
          ))}
        </div>

        {/* Media grid */}
        {filteredItems.length === 0 ? (
          <p className="text-center text-gray-500 py-10">No media available for this category yet.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {filteredItems.map((item, idx) => (
              <button
                key={`${item.type}-${item.src}-${idx}`}
                type="button"
                onClick={() => setLightboxIndex(idx)}
                className="group relative aspect-square rounded-2xl overflow-hidden shadow-sm border border-gray-200 bg-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-left cursor-pointer"
              >
                <Image
                  src={item.type === "video" ? item.thumb : item.src}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  unoptimized={item.type === "video"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {item.type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 text-blue-900 ml-0.5" fill="currentColor" />
                    </span>
                  </div>
                )}

                {item.category && (
                  <div className="absolute top-2 left-2">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full bg-blue-900/85 text-white">
                      {item.category}
                    </span>
                  </div>
                )}

                <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                  <p className="text-white text-xs font-semibold truncate">{item.title}</p>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 bg-blue-900 text-white px-8 py-3 rounded-lg shadow hover:bg-blue-800 transition"
          >
            Explore Full Gallery
          </Link>
        </div>
      </div>

      {/* Lightbox */}
      {activeItem && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center px-4 py-8"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-4 right-4 md:top-6 md:right-6 bg-white/10 hover:bg-white/20 text-white w-11 h-11 rounded-full flex items-center justify-center transition cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {filteredItems.length > 1 && (
            <button
              onClick={showPrev}
              className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white w-11 h-11 rounded-full flex items-center justify-center transition z-10 cursor-pointer"
              aria-label="Previous"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <div className="relative w-full h-[60vh] md:h-[70vh] rounded-2xl overflow-hidden bg-black flex items-center justify-center">
              {activeItem.type === "video" ? (
                <video key={activeItem.src} src={activeItem.src} controls autoPlay className="w-full h-full object-contain" />
              ) : (
                <Image src={activeItem.src} alt={activeItem.title} fill sizes="90vw" unoptimized className="object-contain" />
              )}
            </div>
            <div className="mt-4 text-center">
              <p className="text-white font-semibold">{activeItem.title}</p>
              {activeItem.category && <p className="text-gray-300 text-sm capitalize">{activeItem.category}</p>}
            </div>
          </div>

          {filteredItems.length > 1 && (
            <button
              onClick={showNext}
              className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white w-11 h-11 rounded-full flex items-center justify-center transition z-10 cursor-pointer"
              aria-label="Next"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </div>
      )}
    </section>
  );
}
