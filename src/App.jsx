import { useState } from "react";
import ListingPage from "./pages/ListingPage";
import PhotoTour from "./pages/PhotoTour";
import Lightbox from "./pages/Lightbox";

function App() {
  const [view, setView] = useState("listing");

  if (view === "photo-tour") {
    return <PhotoTour />;
  }

  if (view === "lightbox") {
    return <Lightbox />;
  }

  return <ListingPage />;
}

export default App;
