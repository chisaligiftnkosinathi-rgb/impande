"use client";

import React, { useEffect, useState } from "react";

export function SeasonsProvider({ children }: { children: React.ReactNode }) {
  const [seasonClass, setSeasonClass] = useState("");

  useEffect(() => {
    const month = new Date().getMonth(); // 0-11
    
    // Northern Hemisphere mapped to seasons (adjust as needed for Africa, but following the visual cue from the prompt)
    // The prompt specified: Spring: greener, Summer: warm gold, Autumn: copper/clay, Winter: softer earth/stone
    // Let's assume Southern Hemisphere mapping since this is an African design language:
    // Sep, Oct, Nov = Spring
    // Dec, Jan, Feb = Summer
    // Mar, Apr, May = Autumn
    // Jun, Jul, Aug = Winter
    
    if (month >= 8 && month <= 10) {
      setSeasonClass("season-spring");
    } else if (month === 11 || month <= 1) {
      setSeasonClass("season-summer");
    } else if (month >= 2 && month <= 4) {
      setSeasonClass("season-autumn");
    } else {
      setSeasonClass("season-winter");
    }
  }, []);

  return (
    <div className={seasonClass} style={{ minHeight: "100vh", transition: "background-color 2s ease" }}>
      {children}
    </div>
  );
}
