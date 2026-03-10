"use client";

import { useState } from "react";
import type { Vehicle } from "@/lib/types";

export default function InquiryForm({ vehicle }: { vehicle: Vehicle }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [err, setErr] = useState("");

  async function submit() {
    setStatus("sending");
    setErr("");

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: process.env.NEXT_PUBLIC_INQUIRY_FORM_TOKEN ?? "",
          kind: "vehicle",
          vehicleId: vehicle.id,
          vehicleTitle: `${vehicle.year} ${vehicle.make} ${vehicle.model}${vehicle.trim ? ` ${vehicle.trim}` : ""}`,
          vin: vehicle.vin,
          stockNumber: vehicle.stockNumber,
          price: vehicle.price,
          name,
          phone,
          email,
          message,
          sourcePage: window.location.href
        })
      });

      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.message || "Failed");

      setStatus("sent");
      setName(""); setPhone(""); setEmail(""); setMessage("");
    } catch (e: any) {
      setStatus("error");
      setErr(e?.message ?? "Error");
    }
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div className="row">
        <div style={{ flex: 1, minWidth: 220 }}>
          <label className="label">Name</label>
          <input className="input" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div style={{ flex: 1, minWidth: 220 }}>
          <label className="label">Phone</label>
          <input className="input" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
      </div>
      <div>
        <label className="label">Email</label>
        <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label className="label">Message</label>
        <textarea className="textarea" rows={4} value={message} onChange={(e) => setMessage(e.target.value)} />
      </div>
      <button className="btn" onClick={submit} disabled={status === "sending"}>
        {status === "sending" ? "Sending..." : "Submit Inquiry"}
      </button>
      {status === "sent" && <div className="badge">✅ Sent!</div>}
      {status === "error" && <div className="badge">❌ {err}</div>}
    </div>
  );
}
