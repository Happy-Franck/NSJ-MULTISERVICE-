"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { reviews } from "@/lib/data";

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function Reviews() {
  const [current, setCurrent] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback((i: number) => {
    setCurrent(((i % reviews.length) + reviews.length) % reviews.length);
  }, []);

  const startAuto = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(() => {
      setCurrent((c) => (c + 1) % reviews.length);
    }, 5000);
  }, []);

  useEffect(() => {
    startAuto();
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [startAuto]);

  function handle(i: number) {
    go(i);
    startAuto();
  }

  return (
    <div className="carousel" id="carousel">
      <div
        className="carousel__track"
        id="carouselTrack"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {reviews.map((r) => (
          <div className="review" key={r.name}>
            <div className="review__inner">
              <div className="review__stars">{"★".repeat(r.stars)}</div>
              <p className="review__text">“{r.text}”</p>
              <div className="review__author">
                <span className="review__avatar">{initials(r.name)}</span>
                <div style={{ textAlign: "left" }}>
                  <div className="review__name">{r.name}</div>
                  <div className="review__meta">{r.meta}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        className="carousel__btn carousel__btn--prev"
        type="button"
        aria-label="Avis précédent"
        onClick={() => handle(current - 1)}
      >
        ‹
      </button>
      <button
        className="carousel__btn carousel__btn--next"
        type="button"
        aria-label="Avis suivant"
        onClick={() => handle(current + 1)}
      >
        ›
      </button>
      <div className="carousel__dots" id="carDots">
        {reviews.map((r, i) => (
          <button
            key={r.name}
            type="button"
            aria-label={`Avis ${i + 1}`}
            className={i === current ? "is-active" : ""}
            onClick={() => handle(i)}
          />
        ))}
      </div>
    </div>
  );
}
