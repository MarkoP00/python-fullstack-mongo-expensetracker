from flask import Flask
from flask_cors import CORS
from flask_pymongo import PyMongo
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

app = Flask(__name__)

# CORS settings
CORS(app,
     origins=['http://localhost:5173',
              "https://python-fullstack-mongo-expensetrack.vercel.app"],
     supports_credentials=True,
     methods=["GET", "POST", "PATCH", "DELETE"],
     allow_headers=["Content-Type", "Authorization"])

# MongoDB configuration
print('mongo-url ->', os.getenv("MONGODB_URL"))
app.config["MONGO_URI"] = os.getenv("MONGODB_URL")
mongo = PyMongo(app)

# Connection test
try:
    mongo.db.command('ping')
    print("✅ MongoDB connection successful!")
    print(f"Connected to database: {mongo.db.name}")
except Exception as e:
    print("❌ MongoDB connection failed!")
    print(f"Error: {str(e)}")
