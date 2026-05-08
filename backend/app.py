"""
Batik Kemang AI Identification Backend
Sesuai dengan logika Google Colab ResNet50
"""

import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras.applications.resnet50 import preprocess_input
import numpy as np
from PIL import Image
import io
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Configuration
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'kunci-rahasia-skripsi-falleryan-2026')

# Load Keras Model
try:
    MODEL_PATH = os.path.join(os.path.dirname(__file__), 'models', 'batik_kemang_modelv2.keras')
    model = keras.models.load_model(MODEL_PATH)
    print(f"✅ Model loaded successfully from {MODEL_PATH}")
except Exception as e:
    print(f"❌ Error loading model: {e}")
    model = None

# Daftar Nama Kelas Sesuai Google Colab (20 Kelas)
BATIK_CLASSES = {
    0: 'Bokor Kencono', 1: 'Buketan', 2: 'Dayak', 3: 'Jlamprang',
    4: 'Kawung', 5: 'Kemang', 6: 'Liong', 7: 'Mega Mendung',
    8: 'Parang', 9: 'Sekarjagad', 10: 'Sidoluhur', 11: 'Sidomukti',
    12: 'Sidomulyo', 13: 'Singa Barong', 14: 'Srikaton', 15: 'Tribusono',
    16: 'Tujuh Rupa', 17: 'Tuntrum', 18: 'Wahyu Tumurun', 19: 'Wirasat'
}

def preprocess_image(image_data, target_size=(224, 224)):
    """
    Preprocess gambar wajib menggunakan preprocess_input ResNet50 
    agar hasil sama dengan Google Colab.
    """
    try:
        img = Image.open(io.BytesIO(image_data))
        
        # Convert ke RGB (karena ResNet50 butuh 3 channel)
        if img.mode != 'RGB':
            img = img.convert('RGB')
        
        # Resize gambar sesuai input model
        img = img.resize(target_size, Image.Resampling.LANCZOS)
        
        # Convert ke array (0-255)
        img_array = np.array(img)
        
        # Tambah dimensi batch (1, 224, 224, 3)
        img_batch = np.expand_dims(img_array, axis=0)
        
        # PREPROCESSING KHUSUS RESNET50 (Sangat Penting!)
        img_preprocessed = preprocess_input(img_batch)
        
        return img_preprocessed
    except Exception as e:
        raise ValueError(f"Error preprocessing image: {str(e)}")

def identify_batik_logic(image_data):
    """
    Logika Identifikasi sesuai skenario skripsi
    """
    if model is None:
        raise Exception("Model AI tidak ditemukan di folder models/")
    
    # Preprocess
    processed_image = preprocess_image(image_data)
    
    # Prediksi
    predictions = model.predict(processed_image, verbose=0)
    
    # Ambil index dengan probabilitas tertinggi
    class_id = np.argmax(predictions[0])
    confidence = float(predictions[0][class_id]) # Skala 0.0 - 1.0
    
    # Ambil nama label asli dari daftar
    raw_label = BATIK_CLASSES.get(class_id, 'Unknown')
    
    # Tentukan Threshold (Sesuai Colab: 0.7 atau 70%)
    threshold = 0.7
    
    if confidence < threshold:
        # Skenario 3: Tidak Dikenali
        batik_type = "Bukan Batik Kemang"
        description = "Gambar tidak cukup jelas atau sistem tidak mengenali motif ini sebagai bagian dari database Batik Kemang Bogor."
    else:
        if raw_label.lower() == 'kemang':
            # Skenario 1: Ini Batik Kemang
            batik_type = "Batik Kemang"
            description = "Ini adalah Batik Kemang asli Bogor. Motif ini telah terdata dalam koleksi pelestarian budaya."
        else:
            # Skenario 2: Bukan Batik Kemang, tapi mirip motif lain
            batik_type = f"Bukan Batik Kemang (Terlihat seperti Batik {raw_label})"
            description = f"Model mendeteksi motif ini memiliki kemiripan visual dengan Batik {raw_label}."

    return {
        'class_id': int(class_id),
        'batik_type': batik_type,
        'confidence': round(confidence * 100, 2), # Jadi persen (misal 99.46)
        'description': description,
        'raw_label': raw_label,
        'identified_at': datetime.utcnow().isoformat()
    }

# --- ROUTES API ---

@app.route('/health', methods=['GET'])
def health():
    return jsonify({
        'status': 'healthy',
        'model_loaded': model is not None,
        'python_version': '3.11'
    })

@app.route('/api/identify', methods=['POST'])
def identify():
    try:
        if 'image' not in request.files:
            return jsonify({'error': 'No image provided'}), 400
        
        image_file = request.files['image']
        image_data = image_file.read()
        
        # Jalankan fungsi identifikasi
        result = identify_batik_logic(image_data)
        
        return jsonify({
            'success': True,
            'data': result
        }), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    # Jalankan Flask di port 5000
    app.run(host='0.0.0.0', port=5000, debug=False)