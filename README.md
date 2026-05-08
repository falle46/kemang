# Batik Kemang - AI Identification Platform

Platform web untuk mengidentifikasi batik Kemang menggunakan teknologi AI dan Keras. Aplikasi ini dirancang untuk melestarikan warisan budaya batik Indonesia dengan menyediakan identifikasi otomatis, manajemen riwayat, dan informasi HAKI (Hak Atas Kekayaan Intelektual).

## Fitur Utama

- **Identifikasi Batik Real-time**: Upload gambar batik untuk mendapatkan identifikasi instan menggunakan model Keras
- **Sistem Autentikasi**: Daftar dan masuk untuk menyimpan riwayat identifikasi
- **Manajemen Riwayat**: Akses semua hasil identifikasi yang telah disimpan
- **Koleksi HAKI**: Jelajahi dan pelajari batik yang dilindungi oleh Hak Atas Kekayaan Intelektual
- **Galeri Interaktif**: Slider otomatis menampilkan koleksi batik dan proses pembuatan
- **Responsive Design**: Aplikasi dapat diakses di desktop, tablet, dan mobile

## Tech Stack

### Frontend
- **Next.js 16** - React framework dengan server-side rendering
- **TypeScript** - Type safety untuk JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide Icons** - Icon library modern
- **SWR** - Data fetching library (untuk integrasi future)

### Backend
- **Python 3.9+** - Runtime language
- **Flask** - Lightweight web framework
- **TensorFlow 2.15** - Deep learning framework
- **Keras** - Neural networks API
- **Flask-CORS** - Cross-origin resource sharing
- **PyJWT** - JWT authentication

### Database (Future Integration)
- **Supabase** - PostgreSQL database dengan built-in authentication
- Atau alternatif: **Neon PostgreSQL**

## Prerequisites

Sebelum memulai, pastikan Anda telah menginstal:

- **Node.js 18+** - https://nodejs.org/
- **Python 3.9+** - https://www.python.org/
- **Git** - https://git-scm.com/
- **pnpm** - `npm install -g pnpm` (atau gunakan npm/yarn)
- **pip** - Biasanya sudah included dengan Python
- **Virtual Environment tools** - `python -m venv` (built-in) atau `virtualenv`

## Project Structure

```
batik-kemang/
├── app/                          # Next.js app directory
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home page
│   ├── globals.css               # Global styles
│   ├── login/
│   │   └── page.tsx              # Login page
│   ├── signup/
│   │   └── page.tsx              # Signup page
│   ├── result/
│   │   └── [id]/
│   │       └── page.tsx          # Identification result page
│   ├── history/
│   │   └── page.tsx              # User history page
│   └── haki/
│       ├── page.tsx              # HAKI collection page
│       └── [id]/
│           └── page.tsx          # HAKI detail page
├── components/                   # React components
│   ├── navigation.tsx            # Navigation bar
│   ├── footer.tsx                # Footer
│   ├── sections/                 # Page sections
│   │   ├── hero-section.tsx      # Upload dan identifikasi
│   │   ├── about-section.tsx     # Tentang batik
│   │   ├── haki-grid-section.tsx # Koleksi HAKI grid
│   │   └── gallery-section.tsx   # Galeri slider
│   ├── modals/
│   │   └── login-prompt-modal.tsx # Modal login prompt
│   └── ui/                       # shadcn/ui components
├── hooks/
│   └── use-auth.ts               # Auth hook
├── backend/                      # Python Flask backend
│   ├── app.py                    # Main Flask application
│   ├── requirements.txt          # Python dependencies
│   ├── .env.example              # Example environment variables
│   └── models/
│       └── batik_kemang_modelv2.keras  # Pre-trained Keras model
├── public/                       # Static files
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.mjs
└── README.md
```

## Instalasi & Setup

### 1. Clone Repository

```bash
git clone <repository-url>
cd batik-kemang
```

### 2. Setup Frontend (Next.js)

```bash
# Install dependencies
pnpm install

# Copy environment variables template
cp .env.example .env.local

# Edit .env.local dengan konfigurasi Anda
# NEXT_PUBLIC_API_URL=http://localhost:5000
```

