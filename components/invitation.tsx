"use client";

import { CSSProperties, useCallback, useEffect, useRef, useState } from "react";

type Locale = "en" | "ar";

const COPY = {
  en: {
    title: "Ali & Zahraa — 6 October 2026",
    couple: "Ali & Zahraa",
    togetherWithFamilies: "Together with their families",
    dateShort: "Tuesday · 6 October · 2026",
    dateLong: "Tuesday, 6 October 2026",
    countdown: ["Days", "Hours", "Minutes", "Seconds"],
    dayHasCome: "The day has come",
    enter: "Enter",
    invitation: "Our Katb Kteb",
    verse: "“And He placed between you affection and mercy.”",
    verseSource: "Qur’an 30:21",
    invitationLead: "Together with our families, we joyfully invite you to celebrate our Katb Kteb.",
    details: "The Details",
    eventName: "Katb Kteb",
    eventTimeWords: "Five o’clock in the evening",
    eventTime: "5:00 PM",
    venue: "Lecial",
    venueCity: "Sarba, Lebanon",
    venueLocation: "View location",
    celebration: "A Joy Shared",
    celebrationLead: "We would be honored to have you with us as we begin this blessed chapter.",
    presence: "Your presence is the greatest gift.",
    togetherForever: "A blessed beginning",
    seeYouThere: "Celebrate with us",
    withLove: "With all our love,",
    tapToOpen: "Tap to open",
    openInvitation: "Open the invitation",
    continue: "Continue",
    sections: "Sections",
    section: "Section",
    language: "Language",
    artworkAlt: [
      "Gilded palace gallery with chandeliers",
      "Painted and gilded royal chapel ceiling",
      "Royal chapel interior with gilded columns",
      "Gilded ceiling corner with heraldic cartouche",
      "Crystal chandelier in a gilded hall",
    ],
  },
  ar: {
    title: "علي وزهراء — ٦ تشرين الأول ٢٠٢٦",
    couple: "علي وزهراء",
    togetherWithFamilies: "برفقة عائلتيهما",
    dateShort: "الثلاثاء · ٦ تشرين الأول · ٢٠٢٦",
    dateLong: "الثلاثاء، ٦ تشرين الأول ٢٠٢٦",
    countdown: ["يوم", "ساعة", "دقيقة", "ثانية"],
    dayHasCome: "لقد حان اليوم",
    enter: "الدخول",
    invitation: "كتب كتابنا",
    verse: "«وجعل بينكم مودة ورحمة»",
    verseSource: "القرآن الكريم · الروم ٢١",
    invitationLead: "برفقة عائلتينا، يسعدنا دعوتكم لمشاركتنا فرحة كتب كتابنا.",
    details: "تفاصيل المناسبة",
    eventName: "كتب الكتاب",
    eventTimeWords: "الساعة الخامسة مساءً",
    eventTime: "٥:٠٠ مساءً",
    venue: "Lecial",
    venueCity: "صربا، لبنان",
    venueLocation: "عرض الموقع",
    celebration: "فرحة تجمعنا",
    celebrationLead: "نتشرّف بحضوركم ومشاركتكم فرحتنا ونحن نبدأ هذا الفصل المبارك.",
    presence: "حضوركم هو أجمل هدية لنا.",
    togetherForever: "بداية مباركة",
    seeYouThere: "شاركونا الفرحة",
    withLove: "مع كل محبتنا،",
    tapToOpen: "اضغطوا للفتح",
    openInvitation: "فتح الدعوة",
    continue: "متابعة",
    sections: "أقسام الدعوة",
    section: "القسم",
    language: "اللغة",
    artworkAlt: [
      "قاعة ملكية مذهّبة تتدلّى منها الثريات",
      "سقف الكنيسة الملكية المرسوم والمذهّب",
      "داخل الكنيسة الملكية وأعمدتها المذهّبة",
      "زاوية سقف مذهّبة بزخارف ملكية",
      "ثريا كريستالية في قاعة مذهّبة",
    ],
  },
} as const;

