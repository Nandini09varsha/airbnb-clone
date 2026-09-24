import { ChevronLeft } from "lucide-react";
import { useEffect, useMemo, useRef } from "react";
import { HeartIcon, ShareIcon } from "../components/Gallery";
import { photoCategories, photos } from "../data/property";
import { useOverlay } from "../hooks/useOverlay";

function chunkPhotos(list) {
  if (list.length === 1) return [{ type: "wide", items: list }];
  if (list.length === 2) return [{ type: "pair", items: list }];
  const rows = [];
  let i = 0;
  while (i < list.length) {
    rows.push({ type: "wide", items: [list[i]] });
    i += 1;
    if (i < list.length) {
      rows.push({ type: "pair", items: list.slice(i, i + 2) });
      i += 2;
    }
  }
  return rows;
}

const categoryDetails = {
  "living-1": ["Sofa · Air conditioning · Ceiling fan · TV"],
  "living-2": ["Ceiling fan · Hot tub"],
  kitchen: ["Kitchen"],
  bedroom: ["Bedroom"],
  bathroom: ["Bathroom"],
  gym: ["Gym"],
  exterior: ["Exterior"],
  pool: ["Pool"],
};

export default function PhotoTour({
  onClose,
  onOpenLightbox,
  saved,
  onSave,
  onShare,
  initialCategory,
  captureKeys = true,
}) {
  const ref = useRef(null);
  useOverlay({ active: captureKeys, onClose, containerRef: ref });

  useEffect(() => {
    if (!initialCategory) return;
    document
      .getElementById(`room-${initialCategory}`)
      ?.scrollIntoView({ behavior: "instant", block: "start" });
  }, [initialCategory]);

  const grouped = useMemo(
    () =>
      photoCategories.map((cat) => ({
        ...cat,
        photos: photos.filter((p) => p.category === cat.id),
      })),
    [],
  );

  return (
    <div
      className="overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="tour-title"
      ref={ref}
    >
      <div className="tour-bar">
        <button
          type="button"
          className="round"
          aria-label="Back"
          onClick={onClose}
        >
          <ChevronLeft />
        </button>
        <h1 className="tour-title">Photo Tour</h1>
        <div>
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
      <nav className="cats" aria-label="Photo categories">
        {grouped.map((cat) => (
          <button
            type="button"
            className={`cat ${initialCategory === cat.id ? "active" : ""}`}
            key={cat.id}
            onClick={() =>
              document
                .getElementById(`room-${cat.id}`)
                ?.scrollIntoView({ behavior: "smooth", block: "start" })
            }
          >
            <img src={cat.cover} alt="" />
            <span>{cat.label}</span>
          </button>
        ))}
      </nav>
      <div className="tour-body">
        {grouped.map((cat) => (
          <section className="room-section" key={cat.id} id={`room-${cat.id}`}>
            <div className="room-copy">
              <h2 className="room-title">{cat.label}</h2>
              {categoryDetails[cat.id]?.map((detail) => (
                <p key={detail}>{detail}</p>
              ))}
            </div>
            <div className="mosaic">
              {chunkPhotos(cat.photos).map((row) =>
                row.type === "wide" ? (
                  <button
                    key={row.items[0].index}
                    type="button"
                    className="wide"
                    aria-label={row.items[0].alt}
                    onClick={() => onOpenLightbox(row.items[0].index)}
                  >
                    <img src={row.items[0].src} alt="" />
                  </button>
                ) : (
                  row.items.map((p) => (
                    <button
                      key={p.index}
                      type="button"
                      aria-label={p.alt}
                      onClick={() => onOpenLightbox(p.index)}
                    >
                      <img src={p.src} alt="" />
                    </button>
                  ))
                ),
              )}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
