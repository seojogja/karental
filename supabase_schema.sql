-- ========================================================
-- Karental App - Supabase PostgreSQL Database Schema
-- Run this script in your Supabase SQL Editor
-- ========================================================

-- Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS categories (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    icon VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. CITIES TABLE
CREATE TABLE IF NOT EXISTS cities (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    name VARCHAR(255) NOT NULL,
    province VARCHAR(255) NOT NULL,
    airport VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. CARS TABLE
CREATE TABLE IF NOT EXISTS cars (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    brand VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    year INT NOT NULL,
    category_id TEXT REFERENCES categories(id) ON DELETE SET NULL,
    city_id TEXT REFERENCES cities(id) ON DELETE SET NULL,
    price_per_day NUMERIC(12, 2) NOT NULL,
    price_with_driver NUMERIC(12, 2),
    seats INT DEFAULT 5,
    transmission VARCHAR(50) DEFAULT 'Automatic',
    fuel_type VARCHAR(50) DEFAULT 'Bensin',
    image_url TEXT,
    gallery JSONB DEFAULT '[]'::jsonb,
    features JSONB DEFAULT '[]'::jsonb,
    is_available BOOLEAN DEFAULT TRUE,
    is_popular BOOLEAN DEFAULT FALSE,
    rating NUMERIC(3, 2) DEFAULT 5.0,
    trips_completed INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. BOOKINGS TABLE
CREATE TABLE IF NOT EXISTS bookings (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    booking_code VARCHAR(50) UNIQUE NOT NULL,
    car_id TEXT REFERENCES cars(id) ON DELETE CASCADE,
    car_name VARCHAR(255) NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(50) NOT NULL,
    city VARCHAR(255) NOT NULL,
    pickup_date DATE NOT NULL,
    return_date DATE NOT NULL,
    duration_days INT NOT NULL,
    rental_type VARCHAR(50) DEFAULT 'with-driver',
    total_price NUMERIC(12, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'Pending',
    payment_status VARCHAR(50) DEFAULT 'Unpaid',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. BLOGS TABLE
CREATE TABLE IF NOT EXISTS blogs (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    cover_image TEXT,
    author VARCHAR(100) DEFAULT 'Admin Karental',
    tags JSONB DEFAULT '[]'::jsonb,
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. VOUCHERS TABLE
CREATE TABLE IF NOT EXISTS vouchers (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    code VARCHAR(50) UNIQUE NOT NULL,
    discount_percentage INT DEFAULT 0,
    discount_amount NUMERIC(12, 2) DEFAULT 0,
    max_discount NUMERIC(12, 2),
    min_transaction NUMERIC(12, 2) DEFAULT 0,
    valid_until TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. SETTINGS TABLE
CREATE TABLE IF NOT EXISTS settings (
    id VARCHAR(50) PRIMARY KEY DEFAULT 'global_settings',
    site_name VARCHAR(255) DEFAULT 'Karental',
    site_tagline VARCHAR(255) DEFAULT 'Sewa Mobil & Rental Armada Terpercaya',
    whatsapp_number VARCHAR(50) DEFAULT '6281234567890',
    hero_title VARCHAR(255),
    hero_subtitle TEXT,
    hero_cta_text VARCHAR(255) DEFAULT 'Chat WhatsApp',
    theme_color VARCHAR(50) DEFAULT '#f97316',
    seo_sas_v5_title TEXT,
    seo_sas_v5_summary TEXT,
    seo_sas_v5_content TEXT,
    seo_sas_v5_enabled BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert Default Settings
INSERT INTO settings (id, site_name, site_tagline, whatsapp_number, theme_color)
VALUES ('global_settings', 'Karental', 'Sewa Mobil & Rental Armada Terpercaya', '6281234567890', '#f97316')
ON CONFLICT (id) DO NOTHING;

-- Enable Row Level Security (RLS)
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE cities ENABLE ROW LEVEL SECURITY;
ALTER TABLE cars ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE vouchers ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Create Public Read Access Policies for Supabase
CREATE POLICY "Public read categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Public read cities" ON cities FOR SELECT USING (true);
CREATE POLICY "Public read cars" ON cars FOR SELECT USING (true);
CREATE POLICY "Public insert bookings" ON bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Public read blogs" ON blogs FOR SELECT USING (true);
CREATE POLICY "Public read settings" ON settings FOR SELECT USING (true);
