import {
  AirVent,
  Camera,
  ChevronLeft,
  ChevronRight,
  KeyRound,
  Minus,
  Plus,
  Search,
  Sparkles,
  Star,
  Waves,
  Wifi,
  Utensils,
  Briefcase,
  ParkingCircle,
  PawPrint,
  Siren,
  Bath,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import Header from "../components/Header";
import Gallery, { TitleRow } from "../components/Gallery";
import BookingCard, { Calendar } from "../components/BookingCard";
import { amenityCount, asset, property } from "../data/property";
import { useOverlay } from "../hooks/useOverlay";

const amenityIcons = {
  Kitchen: Utensils,
  Wifi: Wifi,
  "Dedicated workspace": Briefcase,
  "Free parking on premises": ParkingCircle,
  Pool: Waves,
  "Hot tub": Bath,
  "Pets allowed": PawPrint,
  "Exterior security cameras on property": Camera,
  "Carbon monoxide alarm": Siren,
  "Smoke alarm": Siren,
};

export default function ListingPage({
  onShowAllPhotos,
  onOpenPhoto,
  saved,
  onSave,
  onShare,
}) {
  const [descOpen, setDescOpen] = useState(false);
  const [amenitiesOpen, setAmenitiesOpen] = useState(false);
  const [reviewsOpen, setReviewsOpen] = useState(false);
  const [navVisible, setNavVisible] = useState(false);
  const [similarPage, setSimilarPage] = useState(0);
  const photosRef = useRef(null);

  useEffect(() => {
    document.title = property.pageTitle;
    function onScroll() {
      setNavVisible(window.scrollY > 520);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <nav className={`section-nav ${navVisible ? "visible" : ""}`} aria-label="Listing sections">
        <div className="section-nav-inner">
          <div>
            <a href="#photos">Photos</a>
            <a href="#amenities">Amenities</a>
            <a href="#reviews">Reviews</a>
            <a href="#location">Location</a>
          </div>
          <div className="reserve-mini">
            <div>
              <div className="price">{property.booking.total} for {property.booking.nights} nights</div>
              <div>
                <Star size={12} fill="currentColor" /> {property.rating} · {property.reviewCount} reviews
              </div>
            </div>
            <a className="pill-btn" href="#reserve">
              Reserve
            </a>
          </div>
        </div>
      </nav>
      <main id="main">
        <div className="page-wrap" id="photos" ref={photosRef}>
          <TitleRow saved={saved} onSave={onSave} onShare={onShare} />
          <Gallery onShowAll={onShowAllPhotos} onOpenPhoto={onOpenPhoto} />
          <div className="listing-grid">
            <div>
              <section className="summary">
                <h2>{property.locationLine}</h2>
                <p className="meta">
                  {property.guests} guests · {property.bedrooms} bedroom · {property.beds} bed ·{" "}
                  {property.bathrooms} bathroom
                </p>
                <div className="fav-row">
                  <div className="fav-left">
                    <div className="laurel">
                      <img src={asset("ui/laurel-left.png")} alt="" />
                      <span>
                        Guest
                        <br />
                        favourite
                      </span>
                      <img src={asset("ui/laurel-right.png")} alt="" />
                    </div>
                    <p style={{ maxWidth: 260, fontSize: 14 }}>
                      One of the most loved homes on Airbnb, according to guests
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: 24, fontWeight: 600 }}>
                    <div>
                      {property.rating}
                      <div style={{ fontSize: 12, textDecoration: "underline" }}>
                        {property.reviewCount} Reviews
                      </div>
                    </div>
                  </div>
                </div>
                <div className="host-mini">
                  <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                    <img src={property.host.avatar} alt="" />
                    <div>
                      <h3>Hosted by {property.host.name}</h3>
                      <p>{property.host.years} years hosting</p>
                    </div>
                  </div>
                </div>
                <div className="highlights">
                  {property.highlights.map((h) => (
                    <div className="highlight" key={h.title}>
                      {h.title.includes("Outdoor") && <Waves size={24} />}
                      {h.title.includes("cool") && <AirVent size={24} />}
                      {h.title.includes("check-in") && <KeyRound size={24} />}
                      <div>
                        <h3>{h.title}</h3>
                        <p>{h.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="translated">
                  Some info has been automatically translated.{" "}
                  <a href="#original">Show original</a>
                </p>
                <p className="description">
                  {descOpen ? property.description : `${property.description.slice(0, 220)}…`}
                </p>
                <button type="button" className="show-more" onClick={() => setDescOpen((v) => !v)}>
                  {descOpen ? "Show less" : "Show more"}
                </button>
              </section>

              <section className="block">
                <h2>Where you&apos;ll sleep</h2>
                <div className="sleep-cards">
                  {property.sleep.map((s) => (
                    <button
                      type="button"
                      className="sleep-card"
                      key={s.title}
                      onClick={onShowAllPhotos}
                    >
                      <img src={s.image} alt="" />
                      <div>
                        <h3>{s.title}</h3>
                        <p>{s.detail}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </section>

              <section className="block" id="amenities">
                <h2>What this place offers</h2>
                <div className="amenity-grid">
                  {property.previewAmenities.map((a) => {
                    const Icon = amenityIcons[a.label] || Sparkles;
                    return (
                      <div className="amenity-item" key={a.id}>
                        <Icon size={24} />
                        {a.label}
                      </div>
                    );
                  })}
                </div>
                <button
                  type="button"
                  className="outline-btn"
                  onClick={() => setAmenitiesOpen(true)}
                >
                  Show all {amenityCount} amenities
                </button>
              </section>

              <Calendar />
            </div>
            <BookingCard />
          </div>

          <ReviewsSection onShowAll={() => setReviewsOpen(true)} />
          <LocationSection />
          <HostSection />
          <ThingsToKnow />
          <SimilarStays page={similarPage} setPage={setSimilarPage} />
        </div>
      </main>
      <footer className="footer">
        <div className="footer-inner">
          <span>© 2026 Airbnb, Inc. · Privacy · Terms · Sitemap</span>
          <span>English (IN) · INR</span>
        </div>
      </footer>
      {amenitiesOpen && (
        <AmenitiesModal onClose={() => setAmenitiesOpen(false)} />
      )}
      {reviewsOpen && <ReviewsModal onClose={() => setReviewsOpen(false)} />}
    </div>
  );
}

function ReviewsSection({ onShowAll }) {
  const [openId, setOpenId] = useState(null);
  return (
    <section className="block" id="reviews">
      <div className="reviews-hero">
        <div className="laurel-lg">
          <img src={asset("ui/laurel-left.png")} alt="" />
          <span>{property.rating}</span>
          <img src={asset("ui/laurel-right.png")} alt="" />
        </div>
        <h2 style={{ margin: 0 }}>Guest favourite</h2>
        <p style={{ color: "#6a6a6a", maxWidth: 360, textAlign: "center" }}>
          This home is a guest favourite based on ratings, reviews and reliability
        </p>
        <button type="button" className="show-more" onClick={onShowAll}>
          How reviews work
        </button>
      </div>
      <div className="rating-grid">
        <div className="rating-col">
          <div className="stat-label">Overall rating</div>
          <div className="bars">
            {property.overallBars.map((v, i) => (
              <div className="bar-row" key={i}>
                <span>{5 - i}</span>
                <div className="bar">
                  <span style={{ width: `${v * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        {property.ratings.map((r) => (
          <div className="rating-col" key={r.label}>
            <div className="stat-label">{r.label}</div>
            <div className="stat-value">{r.value.toFixed(1)}</div>
          </div>
        ))}
      </div>
      <div className="chips">
        {property.mentionChips.map((c) => (
          <button type="button" className="chip" key={c.label} aria-label={`${c.label} ${c.count}`}>
            <img src={c.image} alt="" />
            {c.label} {c.count}
          </button>
        ))}
      </div>
      <div className="review-grid">
        {property.reviews.map((r, i) => (
          <article key={r.name + i}>
            <div className="review-head">
              {r.avatar ? (
                <img className="avatar" src={r.avatar} alt="" />
              ) : (
                <div className="avatar">{r.initial}</div>
              )}
              <div>
                <h3>{r.name}</h3>
                <p>{r.tenure}</p>
              </div>
            </div>
            <div className="review-meta">· {r.date}</div>
            <p className={`review-text ${openId === i ? "open" : ""}`}>{r.text}</p>
            {r.text.length > 180 && (
              <button type="button" className="show-more" onClick={() => setOpenId(openId === i ? null : i)}>
                Show more
              </button>
            )}
          </article>
        ))}
      </div>
      <button type="button" className="outline-btn" onClick={onShowAll}>
        Show all {property.reviewCount} reviews
      </button>
    </section>
  );
}

function LocationSection() {
  const [zoom, setZoom] = useState(14);
  const src = useMemo(
    () =>
      `https://staticmap.openstreetmap.de/staticmap.php?center=${property.map.lat},${property.map.lng}&zoom=${zoom}&size=1120x480&maptype=mapnik`,
    [zoom],
  );
  return (
    <section className="block" id="location">
      <h2>Where you’ll be</h2>
      <p style={{ marginBottom: 16 }}>{property.location}</p>
      <div className="map-wrap">
        <img className="map" src={src} alt={`Map of ${property.location}`} />
        <div className="pin" aria-hidden="true">
          <HomePin />
        </div>
        <div className="map-tools">
          <button type="button" aria-label="Search">
            <Search size={16} />
          </button>
          <button type="button" aria-label="Zoom in" onClick={() => setZoom((z) => Math.min(18, z + 1))}>
            <Plus size={16} />
          </button>
          <button type="button" aria-label="Zoom out" onClick={() => setZoom((z) => Math.max(10, z - 1))}>
            <Minus size={16} />
          </button>
        </div>
      </div>
      <p style={{ marginTop: 16, color: "#6a6a6a" }}>Exact location will be provided after booking.</p>
      <h3 style={{ marginTop: 24, fontSize: 16 }}>Neighbourhood highlights</h3>
      <p style={{ marginTop: 8 }}>{property.neighbourhood}</p>
      <button type="button" className="show-more">
        Show more
      </button>
    </section>
  );
}

function HomePin() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 10.5 12 3l9 7.5V21a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-10.5z" />
    </svg>
  );
}

function HostSection() {
  return (
    <section className="block" id="host">
      <h2>Meet your host</h2>
      <div className="host-card">
        <div className="host-stats">
          <img src={property.host.avatar} alt="" />
          <h3 style={{ marginTop: 12 }}>{property.host.name}</h3>
          <p>Host</p>
          <div className="host-metrics">
            <div>
              <strong>{property.host.reviews.toLocaleString()}</strong>
              Reviews
            </div>
            <div>
              <strong>{property.host.hostRating}★</strong>
              Rating
            </div>
            <div>
              <strong>{property.host.years}</strong>
              Years hosting
            </div>
          </div>
        </div>
        <div>
          <p>{property.host.born}</p>
          <p style={{ marginTop: 8 }}>{property.host.bioSchool}</p>
          <h3 style={{ margin: "20px 0 8px" }}>Co-Hosts</h3>
          <div className="cohosts">
            {property.cohosts.map((c) => (
              <div className="cohost" key={c.name}>
                {c.avatar ? (
                  <img className="avatar" src={c.avatar} alt="" />
                ) : (
                  <div className="avatar">{c.initial}</div>
                )}
                {c.name}
              </div>
            ))}
          </div>
          <h3 style={{ margin: "20px 0 8px" }}>Host details</h3>
          <p>Response rate: {property.host.responseRate}</p>
          <p>{property.host.responseTime}</p>
          <button type="button" className="outline-btn">
            Message host
          </button>
          <p style={{ fontSize: 12, color: "#6a6a6a", marginTop: 16 }}>
            To help protect your payment, always use Airbnb to send money and communicate with hosts.
          </p>
        </div>
      </div>
    </section>
  );
}

function ThingsToKnow() {
  return (
    <section className="block">
      <h2>Things to know</h2>
      <div className="things">
        <div>
          <h3>Cancellation policy</h3>
          <p>Free cancellation before 17 October. Cancel before check-in on 18 October for a partial refund.</p>
          <p>Review this host’s full policy for details.</p>
          <a href="#policy">Learn more</a>
        </div>
        <div>
          <h3>House rules</h3>
          <p>Check-in after 2:00 pm</p>
          <p>Checkout before 11:00 am</p>
          <p>3 guests maximum</p>
          <a href="#rules">Learn more</a>
        </div>
        <div>
          <h3>Safety & property</h3>
          <p>Carbon monoxide alarm not reported</p>
          <p>Smoke alarm not reported</p>
          <p>Exterior security cameras on property</p>
          <a href="#safety">Learn more</a>
        </div>
      </div>
    </section>
  );
}

function SimilarStays({ page, setPage }) {
  const start = page * 6;
  const items = property.similar.slice(start, start + 6);
  return (
    <section className="block" style={{ borderBottom: "none" }}>
      <div className="similar-head">
        <h2>More stays nearby</h2>
        <div>
          <span style={{ marginRight: 12 }}>
            {page + 1} / 2
          </span>
          <button
            type="button"
            className="round"
            aria-label="Previous"
            disabled={page === 0}
            onClick={() => setPage(0)}
          >
            <ChevronLeft />
          </button>
          <button
            type="button"
            className="round"
            aria-label="Next"
            disabled={page === 1}
            onClick={() => setPage(1)}
          >
            <ChevronRight />
          </button>
        </div>
      </div>
      <div className="similar-row">
        {items.map((s) => (
          <article className="similar-card" key={s.title}>
            <img src={s.image} alt="" />
            <h3>{s.title}</h3>
            <p>
              {s.price} · ★ {s.rating}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

function AmenitiesModal({ onClose }) {
  const ref = useRef(null);
  useOverlay({ active: true, onClose, containerRef: ref });
  return (
    <div className="modal-back" onClick={onClose}>
      <div
        className="modal amenity-full"
        role="dialog"
        aria-modal="true"
        aria-labelledby="amenity-title"
        ref={ref}
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="round" aria-label="Close" onClick={onClose}>
          <X size={18} />
        </button>
        <h2 id="amenity-title">What this place offers</h2>
        {property.amenityGroups.map((g) => (
          <div key={g.title}>
            <h3>{g.title}</h3>
            <ul>
              {g.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReviewsModal({ onClose }) {
  const ref = useRef(null);
  useOverlay({ active: true, onClose, containerRef: ref });
  return (
    <div className="modal-back" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="reviews-title"
        ref={ref}
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="round" aria-label="Close" onClick={onClose}>
          <X size={18} />
        </button>
        <h2 id="reviews-title">{property.reviewCount} reviews</h2>
        <p style={{ marginBottom: 16 }}>
          Guest favourite based on ratings, reviews and reliability.
        </p>
        {property.reviews.map((r) => (
          <article key={r.name} style={{ marginBottom: 24 }}>
            <h3>{r.name}</h3>
            <p className="review-meta">
              {r.tenure} · {r.date}
            </p>
            <p>{r.text}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
