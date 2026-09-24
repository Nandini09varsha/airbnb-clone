import { useCallback, useEffect, useState } from "react";
import ListingPage from "./pages/ListingPage";
import PhotoTour from "./pages/PhotoTour";
import Lightbox from "./pages/Lightbox";
import { photos } from "./data/property";

function App() {
  const [view, setView] = useState("listing");
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [tourCategory, setTourCategory] = useState(null);
  const [saved, setSaved] = useState(false);
  const [toast, setToast] = useState("");

  const share = useCallback(async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setToast("Link copied");
    } catch {
      setToast("Share this listing");
    }
    setTimeout(() => setToast(""), 1800);
  }, []);

  const openTour = useCallback((category = null) => {
    setTourCategory(category);
    setView("photo-tour");
  }, []);

  const openPhotoFromListing = useCallback((index) => {
    const category = photos[index]?.category ?? null;
    setTourCategory(category);
    setLightboxIndex(index);
    setView("lightbox");
  }, []);

  const closeLightbox = useCallback(() => {
    setView("photo-tour");
  }, []);

  const closeTour = useCallback(() => {
    setView("listing");
  }, []);

  const onPrev = useCallback(() => {
    setLightboxIndex((i) => Math.max(0, i - 1));
  }, []);

  const onNext = useCallback(() => {
    setLightboxIndex((i) => Math.min(photos.length - 1, i + 1));
  }, []);

  return (
    <>
      <ListingPage
        onShowAllPhotos={() => openTour(null)}
        onOpenPhoto={openPhotoFromListing}
        saved={saved}
        onSave={() => setSaved((s) => !s)}
        onShare={share}
      />
      {view !== "listing" && (
        <PhotoTour
          onClose={closeTour}
          onOpenLightbox={(i) => {
            setLightboxIndex(i);
            setView("lightbox");
          }}
          saved={saved}
          onSave={() => setSaved((s) => !s)}
          onShare={share}
          initialCategory={tourCategory}
          captureKeys={view === "photo-tour"}
        />
      )}
      {view === "lightbox" && (
        <Lightbox index={lightboxIndex} onClose={closeLightbox} onPrev={onPrev} onNext={onNext} />
      )}
      {toast && (
        <div className="toast" role="status">
          {toast}
        </div>
      )}
    </>
  );
}

export default App;
