import Link from "next/link";
import Image from "next/image";
import type { Vehicle } from "@/lib/types";
import { formatUsd, formatNumber } from "@/lib/utils";

export default function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const title = `${vehicle.year} ${vehicle.make} ${vehicle.model}${vehicle.trim ? ` ${vehicle.trim}` : ""}`;

  return (
    <div className="card" style={{ overflow: "hidden" }}>
      <Link href={`/inventory/${vehicle.id}`}>
        <div style={{ position: "relative", width: "100%", aspectRatio: "16/10" }}>
          <Image
            src={vehicle.photoUrls?.[0]}
            alt={title}
            fill
            sizes="(max-width: 980px) 50vw, 350px"
            style={{ objectFit: "cover" }}
          />
        </div>
      </Link>
      <div style={{ padding: 12, display: "grid", gap: 10 }}>
        <div style={{ fontWeight: 900 }}>{title}</div>
        <div className="row">
          <span className="badge">{formatUsd(vehicle.price)}</span>
          {vehicle.mileage !== undefined && <span className="badge">{formatNumber(vehicle.mileage)} mi</span>}
          {vehicle.stockNumber && <span className="badge">Stock {vehicle.stockNumber}</span>}
        </div>
        <Link className="btn secondary" href={`/inventory/${vehicle.id}`}>View</Link>
      </div>
    </div>
  );
}
