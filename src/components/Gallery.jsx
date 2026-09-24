import { Grid2x2 } from "lucide-react";
import { photos, heroPhotoIndexes, property } from "../data/property";

export default function Gallery({ onShowAll }) {
  const hero = heroPhotoIndexes.map((i) => photos[i]);

  return (
    <section className="gallery" aria-label="Photos of this place">
      {hero.slice(0, 1).map((p) => (
        <button
          key={p.index}
          type="button"
          className="photo-btn"
          aria-label={p.alt}
          onClick={onShowAll}
        >
          <img src={p.src} alt="" />
        </button>
      ))}
      <div className="gallery-right">
        {hero.slice(1).map((p) => (
          <button
            key={p.index}
            type="button"
            className="photo-btn"
            aria-label={p.alt}
            onClick={onShowAll}
          >
            <img src={p.src} alt="" />
          </button>
        ))}
      </div>
      <button type="button" className="show-all" onClick={onShowAll}>
        <Grid2x2 size={16} />
        Show all photos
      </button>
    </section>
  );
}

export function TitleRow({ saved, onSave, onShare }) {
  return (
    <div className="title-row">
      <h1>{property.title}</h1>
      <div className="title-actions">
        <button type="button" className="ghost" onClick={onShare}>
          <ShareIcon />
          Share
        </button>
        <button type="button" className="ghost" onClick={onSave}>
          <HeartIcon saved={saved} />
          Save
        </button>
      </div>
    </div>
  );
}

export function ShareIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 32 32" aria-hidden="true">
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        d="M27 18v9a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-9M16 3v23M8 10l8-8 8 8"
      />
    </svg>
  );
}

export function HeartIcon({ saved }) {
  return (
    <svg
      className={saved ? "heart saved" : "heart"}
      width="16"
      height="16"
      viewBox="0 0 32 32"
      aria-hidden="true"
    >
      <path
        fill={saved ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
        d="M16 28c7-4.7 14-10 14-17a6.9 6.9 0 0 0-7-7c-1.8 0-3.4.8-4.5 2.1L16 9.1l-2.5-3A6.5 6.5 0 0 0 9 4a7 7 0 0 0-7 7c0 7 7 12.3 14 17z"
      />
    </svg>
  );
}
