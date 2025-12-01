import type { ShipmentRead } from "Api"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

function getLatestStatus(shipment: ShipmentRead) {
  return shipment.timeline[shipment.timeline.length - 1].status
}

function getShipmentsCountWithStatus(
  shipments: ShipmentRead[],
  status: string
) {
  return shipments.filter((shipment) => getLatestStatus(shipment) === status).length
}

export { getLatestStatus, getShipmentsCountWithStatus as getShipmentsCountForStatus }