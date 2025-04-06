"use client";
import { useEffect } from "react";

export default function AdsterraSocialBarImpostorgram() {
  useEffect(() => {
    // Hanya jalankan di production
    if (process.env.NODE_ENV !== "production") return;

    const script = document.createElement("script");
    script.src =
      "//installerastonishment.com/c1/64/f8/c164f83cd07517d0e545478a5651fe03.js";
    script.type = "text/javascript";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Bersihkan script jika komponen di-unmount
      document
        .querySelectorAll('script[src*="installerastonishment"]')
        .forEach((el) => el.remove());
    };
  }, []);

  return null; // Tidak menampilkan UI apapun
}
