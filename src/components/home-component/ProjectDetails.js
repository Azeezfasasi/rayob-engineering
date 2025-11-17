"use client";

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

export default function ProjectDetails({ projectId }) {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [popupImg, setPopupImg] = useState(null);
  const [popupIndex, setPopupIndex] = useState(null);
  const sliderRef = useRef(null);

  useEffect(() => {
    async function fetchProject() {
      setLoading(true);
      try {
        const res = await fetch(`/api/project/${projectId}`);
        const data = await res.json();
        setProject(data.project || null);
      } catch (err) {
        setProject(null);
      }
      setLoading(false);
    }
    if (projectId) fetchProject();
  }, [projectId]);

  // Drag logic for gallery slider using refs
  const dragStartXRef = useRef(null);
  const scrollStartRef = useRef(null);
  const isDraggingRef = useRef(false);
  function onSliderDown(e) {
    dragStartXRef.current = e.touches ? e.touches[0].clientX : e.clientX;
    scrollStartRef.current = sliderRef.current.scrollLeft;
    isDraggingRef.current = true;
  }
  function onSliderMove(e) {
    if (!isDraggingRef.current) return;
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    sliderRef.current.scrollLeft = scrollStartRef.current - (x - dragStartXRef.current);
  }
  function onSliderUp() {
    isDraggingRef.current = false;
  }

  if (loading) return <div className="py-20 text-center text-gray-500">Loading project...</div>;
  if (!project) return <div className="py-20 text-center text-gray-500">Project not found.</div>;

  return (
    <section className="py-10">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">{project.projectName}</h1>
        <span className="text-sm text-blue-500 font-semibold uppercase mb-2 block">{project.category}</span>
        <div className="relative w-full h-80 mb-6">
          <Image
            src={project.featuredImage}
            alt={`Featured image for ${project.projectName}`}
            fill
            loading="eager"
            sizes="(max-width: 768px) 100vw, 700px"
            className="object-cover rounded-lg"
          />
        </div>

        {/* Gallery images */}
        {project.galleryImages && project.galleryImages.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-2">Gallery</h2>
            {/* Draggable Slider */}
            <div className="relative w-full mb-4">
              <div
                ref={sliderRef}
                className="flex overflow-x-auto gap-4 pb-2 scrollbar-thin scrollbar-thumb-gray-300 cursor-grab active:cursor-grabbing select-none"
                onMouseDown={onSliderDown}
                onMouseMove={onSliderMove}
                onMouseUp={onSliderUp}
                onMouseLeave={onSliderUp}
                onTouchStart={onSliderDown}
                onTouchMove={onSliderMove}
                onTouchEnd={onSliderUp}
                onDragStart={e => e.preventDefault()}
              >
                {project.galleryImages.map((img, i) => (
                  <div key={img + i} className="relative min-w-[200px] h-48 cursor-pointer select-none" onClick={() => setPopupIndex(i)}>
                    <Image
                      src={img}
                      alt={`Gallery image ${i + 1} for ${project.projectName}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 350px"
                      className="object-cover rounded transition-transform duration-200 hover:scale-105 select-none"
                      draggable={false}
                      unoptimized
                    />
                  </div>
                ))}
              </div>
            </div>
            {/* Dots navigation */}
            <div className="flex justify-center gap-2 mb-2">
              {project.galleryImages.map((img, i) => (
                <span key={img + 'dot' + i} className="w-2 h-2 rounded-full bg-gray-300 inline-block" />
              ))}
            </div>
          </div>
        )}
        {/* Popup for image slider */}
        {popupIndex !== null && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-2" onClick={() => setPopupIndex(null)}>
            <div className="bg-white rounded-lg p-4 max-w-xl w-full relative flex flex-col items-center" onClick={e => e.stopPropagation()}>
              <button className="absolute top-0 right-2 hover:text-gray-900 text-[45px] text-red-500" onClick={() => setPopupIndex(null)}>&times;</button>
              {/* Slider navigation */}
              <div className="relative w-full h-80 sm:h-96 flex items-center justify-center">
                <button
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow text-2xl"
                  onClick={() => {
                    if (typeof popupIndex === 'number') {
                      setPopupIndex(popupIndex === 0 ? project.galleryImages.length - 1 : popupIndex - 1);
                    }
                  }}
                  aria-label="Previous image"
                >
                  &#8592;
                </button>
                <Image
                  src={project.galleryImages[popupIndex]}
                  alt={`Gallery image ${popupIndex + 1} for ${project.projectName}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 600px"
                  className="object-contain rounded"
                  unoptimized
                />
                <button
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow text-2xl"
                  onClick={() => setPopupIndex(i => (i === project.galleryImages.length - 1 ? 0 : i + 1))}
                  aria-label="Next image"
                >
                  &#8594;
                </button>
              </div>
              {/* Mobile-friendly dots navigation */}
              <div className="flex justify-center gap-2 mt-4">
                {project.galleryImages.map((img, i) => (
                  <button
                    key={img + 'popup-dot' + i}
                    className={`w-3 h-3 rounded-full border ${i === popupIndex ? 'bg-blue-500 border-blue-500' : 'bg-gray-200 border-gray-300'}`}
                    onClick={() => setPopupIndex(i)}
                    aria-label={`Go to image ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Project Details */}
        <p className="text-gray-600 mb-4"><span className='font-bold'>Project Name:</span> {project.projectName}</p>
        <p className="text-gray-600 mb-4"><span className='font-bold'>Client Name:</span> {project.clientName}</p>
        <p className="text-gray-600 mb-4"><span className='font-bold'>Start Date:</span> {project.startDate}</p>
        <p className="text-gray-600 mb-4"><span className='font-bold'>Expected End Date:</span> {project.expectedEndDate}</p>
        <p className="text-gray-600 mb-4"><span className='font-bold'>Completion:</span> {project.completion}</p>
        <p className="text-gray-600 mb-4"><span className='font-bold'>Project Status:</span> {project.projectStatus}</p>
        <p className="text-gray-600 mb-4"><span className='font-bold'>Team Lead:</span> {project.teamLead}</p>
        <p className="text-gray-600 mb-4"><span className='font-bold'>Team Members:</span> {project.teamMembers}</p>
        <p className="text-gray-600 mb-4"><span className='font-bold'>Technologies:</span> {project.technologies}</p>
        <p className="text-gray-600 mb-4"><span className='font-bold'>Materials Used:</span> {project.materialsUsed}</p>
        <p className="text-gray-600 mb-4"><span className='font-bold'>Project Highlights:</span> {project.projectHighlights}</p>
        <p className="text-gray-600 mb-4"><span className='font-bold'>Project Highlights:</span> {project.projectHighlights}</p>
        <p className="text-gray-600 mb-4"><span className='font-bold'>Location:</span> {project.location}</p>
        <p className="text-gray-600 mb-4"><span className='font-bold'>Project Description:</span> {project.projectDescription}</p>
      </div>
    </section>
  );
}
