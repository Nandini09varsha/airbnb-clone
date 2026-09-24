import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { photos } from "../data/property";
import { useOverlay } from "../hooks/useOverlay";

export default function Lightbox({ index, onClose, onPrev, onNext }) {
  const ref = useRef(null);
  const photo = photos[index];

  useOverlay({ active: true, onClose, containerRef: ref });

  useEffect(() => {
    function onKey(e) {
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onPrev, onNext]);

  if (!photo) return null;

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label="Photo viewer" ref={ref}>
      <div className="lb-top">
        <button type="button" className="round" aria-label="Close" onClick={onClose}>
          <X />
        </button>
      </div>
      <div className="lb-stage">
        <button
          type="button"
          className="nav-arrow"
          aria-label="Previous"
          onClick={onPrev}
          disabled={index === 0}
        >
          <ChevronLeft />
        </button>
        <img src={photo.src} alt={photo.alt} />
        <button
          type="button"
          className="nav-arrow"
          aria-label="Next"
          onClick={onNext}
          disabled={index === photos.length - 1}
        >
          <ChevronRight />
        </button>
      </div>
      <div className="lb-count">
        {index + 1} / {photos.length}
      </div>
    </div>
  );
}
