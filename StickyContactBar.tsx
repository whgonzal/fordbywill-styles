"use client";

function encodeSmsBody(body: string): string {
  return encodeURIComponent(body).replace(/%20/g, "+");
}

export default function StickyContactBar() {
  const phoneDisplay = "(210) 542-5451";
  const phoneE164 = "+12105425451";
  const body = "Hi Will, I'm interested in a vehicle. Can you help me?";

  return (
    <div style={{
      position: "fixed", left: 0, right: 0, bottom: 0, zIndex: 50,
      padding: "10px 12px", borderTop: "1px solid var(--border)",
      background: "rgba(11,15,20,0.85)", backdropFilter: "blur(10px)"
    }}>
      <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 0 }}>
        <div style={{ display: "grid", gap: 2 }}>
          <div style={{ fontWeight: 900 }}>Will</div>
          <div className="small">{phoneDisplay}</div>
        </div>
        <div className="row" style={{ gap: 10, margin: 0 }}>
          <a className="btn secondary" href={`tel:${phoneE164}`}>📞 Call</a>
          <a className="btn" href={`sms:${phoneE164}?&body=${encodeSmsBody(body)}`}>💬 Text</a>
        </div>
      </div>
    </div>
  );
}
