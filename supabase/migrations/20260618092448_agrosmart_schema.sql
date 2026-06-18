
-- Users/profiles table
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  full_name text,
  phone text UNIQUE,
  role text NOT NULL CHECK (role IN ('farmer', 'technician', 'admin')),
  region text,
  language text DEFAULT 'darija',
  created_at timestamptz DEFAULT now()
);
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "select_own_profile" ON profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "insert_own_profile" ON profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "update_own_profile" ON profiles FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
CREATE POLICY "delete_own_profile" ON profiles FOR DELETE TO authenticated USING (auth.uid() = id);

-- Farms table
CREATE TABLE farms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  name text NOT NULL,
  region text,
  location_lat float,
  location_lng float,
  area_hectares float,
  crop_type text,
  technician_id uuid REFERENCES profiles(id),
  status text DEFAULT 'active',
  created_at timestamptz DEFAULT now()
);
ALTER TABLE farms ENABLE ROW LEVEL SECURITY;
CREATE POLICY "select_farms" ON farms FOR SELECT TO authenticated USING (
  auth.uid() = owner_id OR auth.uid() = technician_id OR 
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "insert_farms" ON farms FOR INSERT TO authenticated WITH CHECK (auth.uid() = owner_id);
CREATE POLICY "update_farms" ON farms FOR UPDATE TO authenticated USING (
  auth.uid() = owner_id OR auth.uid() = technician_id OR 
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
) WITH CHECK (
  auth.uid() = owner_id OR auth.uid() = technician_id OR 
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "delete_farms" ON farms FOR DELETE TO authenticated USING (auth.uid() = owner_id);

-- IoT Nodes/Devices table
CREATE TABLE iot_nodes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  farm_id uuid REFERENCES farms(id) ON DELETE CASCADE,
  node_code text UNIQUE NOT NULL,
  sector_name text,
  firmware_version text DEFAULT '1.0.0',
  battery_percentage float DEFAULT 100,
  battery_soh float DEFAULT 100,
  soil_moisture float DEFAULT 0,
  water_pressure float DEFAULT 0,
  flow_rate float DEFAULT 0,
  valve_open boolean DEFAULT false,
  status text DEFAULT 'online' CHECK (status IN ('online', 'warning', 'critical', 'offline')),
  last_seen timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);
ALTER TABLE iot_nodes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "select_iot_nodes" ON iot_nodes FOR SELECT TO authenticated USING (
  EXISTS (SELECT 1 FROM farms f WHERE f.id = farm_id AND (f.owner_id = auth.uid() OR f.technician_id = auth.uid())) OR
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "insert_iot_nodes" ON iot_nodes FOR INSERT TO authenticated WITH CHECK (
  EXISTS (SELECT 1 FROM farms f WHERE f.id = farm_id AND (f.owner_id = auth.uid() OR f.technician_id = auth.uid())) OR
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "update_iot_nodes" ON iot_nodes FOR UPDATE TO authenticated USING (
  EXISTS (SELECT 1 FROM farms f WHERE f.id = farm_id AND (f.owner_id = auth.uid() OR f.technician_id = auth.uid())) OR
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
) WITH CHECK (
  EXISTS (SELECT 1 FROM farms f WHERE f.id = farm_id AND (f.owner_id = auth.uid() OR f.technician_id = auth.uid())) OR
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "delete_iot_nodes" ON iot_nodes FOR DELETE TO authenticated USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('technician', 'admin'))
);

-- Irrigation sessions
CREATE TABLE irrigation_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  farm_id uuid REFERENCES farms(id) ON DELETE CASCADE,
  node_id uuid REFERENCES iot_nodes(id),
  started_at timestamptz DEFAULT now(),
  ended_at timestamptz,
  duration_minutes float,
  water_used_liters float,
  triggered_by text DEFAULT 'auto' CHECK (triggered_by IN ('auto', 'manual', 'ai')),
  created_at timestamptz DEFAULT now()
);
ALTER TABLE irrigation_sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "select_irrigation_sessions" ON irrigation_sessions FOR SELECT TO authenticated USING (
  EXISTS (SELECT 1 FROM farms f WHERE f.id = farm_id AND (f.owner_id = auth.uid() OR f.technician_id = auth.uid())) OR
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "insert_irrigation_sessions" ON irrigation_sessions FOR INSERT TO authenticated WITH CHECK (
  EXISTS (SELECT 1 FROM farms f WHERE f.id = farm_id AND (f.owner_id = auth.uid() OR f.technician_id = auth.uid())) OR
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "update_irrigation_sessions" ON irrigation_sessions FOR UPDATE TO authenticated USING (
  EXISTS (SELECT 1 FROM farms f WHERE f.id = farm_id AND (f.owner_id = auth.uid() OR f.technician_id = auth.uid())) OR
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
) WITH CHECK (
  EXISTS (SELECT 1 FROM farms f WHERE f.id = farm_id AND (f.owner_id = auth.uid() OR f.technician_id = auth.uid())) OR
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "delete_irrigation_sessions" ON irrigation_sessions FOR DELETE TO authenticated USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Maintenance tickets
CREATE TABLE maintenance_tickets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  farm_id uuid REFERENCES farms(id) ON DELETE CASCADE,
  node_id uuid REFERENCES iot_nodes(id),
  technician_id uuid REFERENCES profiles(id),
  issue_type text NOT NULL,
  description text,
  priority text DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'critical')),
  status text DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')),
  resolved_at timestamptz,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE maintenance_tickets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "select_maintenance_tickets" ON maintenance_tickets FOR SELECT TO authenticated USING (
  EXISTS (SELECT 1 FROM farms f WHERE f.id = farm_id AND f.owner_id = auth.uid()) OR
  auth.uid() = technician_id OR
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "insert_maintenance_tickets" ON maintenance_tickets FOR INSERT TO authenticated WITH CHECK (
  EXISTS (SELECT 1 FROM farms f WHERE f.id = farm_id AND f.owner_id = auth.uid()) OR
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('technician', 'admin'))
);
CREATE POLICY "update_maintenance_tickets" ON maintenance_tickets FOR UPDATE TO authenticated USING (
  auth.uid() = technician_id OR
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
) WITH CHECK (
  auth.uid() = technician_id OR
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "delete_maintenance_tickets" ON maintenance_tickets FOR DELETE TO authenticated USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Subscriptions
CREATE TABLE subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  farm_id uuid REFERENCES farms(id) ON DELETE CASCADE,
  plan text DEFAULT 'basic',
  price_dh float DEFAULT 300,
  status text DEFAULT 'active' CHECK (status IN ('active', 'expired', 'pending')),
  start_date date DEFAULT current_date,
  end_date date DEFAULT (current_date + interval '1 year'),
  created_at timestamptz DEFAULT now()
);
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "select_subscriptions" ON subscriptions FOR SELECT TO authenticated USING (
  EXISTS (SELECT 1 FROM farms f WHERE f.id = farm_id AND f.owner_id = auth.uid()) OR
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "insert_subscriptions" ON subscriptions FOR INSERT TO authenticated WITH CHECK (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "update_subscriptions" ON subscriptions FOR UPDATE TO authenticated USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
) WITH CHECK (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "delete_subscriptions" ON subscriptions FOR DELETE TO authenticated USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Firmware versions (OTA)
CREATE TABLE firmware_versions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  version text UNIQUE NOT NULL,
  device_type text NOT NULL CHECK (device_type IN ('esp32', 'gateway')),
  release_notes text,
  file_url text,
  is_latest boolean DEFAULT false,
  deployed_count int DEFAULT 0,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE firmware_versions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "select_firmware_versions" ON firmware_versions FOR SELECT TO authenticated USING (true);
CREATE POLICY "insert_firmware_versions" ON firmware_versions FOR INSERT TO authenticated WITH CHECK (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "update_firmware_versions" ON firmware_versions FOR UPDATE TO authenticated USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
) WITH CHECK (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "delete_firmware_versions" ON firmware_versions FOR DELETE TO authenticated USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Seed demo data
INSERT INTO firmware_versions (version, device_type, release_notes, is_latest, deployed_count) VALUES
('2.4.1', 'esp32', 'تحسين خوارزمية قياس الرطوبة وتوفير طاقة 15%', true, 234),
('2.3.8', 'esp32', 'إصلاح مشكلة انقطاع الاتصال بعد 24 ساعة', false, 89),
('1.8.2', 'gateway', 'دعم بروتوكول LoRa الجديد وتحسين التشفير', true, 47),
('1.7.5', 'gateway', 'تحسين الاتصال بالخادم السحابي', false, 12);
