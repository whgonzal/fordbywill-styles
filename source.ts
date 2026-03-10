import type { Vehicle } from "@/lib/types";
import vehicles from "@/data/inventory.json";

export async function getInventory(): Promise<Vehicle[]> {
  return vehicles as Vehicle[];
}

export async function getVehicleById(id: string): Promise<Vehicle | null> {
  return (vehicles as Vehicle[]).find((v) => v.id === id) ?? null;
}
