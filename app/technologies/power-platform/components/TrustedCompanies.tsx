"use client";
import { useRef } from "react";

const COMPANIES = [
  { name: "Google",             img: "google.png"               },
  { name: "Microsoft",          img: "ms.png"                   },
  { name: "Adobe",              img: "adobe.png"                },
  { name: "Dell",               img: "dell.png"                 },
  { name: "HP",                 img: "hp.png"                   },
  { name: "Infosys",            img: "infosys.png"              },
  { name: "TCS",                img: "TCS.png"                  },
  { name: "Wipro",              img: "wipro.png"                },
  { name: "HCL Technologies",   img: "hcl-technologies.png"     },
  { name: "Cognizant",          img: "cts.png"                  },
  { name: "EY",                 img: "EY.png"                   },
  { name: "PwC",                img: "pwc.png"                  },
  { name: "McKinsey & Company", img: "mcKinsey-and-company.png" },
  { name: "Bain & Company",     img: "Bain-and-Company.png"     },
  { name: "HSBC",               img: "hsbc.png"                 },
  { name: "Shell",              img: "shell 1.png"              },
  { name: "Chevron",            img: "chevron.png"              },
  { name: "Saudi Aramco",       img: "aramco.png"               },
  { name: "Bharat Petroleum",   img: "Bharat-Petroleum.png"     },
  { name: "GE",                 img: "ge.png"                   },
  { name: "Fujifilm",           img: "fuji.png"                 },
  { name: "DHL",                img: "dhl.png"                  },
  { name: "Emirates",           img: "Emirates.png"             },
  { name: "NTT",                img: "NTT.png"                  },
  { name: "NHS",                img: "NHS.png"                  },
  { name: "United Nations",     img: "united-nations.png"       },
  { name: "Capgemini",          img: "capeg.png"                },
];

const row1 = [...COMPANIES.slice(0, 10), ...COMPANIES.slice(0, 10)];
const row2 = [...COMPANIES.slice(10),    ...COMPANIES.slice(10)];

function MarqueeRow({ items, reverse = false }: { items: typeof COMPANIES; reverse?: boolean }) {
  const wrapRef  = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const drag     = useRef({ active: false, startX: 0, scrollLeft: 0 });

  const pause  = () => { if (trackRef.current) trackRef.current.style.animationPlayState = "paused";  };
  const resume = () => { if (trackRef.current) trackRef.current.style.animationPlayState = "running"; };

  const onMouseDown = (e: React.MouseEvent) => {
    const el = wrapRef.current; if (!el) return;
    drag.current = { active: true, startX: e.pageX - el.offsetLeft, scrollLeft: el.scrollLeft };
    pause();
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!drag.current.active || !wrapRef.current) return;
    e.preventDefault();
    wrapRef.current.scrollLeft = drag.current.scrollLeft - (e.pageX - wrapRef.current.offsetLeft - drag.current.startX);
  };
  const onMouseUp = () => { drag.current.active = false; resume(); };

  const onTouchStart = (e: React.TouchEvent) => {
    const el = wrapRef.current; if (!el) return;
    drag.current = { active: true, startX: e.touches[0].pageX - el.offsetLeft, scrollLeft: el.scrollLeft };
    pause();
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (!drag.current.active || !wrapRef.current) return;
    wrapRef.current.scrollLeft = drag.current.scrollLeft - (e.touches[0].pageX - wrapRef.current.offsetLeft - drag.current.startX);
  };
  const onTouchEnd = () => { drag.current.active = false; resume(); };

  return (
    <div
      ref={wrapRef}
      className="tc-marquee-wrap"
      style={{ cursor: "grab", overflowX: "clip", overflowY: "visible", userSelect: "none" }}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div ref={trackRef} className={`tc-marquee${reverse ? " tc-marquee-2" : ""}`}>
        {items.map((c, i) => (
          <div key={i} className="tc-logo-item">
            <img
              decoding="async"
              loading="lazy"
              src={`/images/trusted-logos/${encodeURIComponent(c.img)}`}
              alt={c.name}
              style={{ height: 48, width: "auto", objectFit: "contain", display: "block" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TrustedCompanies() {
  return (
    <section className="tc-section">
      <style suppressHydrationWarning>{`
        .tc-section {
          background: #ffffff;
          padding: 30px 0;
          border-top: 1px solid rgba(6,148,209,0.12);
          border-bottom: 1px solid rgba(6,148,209,0.12);
          overflow: hidden;
        }
        .tc-inner { max-width: 1200px; margin: 0 auto; text-align: center; }
        .tc-headline-wrap { text-align: center; margin-bottom: 20px; padding: 0 24px; }
        .tc-headline {
          font-family: 'GTWalsheimPro', sans-serif;
          font-size: 24px; font-weight: 800; color: #071e2e;
          letter-spacing: -0.015em; margin-bottom: 10px; line-height: 1.4;
        }
        .tc-headline em {
          font-style: normal;
          background: linear-gradient(90deg, #0694D1 0%, #38bdf8 50%, #0694D1 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: tc-shimmer 2.5s linear infinite;
        }
        @keyframes tc-shimmer { to { background-position: 200% center; } }
        .tc-headline-sub { font-size: 15px; color: #4a6375; margin-bottom: 0; font-weight: 400; }

        .tc-marquee-wrap {
          position: relative; overflow-x: clip; overflow-y: visible;
          padding: 10px 0; margin-bottom: 0;
        }
        .tc-marquee-wrap::before,
        .tc-marquee-wrap::after {
          content: ''; position: absolute; top: 0; bottom: 0; width: 8%; z-index: 2; pointer-events: none;
        }
        .tc-marquee-wrap::before { left: 0;  background: linear-gradient(to right, #ffffff, transparent); }
        .tc-marquee-wrap::after  { right: 0; background: linear-gradient(to left,  #ffffff, transparent); }

        .tc-marquee {
          display: flex; gap: 12px; width: max-content; align-items: center;
          animation: tcMarquee 38s linear infinite;
          will-change: transform;
        }
        .tc-marquee-2 { animation-direction: reverse; animation-duration: 46s; }
        @keyframes tcMarquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }

        .tc-logo-item {
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; padding: 0 12px;
          transition: transform 0.25s ease, opacity 0.25s ease;
          cursor: default;
          filter: drop-shadow(0 2px 6px rgba(6,148,209,0.15));
        }
        .tc-logo-item:hover { transform: scale(1.08); opacity: 0.85; }
      `}</style>

      <div className="tc-inner">
        <div className="tc-headline-wrap">
          <div className="tc-headline">
            Trusted by enterprise teams at <em>500+</em> global companies
          </div>
          <div className="tc-headline-sub">
            From Fortune 500 enterprises to fast-growing tech firms — Koenig alumni are everywhere
          </div>
        </div>

        <MarqueeRow items={row1} />
        <MarqueeRow items={row2} reverse />
      </div>
    </section>
  );
}
