from flask import Flask
from flask_cors import CORS
from flask_pymongo import PyMongo
from dotenv import load_dotenv
import os

# loading environment variables
load_dotenv()

app = Flask(__name__)

# My CORS settings
CORS(app, origins=['http://localhost:5173', "https://python-fullstack-mongo-expensetrack.vercel.app/"], supports_credentials=True,
     methods=["GET", "POST", "PATCH", "DELETE"], allow_headers=["Content-Type", "Authorization"])

app.config["MONGO_URI"] = os.getenv("MONGODB_URL")

mongo = PyMongo(app)