const ARTWORK = [
  {
    src: "/uploads/Chateau_Versailles_Galerie_des_Glaces.jpg",
    position: "center 44%",
  },
  {
    src: "/uploads/Plafond_chapelle_Royale_Versailles.jpg",
  },
  {
    src: "/uploads/Chapelle_royale_de_Versailles.jpg",
    position: "center 38%",
  },
  {
    src: "/uploads/Angle_salon_de_la_paix_Versailles.jpg",
  },
  {
    src: "/uploads/Hall_of_Mirrors,_Palace_of_Versailles_chandelier.jpeg",
    position: "center 30%",
  },
];

const SLIDE_COUNT = 5;
// Guests are walked through the deck on their own; the timer restarts
// whenever they take over and steers to a slide themselves.
const AUTO_ADVANCE_MS = 5000;

type CountdownValue = { d: number; h: number; m: number; s: number };

function formatCountdown(value: number, locale: Locale) {
  return new Intl.NumberFormat(locale === "ar" ? "ar-LB" : "en", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  }).format(value);
}

function Frame() {
  return (
    <div className="frame" aria-hidden="true">
      <i /><i /><i /><i /><b /><b /><b /><b /><u /><u />
    </div>
  );
}

function Rule({ className = "" }: { className?: string }) {
  return <div className={`rule rv ${className}`} />;
}

function Ornament() {
  return <div className="orn rv" aria-hidden="true"><i /><i /><i /></div>;
}

function Crest({ className = "rv", locale = "en" }: { className?: string; locale?: Locale }) {
  return (
    <div className={`crest ${className}`}>
      <div className="coronet" aria-hidden="true"><i /><i /><i /></div>
      <div className="medal">
        <svg viewBox="0 0 96 96" aria-hidden="true">
          <circle cx="48" cy="48" r="47" />
          <circle className="inner" cx="48" cy="48" r="41" />
        </svg>
        <span
          className="day-logo"
          role="img"
          aria-label={locale === "ar" ? "شعار علي وزهراء" : "Ali and Zahraa's wedding logo"}
        />
      </div>
    </div>
  );
}

function Countdown({ reduceMotion, locale }: { reduceMotion: boolean; locale: Locale }) {
  const target = useRef(new Date("2026-10-06T17:00:00+03:00").getTime());
  const [remaining, setRemaining] = useState<CountdownValue | null>(() => {
    const diff = target.current - Date.now();
    if (diff <= 0) return null;
    const total = Math.floor(diff / 1000);
    return {
      d: Math.floor(total / 86400),
      h: Math.floor((total % 86400) / 3600),
      m: Math.floor((total % 3600) / 60),
      s: total % 60,
    };
  });
  const previous = useRef<CountdownValue | null>(null);

  useEffect(() => {
    const tick = () => {
      const diff = target.current - Date.now();
      if (diff <= 0) {
        setRemaining(null);
        return;
      }
      const total = Math.floor(diff / 1000);
      setRemaining({
        d: Math.floor(total / 86400),
        h: Math.floor((total % 86400) / 3600),
        m: Math.floor((total % 3600) / 60),
        s: total % 60,
      });
    };
    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    previous.current = remaining;
  }, [remaining]);

  const content = COPY[locale];

  if (!remaining) return <p className="label rv mt-[30px]">{content.dayHasCome}</p>;

  const units: Array<[keyof CountdownValue, string]> = [
    ["d", content.countdown[0]], ["h", content.countdown[1]], ["m", content.countdown[2]], ["s", content.countdown[3]],
  ];

  return (
    <div className="cd rv">
      {units.map(([key, label]) => {
        const changed = previous.current?.[key] !== remaining[key];
        return (
          <div className="cd-u" key={key}>
            <span className={`cd-n ${changed && !reduceMotion ? "tick" : ""}`} key={remaining[key]}>
              {formatCountdown(remaining[key], locale)}
            </span>
            <span className="cd-l">{label}</span>
          </div>
        );
      })}
    </div>
  );
}

