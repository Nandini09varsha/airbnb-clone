import { ChevronDown, Flag } from "lucide-react";
import { useState } from "react";
import { asset, property } from "../data/property";

export default function BookingCard() {
  const { booking } = property;
  const [guests, setGuests] = useState(booking.guestsDefault);
  const [openGuests, setOpenGuests] = useState(false);
  const [openDates, setOpenDates] = useState(false);
  const [claimed, setClaimed] = useState(false);
  const [reserved, setReserved] = useState(false);

  return (
    <aside className="booking-col">
      <div className="booking-sticky">
        <div className="promo">
          <img src={asset("ui/discount.svg")} alt="" />
          <div>
            <strong>Get 10% off your next stay.</strong>
            <div>
              <a href="#terms">Terms apply</a>
            </div>
          </div>
          <button
            type="button"
            className="claim"
            onClick={() => setClaimed(true)}
          >
            {claimed ? "Claimed" : "Claim"}
          </button>
        </div>
        <div className="booking-card" id="reserve">
          <div className="price-row">
            <strong>{booking.total}</strong>
            <span>for {booking.nights} nights</span>
          </div>
          <div className="date-box">
            <div className="date-row">
              <button type="button" onClick={() => setOpenDates((v) => !v)}>
                <div className="lbl">CHECK-IN</div>
                <div>{booking.checkInLabel}</div>
              </button>
              <button type="button" onClick={() => setOpenDates((v) => !v)}>
                <div className="lbl">CHECKOUT</div>
                <div>{booking.checkOutLabel}</div>
              </button>
            </div>
            <button
              type="button"
              className="guest-row"
              onClick={() => setOpenGuests((v) => !v)}
              aria-expanded={openGuests}
            >
              <span>
                <div className="lbl">GUESTS</div>
                <div>
                  {guests} guest{guests > 1 ? "s" : ""}
                </div>
              </span>
              <ChevronDown size={16} />
            </button>
          </div>
          {openDates && (
            <div className="date-popover">
              <Calendar onClear={() => setOpenDates(false)} />
            </div>
          )}
          {openGuests && (
            <div className="guest-menu">
              <div className="stepper">
                <span>Adults</span>
                <div>
                  <button
                    type="button"
                    aria-label="Decrease guests"
                    onClick={() => setGuests((g) => Math.max(1, g - 1))}
                  >
                    –
                  </button>
                  <span style={{ margin: "0 12px" }}>{guests}</span>
                  <button
                    type="button"
                    aria-label="Increase guests"
                    onClick={() =>
                      setGuests((g) => Math.min(property.guests, g + 1))
                    }
                  >
                    +
                  </button>
                </div>
              </div>
              <p style={{ color: "#6a6a6a", fontSize: 13, marginTop: 8 }}>
                {property.guests} guests maximum
              </p>
            </div>
          )}
          <p className="cancel-note">{booking.cancelBefore}</p>
          <button
            type="button"
            className="pill-btn"
            onClick={() => setReserved(true)}
          >
            {reserved ? "Request sent" : "Reserve"}
          </button>
          <p className="charged">You won&apos;t be charged yet</p>
          <a className="report" href="#report">
            <Flag size={14} style={{ marginRight: 8 }} />
            Report this listing
          </a>
        </div>
      </div>
    </aside>
  );
}

export function Calendar({ onClear = () => {} }) {
  const { booking } = property;
  return (
    <section className="block calendar" id="dates">
      <h3>{booking.stayLabel}</h3>
      <p className="sub">{booking.stayDates}</p>
      <div className="months">
        <Month year={2026} month={9} />
        <Month year={2026} month={10} />
      </div>
      <button type="button" className="clear-dates" onClick={onClear}>
        Clear dates
      </button>
    </section>
  );
}

function Month({ year, month }) {
  const name = new Date(year, month, 1).toLocaleString("en-GB", {
    month: "long",
    year: "numeric",
  });
  const firstDow = new Date(year, month, 1).getDay();
  const days = new Date(year, month + 1, 0).getDate();
  const cells = [
    ...Array(firstDow).fill(null),
    ...Array.from({ length: days }, (_, i) => i + 1),
  ];

  function klass(d) {
    if (!d || month !== 9) return "day";
    if (d > 17 && d < 23) return "day in-range";
    if (d === 18) return "day start";
    if (d === 23) return "day end";
    return "day";
  }

  return (
    <div>
      <div className="month-head">
        <span>{name}</span>
      </div>
      <div className="dow">
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
          <span key={i}>{d}</span>
        ))}
      </div>
      <div className="days">
        {cells.map((d, i) => (
          <button key={i} type="button" className={klass(d)} disabled={!d}>
            {d || ""}
          </button>
        ))}
      </div>
    </div>
  );
}