### 3. Setup Backend (Python)

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Copy environment variables template
cp .env.example .env

# Edit .env dengan konfigurasi Anda
# PORT=5000
# SECRET_KEY=your-secret-key-here
# FLASK_ENV=development
```

### 4. Siapkan Keras Model

Pastikan file model `batik_kemang_modelv2.keras` sudah ada di folder:
```
backend/models/batik_kemang_modelv2.keras
```

Jika belum memiliki model, hubungi tim development untuk mendapatkan file model terlatih.

## Menjalankan Aplikasi

### Terminal 1: Jalankan Backend Flask

```bash
cd backend

# Activate virtual environment (jika belum)
source venv/bin/activate  # macOS/Linux
# atau
venv\Scripts\activate     # Windows

# Run Flask server
python app.py

# Server akan berjalan di http://localhost:5000
```

### Terminal 2: Jalankan Frontend Next.js

```bash
cd ..  # Kembali ke root directory

# Run development server
pnpm dev

# Server akan berjalan di http://localhost:3000
```

Buka browser Anda dan akses: **http://localhost:3000**

## API Endpoints

### Authentication

#### Register (Signup)
```
POST /api/auth/signup
Content-Type: application/json

{
  "username": "username",
  "password": "password"
}

Response:
{
  "success": true,
  "user": {
    "id": "user_username",
    "username": "username"
  },
  "token": "jwt_token_here"
}
```

#### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "username": "username",
  "password": "password"
}

Response:
{
  "success": true,
  "user": {
    "id": "user_username",
    "username": "username"
  },
  "token": "jwt_token_here"
}
```

#### Get Current User
```
GET /api/auth/me
Authorization: Bearer <token>

Response:
{
  "user": {
    "id": "user_id",
    "username": "username"
  }
}
```

#### Logout
```
POST /api/auth/logout

Response:
{
  "success": true,
  "message": "Logged out successfully"
}
```

### Batik Identification

#### Identify Batik
```
POST /api/identify
Content-Type: multipart/form-data

FormData:
- image: <image_file>

Response:
{
  "success": true,
  "data": {
    "class_id": 0,
    "batik_type": "Batik Parang",
    "region": "Yogyakarta",
    "confidence": 92.5,
    "description": "Deskripsi batik...",
    "haki_id": "1",
    "identified_at": "2024-05-08T10:30:00Z",
    "all_predictions": {
      "0": {"name": "Batik Parang", "confidence": 92.5},
      "1": {"name": "Batik Kawung", "confidence": 5.2},
      ...
    }
  }
}
```

#### Health Check
```
GET /health

Response:
{
  "status": "healthy",
  "model_loaded": true,
  "timestamp": "2024-05-08T10:30:00Z"
}
```

## Database Schema (Supabase)

Untuk integrasi lengkap dengan database, buat tabel-tabel berikut di Supabase:

### 1. Users Table
```sql
create table users (
  id bigserial primary key,
  username varchar(255) unique not null,
  password_hash varchar(255) not null,
  email varchar(255),
  created_at timestamp with time zone default current_timestamp,
  updated_at timestamp with time zone default current_timestamp
);
```

### 2. Identification History Table
```sql
create table identification_history (
  id bigserial primary key,
  user_id bigint references users(id) on delete cascade,
  batik_type varchar(255) not null,
  confidence float not null,
  region varchar(255),
  image_url varchar(500),
  identified_at timestamp with time zone default current_timestamp,
  created_at timestamp with time zone default current_timestamp
);
```

### 3. HAKI Database Table
```sql
create table haki_batik (
  id bigserial primary key,
  name varchar(255) not null unique,
  region varchar(255),
  certificate_number varchar(255) unique,
  year_registered integer,
  artisan varchar(255),
  description text,
  historical_background text,
  cultural_significance text,
  techniques text[],
  certificate_image_url varchar(500),
  created_at timestamp with time zone default current_timestamp
);
```

### 4. Gallery Images Table
```sql
create table gallery_images (
  id bigserial primary key,
  title varchar(255) not null,
  category varchar(50),
  image_url varchar(500) not null,
  description text,
  created_at timestamp with time zone default current_timestamp
);
```

