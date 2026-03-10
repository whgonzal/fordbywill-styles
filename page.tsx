import Link from "next/link";
import Image from "next/image";
import { getVehicleById } from "@/lib/inventory/source";
import InquiryForm from "@/components/InquiryForm";
import { formatUsd, formatNumber } from "@/lib/utils";

export default async function VehiclePage({ params }: { params: { id: string } }) {
  const v = await getVehicleById(params.id);

  if (!v) {
    return (
      <div style={{ paddingTop: 18 }}>
        <section className="card" style={{ padding: 18 }}>
          <h1 className="h1">Vehicle not found</h1>
          <Link className="btn secondary" href="/">Back</Link>
        </section>
      </div>
    );
  }

  const title = `${v.year} ${v.make} ${v.model}${v.trim ? ` ${v.trim}` : ""}`;

  return (
    <div style={{ paddingTop: 18, display: "grid", gap: 14 }}>
      <section className="card" style={{ padding: 18 }}>
        <Link className="badge" href="/">← Back</Link>
        <h1 className="h1" style={{ marginTop: 10 }}>{title}</h1>

        <div className="row" style={{ marginTop: 10 }}>
          <span className="badge">{formatUsd(v.price)}</span>
          {v.mileage !== undefined && <span className="badge">{formatNumber(v.mileage)} mi</span>}
          {v.stockNumber && <span className="badge">Stock {v.stockNumber}</span>}
        </div>

        <div style={{ marginTop: 14 }} className="card">
          <div style={{ position: "relative", width: "100%", aspectRatio: "16/9" }}>
            <Image src={v.photoUrls?.[0]} alt={title} fill sizes="(max-width: 900px) 100vw, 900px" style={{ objectFit: "cover" }} />
          </div>
        </div>

        <div style={{ marginTop: 14 }} className="card">
          <div style={{ padding: 14 }}>
            <h2 className="h2">Inquiry</h2>
            <p className="p" style={{ marginTop: 6 }}>This goes directly to Will.</p>
            <div style={{ marginTop: 12 }}>
              <InquiryForm vehicle={v} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