export function Invitation() {
  const deckRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const revealTimeouts = useRef<number[]>([]);
  const [current, setCurrent] = useState(0);
  const [cueHidden, setCueHidden] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [opened, setOpened] = useState(false);
  const [gateVisible, setGateVisible] = useState(true);
  const [dust, setDust] = useState<CSSProperties[]>([]);
  const [locale, setLocale] = useState<Locale>("en");
  const content = COPY[locale];

  const go = useCallback((index: number) => {
    const deck = deckRef.current;
    if (!deck) return;
    const slides = Array.from(deck.querySelectorAll<HTMLElement>(".slide"));
    const next = Math.max(0, Math.min(slides.length - 1, index));
    deck.scrollTo({ top: slides[next].offsetTop, behavior: reduceMotion ? "auto" : "smooth" });
  }, [reduceMotion]);

  const startMusic = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !audio.paused) return;
    void audio.play().catch(() => {
      // Browsers may require the guest's first interaction before playing audio.
    });
  }, []);

  const openGate = useCallback(() => {
    if (opened) return;
    startMusic();
    setOpened(true);
    window.setTimeout(() => setGateVisible(false), 2200);
  }, [opened, startMusic]);

  useEffect(() => {
    startMusic();

    const retryAfterInteraction = () => {
      startMusic();
      window.setTimeout(() => {
        if (!audioRef.current?.paused) {
          window.removeEventListener("pointerdown", retryAfterInteraction);
          window.removeEventListener("keydown", retryAfterInteraction);
        }
      }, 0);
    };

    window.addEventListener("pointerdown", retryAfterInteraction);
    window.addEventListener("keydown", retryAfterInteraction);
    return () => {
      window.removeEventListener("pointerdown", retryAfterInteraction);
      window.removeEventListener("keydown", retryAfterInteraction);
    };
  }, [startMusic]);

  useEffect(() => {
    const requestedLocale = new URLSearchParams(window.location.search).get("lang");
    const savedLocale = window.localStorage.getItem("invitation-locale");
    const initialLocale = requestedLocale === "ar" || requestedLocale === "en" ? requestedLocale : savedLocale;
    if (initialLocale === "ar" || initialLocale === "en") setLocale(initialLocale);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
    document.title = content.title;
    window.localStorage.setItem("invitation-locale", locale);
  }, [content.title, locale]);

  useEffect(() => {
    const media = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReduceMotion(Boolean(media?.matches));
    updateMotion();
    media?.addEventListener?.("change", updateMotion);
    return () => media?.removeEventListener?.("change", updateMotion);
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      setDust([]);
      return;
    }
    setDust(Array.from({ length: 24 }, () => {
      const size = `${(Math.random() * 2.8 + 1.3).toFixed(1)}px`;
      return {
        left: `${(Math.random() * 100).toFixed(1)}%`,
        width: size,
        height: size,
        opacity: Number((0.2 + Math.random() * 0.6).toFixed(2)),
        animationDuration: `${(17 + Math.random() * 19).toFixed(1)}s`,
        animationDelay: `${(-Math.random() * 36).toFixed(1)}s`,
      };
    }));
  }, [reduceMotion]);

  useEffect(() => {
    const timer = window.setTimeout(openGate, 3800);
    return () => window.clearTimeout(timer);
  }, [openGate]);

  useEffect(() => {
    const deck = deckRef.current;
    if (!deck) return;
    const slides = Array.from(deck.querySelectorAll<HTMLElement>(".slide"));
    const revealElements = Array.from(document.querySelectorAll<HTMLElement>(".rv"));

    if (!reduceMotion) revealElements.forEach((element) => element.classList.add("pre"));

    const show = (slide: HTMLElement) => {
      if (slide.dataset.done) return;
      slide.dataset.done = "1";
      slide.classList.add("in");
      if (reduceMotion) return;
      slide.querySelectorAll<HTMLElement>(".rv").forEach((element, index) => {
        const delay = Math.min(index, 8) * 135;
        element.classList.add("go");
        element.style.transitionDelay = `${delay}ms`;
        requestAnimationFrame(() => element.classList.remove("pre"));
        const timeout = window.setTimeout(() => {
          element.style.transition = "none";
          element.style.transitionDelay = "0ms";
          element.classList.remove("pre");
          element.style.opacity = "1";
          element.style.transform = "none";
          element.style.filter = "none";
        }, 1500 + delay);
        revealTimeouts.current.push(timeout);
      });
    };

    const sync = () => {
      const viewportHeight = deck.clientHeight;
      let best = 0;
      let bestDistance = Infinity;
      slides.forEach((slide, index) => {
        const rect = slide.getBoundingClientRect();
        const distance = Math.abs(rect.top + rect.height / 2 - viewportHeight / 2);
        if (distance < bestDistance) {
          bestDistance = distance;
          best = index;
        }
        if (rect.top < viewportHeight * 0.8 && rect.bottom > viewportHeight * 0.2) show(slide);
      });
      setCurrent(best);
      if (!reduceMotion && stageRef.current) {
        // Keep the parallax local to the active slide. Using the deck's total
        // scroll offset eventually moved the fixed stage beyond its overscan
        // and exposed an empty strip along the bottom on later slides.
        const localScroll = deck.scrollTop - slides[best].offsetTop;
        stageRef.current.style.transform = `translate3d(0,${(-localScroll * 0.055).toFixed(1)}px,0)`;
      }
    };

    const onDeckScroll = () => {
      setCueHidden(deck.scrollTop > 40);
      sync();
    };
    deck.addEventListener("scroll", onDeckScroll, { passive: true });
    window.addEventListener("resize", sync);
    sync();
    const timerA = window.setTimeout(sync, 300);
    const timerB = window.setTimeout(sync, 1200);

    return () => {
      deck.removeEventListener("scroll", onDeckScroll);
      window.removeEventListener("resize", sync);
      window.clearTimeout(timerA);
      window.clearTimeout(timerB);
      revealTimeouts.current.forEach(window.clearTimeout);
      revealTimeouts.current = [];
    };
  }, [reduceMotion]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.target as HTMLElement | null)?.closest?.(".lang-switch")) return;
      if (!opened && event.key === "Enter") {
        event.preventDefault();
        openGate();
        return;
      }
      if (["ArrowDown", "PageDown", " "].includes(event.key)) {
        event.preventDefault();
        go(current + 1);
        if (!opened && event.key === " ") openGate();
      } else if (["ArrowUp", "PageUp"].includes(event.key)) {
        event.preventDefault();
        go(current - 1);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [current, go, openGate, opened]);

  useEffect(() => {
    if (!opened || current >= SLIDE_COUNT - 1) return;
    const timer = window.setTimeout(() => go(current + 1), AUTO_ADVANCE_MS);
    return () => window.clearTimeout(timer);
  }, [current, go, opened]);

  const chooseLocale = (nextLocale: Locale) => {
    setLocale(nextLocale);
    const url = new URL(window.location.href);
    url.searchParams.set("lang", nextLocale);
    window.history.replaceState({}, "", url);
  };

  return (
    <main className={locale === "ar" ? "arabic" : "english"} dir={locale === "ar" ? "rtl" : "ltr"}>
      <audio ref={audioRef} src="/uploads/music.mp3" autoPlay loop preload="auto" playsInline aria-hidden="true" />
      <div className="lang-switch" role="group" aria-label={content.language} dir="ltr">
        <button className={locale === "en" ? "active" : ""} onClick={() => chooseLocale("en")} aria-pressed={locale === "en"}>English</button>
        <span aria-hidden="true" />
        <button className={locale === "ar" ? "active" : ""} onClick={() => chooseLocale("ar")} aria-pressed={locale === "ar"}>العربية</button>
      </div>
      <div className="stage" ref={stageRef}>
        {ARTWORK.map((artwork, index) => (
          <div className={`art ${current === index ? "on" : ""}`} key={artwork.src}>
            {/* Keep the original full-bleed image behavior with local assets. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={artwork.src} alt={content.artworkAlt[index]} loading={index === 0 ? "eager" : "lazy"} style={{ objectPosition: artwork.position }} />
          </div>
        ))}
      </div>
      <div className="scrim" />
      <div className="damask" />
      <div className="grain" />
      <div className="bloom" />
      <div className="dust">{dust.map((style, index) => <i key={index} style={style} />)}</div>
      <div className="bar" style={{ width: `${((current + 1) / SLIDE_COUNT) * 100}%` }} />

      <div className="deck" ref={deckRef}>
        <section className="slide" data-screen-label={`01 ${content.enter}`}>
          <Frame />
          <div className="panel">
            <Crest locale={locale} />
            <p className="eyebrow rv">{content.togetherWithFamilies}</p>
            <h1 className={`names rv hero-names ${opened ? "lit" : ""}`}>
              {locale === "en" ? [...content.couple].map((character, index) => (
                <span key={index} style={{ transitionDelay: `${300 + index * 60}ms` }}>
                  {character === " " ? "\u00a0" : character}
                </span>
              )) : content.couple}
            </h1>
            <Rule />
            <p className="date rv">{content.dateShort}</p>
            <Countdown reduceMotion={reduceMotion} locale={locale} />
          </div>
          <button className="cue" style={{ opacity: cueHidden ? 0 : 1 }} onClick={() => go(1)} aria-label={content.continue}>
            <span>{content.enter}</span><i />
          </button>
        </section>

        <section className="slide" data-screen-label={`02 ${content.invitation}`}>
          <Frame />
          <div className="panel">
            <p className="label rv">{content.invitation}</p>
            <Rule />
            <p className="verse rv">{content.verse}</p>
            <p className="eyebrow rv mt-4">{content.verseSource}</p>
            <Ornament />
            <p className="lead rv">{content.invitationLead}</p>
            <h2 className="names rv invitation-names">{content.couple}</h2>
            <p className="date rv">{content.dateLong}</p>
          </div>
        </section>

        <section className="slide" data-screen-label={`03 ${content.details}`}>
          <Frame />
          <div className="panel">
            <h2 className="heading rv">{content.details}</h2>
            <Rule />
            <div className="stack rv">
              <p className="label">{content.eventName}</p>
              <p className="time my-2">{content.eventTime}</p>
              <p className="small mb-4">{content.eventTimeWords}</p>
              <p className="venue">{content.venue}</p>
              <p className="small">{content.venueCity}</p>
            </div>
            <div className="btn-row rv">
              <a className="btn" target="_blank" rel="noopener noreferrer" href="https://maps.app.goo.gl/CwszLvJ5A8Qnnrf37">{content.venueLocation}</a>
            </div>
          </div>
        </section>

        <section className="slide" data-screen-label={`04 ${content.celebration}`}>
          <Frame />
          <div className="panel">
            <h2 className="heading rv">{content.celebration}</h2>
            <Rule />
            <p className="lead rv">{content.celebrationLead}</p>
            <Ornament />
            <p className="verse rv">{content.presence}</p>
            <Rule />
            <p className="names rv invitation-names">{content.couple}</p>
          </div>
        </section>

        <section className="slide closing-slide" data-screen-label={`05 ${content.togetherForever}`}>
          <Frame />
          <div className="panel closing-panel">
            <Crest className="closing-crest rv" locale={locale} />
            <p className="eyebrow rv">{content.togetherForever}</p>
            <Ornament />
            <h2 className="names rv closing-names">{content.seeYouThere}</h2>
            <Rule className="closing-rule" />
            <p className="small closing-signoff rv">{content.withLove}<br /><strong>{content.couple}</strong></p>
            <p className="date closing-date rv">{content.dateLong}</p>
          </div>
        </section>
      </div>

      <nav className="dots" aria-label={content.sections}>
        {Array.from({ length: SLIDE_COUNT }, (_, index) => (
          <button key={index} className={current === index ? "active" : ""} onClick={() => go(index)} aria-label={`${content.section} ${index + 1}`} />
        ))}
      </nav>
      {gateVisible && (
        <button className={`gate ${opened ? "open" : ""}`} onClick={openGate} aria-label={content.openInvitation}>
          <span className="leaf l"><span className="door-ring" /></span>
          <span className="leaf r"><span className="door-ring" /></span>
          <span className="seam" />
          <span className="gate-mid">
            <Crest className="gate-crest" locale={locale} />
            <span className="gate-lbl">{content.tapToOpen}</span>
          </span>
        </button>
      )}
    </main>
  );
}