## Environment Variables

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_APP_NAME=Batik Kemang
```

### Backend (.env)
```
PORT=5000
FLASK_ENV=development
SECRET_KEY=your-secret-key-here-change-in-production
JWT_EXPIRATION_HOURS=24
CORS_ALLOWED_ORIGINS=http://localhost:3000
MODEL_PATH=./models/batik_kemang_modelv2.keras
```

Untuk production, gunakan environment variables yang aman dan tidak commit `.env` ke repository.

## Development Guide

### Menambah Model Baru

Jika ingin menambah batik class baru, update `BATIK_CLASSES` di `backend/app.py`:

```python
BATIK_CLASSES = {
    0: {
        'name': 'Batik Name',
        'region': 'Region',
        'description': 'Description...',
        'haki_id': 'haki_id'
    },
    # ... tambahkan lebih banyak
}
```

Pastikan model Keras sudah dilatih dengan class baru sebelumnya.

### Menambah Fitur Baru

1. **Frontend**: Tambahkan components di `components/` dan pages di `app/`
2. **Backend**: Tambahkan routes baru di `backend/app.py`
3. **Styling**: Update colors dan styles di `app/globals.css` dan `tailwind.config.ts`

### Testing Lokal

```bash
# Test API endpoint dengan curl
curl -X POST http://localhost:5000/health

# Test image upload
curl -X POST http://localhost:5000/api/identify \
  -F "image=@/path/to/image.jpg"
```

## Building & Deployment

### Build Frontend

```bash
# Build production bundle
pnpm build

# Start production server
pnpm start
```

### Deploy to Vercel

1. Push code ke GitHub repository
2. Connect repository ke Vercel
3. Set environment variables di Vercel dashboard
4. Deploy akan otomatis trigger

```bash
# Alternative: Deploy dengan Vercel CLI
npm install -g vercel
vercel
```

### Deploy Backend

#### Option 1: Railway.app
```bash
# Push ke GitHub, connect dengan Railway, auto-deploy
```

#### Option 2: Render.com
```bash
# Create new Web Service, connect GitHub
# Gunakan requirements.txt sebagai dependency file
```

#### Option 3: PythonAnywhere
```bash
# Upload files, setup virtual environment
# Configure WSGI file untuk Flask
```

#### Option 4: Cloud Run (Google Cloud)
```bash
gcloud run deploy batik-kemang \
  --source . \
  --platform managed \
  --region us-central1
```

## Troubleshooting

### Model tidak terbaca
```
Error: Error loading model
```
**Solusi**: Pastikan file `batik_kemang_modelv2.keras` ada di folder `backend/models/`

### CORS Error
```
Access-Control-Allow-Origin error
```
**Solusi**: Update `CORS_ALLOWED_ORIGINS` di `.env` backend

### Port sudah digunakan
```
Address already in use: port 5000 / port 3000
```
**Solusi**: Kill process atau ubah PORT di `.env`

### Dependencies error
```
ModuleNotFoundError: No module named 'tensorflow'
```
**Solusi**: Install requirements: `pip install -r backend/requirements.txt`

## Performance Optimization

- Model caching di memory untuk inference lebih cepat
- Image compression untuk upload yang lebih efisien
- Database query optimization dengan indexing
- Frontend code splitting dan lazy loading

## Security Best Practices

- Jangan commit `.env` file ke git
- Gunakan strong SECRET_KEY untuk production
- Enable HTTPS di production
- Validate semua user input
- Use parameterized queries untuk database
- Implement rate limiting untuk API endpoints

## Contributing

1. Fork repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

## License

Proyek ini dilindungi oleh lisensi MIT. Lihat file `LICENSE` untuk detail lebih lanjut.

## Support & Contact

Untuk pertanyaan, issue, atau saran:
- Email: support@batiksemang.id
- GitHub Issues: [Create Issue](https://github.com/batik-kemang/issues)
- Documentation: https://docs.batiksemang.id

## Acknowledgments

- Tim pengrajin batik tradisional Yogyakarta
- TensorFlow dan Keras team
- Next.js dan Vercel community
- Supabase untuk database solutions

---

**Dibuat dengan passion untuk melestarikan warisan budaya batik Indonesia** 🎨
