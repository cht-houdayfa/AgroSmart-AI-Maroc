export type UserRole = 'farmer' | 'technician' | 'admin';
export type NodeStatus = 'online' | 'warning' | 'critical' | 'offline';
export type TicketPriority = 'low' | 'normal' | 'high' | 'critical';
export type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed';
export type SubscriptionStatus = 'active' | 'expired' | 'pending';

export interface Profile {
  id: string;
  full_name: string | null;
  phone: string | null;
  role: UserRole;
  region: string | null;
  language: string;
  created_at: string;
}

export interface Farm {
  id: string;
  owner_id: string | null;
  name: string;
  region: string | null;
  location_lat: number | null;
  location_lng: number | null;
  area_hectares: number | null;
  crop_type: string | null;
  technician_id: string | null;
  status: string;
  created_at: string;
}

export interface IotNode {
  id: string;
  farm_id: string;
  node_code: string;
  sector_name: string | null;
  firmware_version: string;
  battery_percentage: number;
  battery_soh: number;
  soil_moisture: number;
  water_pressure: number;
  flow_rate: number;
  valve_open: boolean;
  status: NodeStatus;
  last_seen: string;
  created_at: string;
}

export interface IrrigationSession {
  id: string;
  farm_id: string;
  node_id: string | null;
  started_at: string;
  ended_at: string | null;
  duration_minutes: number | null;
  water_used_liters: number | null;
  triggered_by: 'auto' | 'manual' | 'ai';
  created_at: string;
}

export interface MaintenanceTicket {
  id: string;
  farm_id: string;
  node_id: string | null;
  technician_id: string | null;
  issue_type: string;
  description: string | null;
  priority: TicketPriority;
  status: TicketStatus;
  resolved_at: string | null;
  created_at: string;
}

export interface Subscription {
  id: string;
  farm_id: string;
  plan: string;
  price_dh: number;
  status: SubscriptionStatus;
  start_date: string;
  end_date: string;
  created_at: string;
}

export interface FirmwareVersion {
  id: string;
  version: string;
  device_type: 'esp32' | 'gateway';
  release_notes: string | null;
  file_url: string | null;
  is_latest: boolean;
  deployed_count: number;
  created_at: string;
}
