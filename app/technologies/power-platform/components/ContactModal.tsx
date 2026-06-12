"use client";
import { useEffect, useState } from "react";
import ContactForm from "./ContactForm";

export default function ContactModal() {
  const [open, setOpen] = useState(false);
  const [initType, setInitType] = useState<"individual" | "enterprise">("individual");

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as { type?: "individual" | "enterprise" };
      setInitType(detail?.type ?? "individual");
      setOpen(true);
    };
    window.addEventListener("openContactModal", handler);
    return () => window.removeEventListener("openContactModal", handler);
  }, []);

  if (!open) return null;

  return (
    <div
      style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(4,24,37,0.6)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}
      onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
    >
      <div style={{ position: "relative", width: "100%", maxWidth: 560, maxHeight: "90vh", overflowY: "auto", borderRadius: 20, background: "#fff" }}>
        <button
          onClick={() => setOpen(false)}
          style={{ position: "absolute", top: 16, right: 16, zIndex: 10, width: 32, height: 32, borderRadius: "50%", border: "none", background: "rgba(9,49,72,0.08)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, color: "#093148", lineHeight: 1 }}
          aria-label="Close"
        >
          ×
        </button>
        <ContactForm initialType={initType} />
      </div>
    </div>
  );
}
