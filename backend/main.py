from flask import request, jsonify
from config import app, mongo
from models import insert_transaction, get_transactions, delete_transaction, update_transaction_by_id, get_single_transaction
import os

# Init Mongo connection
print('mongo-url ->', os.getenv("MONGODB_URL"))
app.config["MONGO_URI"] = os.getenv("MONGODB_URL")
mongo.init_app(app)

# Test connection
try:
    mongo.db.command('ping')
    print("✅ MongoDB connection successful!")
    print(f"Connected to database: {mongo.db.name}")
except Exception as e:
    print("❌ MongoDB connection failed!")
    print(f"Error: {str(e)}")


@app.route('/transactions', methods=['GET'])
def fetch_transactions():
    try:
        print("Route hit!")
        transactions = list(mongo.db.transactions.find())
        print('transactions -> ', transactions)
        print("DB call done!")
        for t in transactions:
            t["_id"] = str(t["_id"])
        print("Formatting done.")
        return jsonify({
            "transactions": transactions,
            "message": "Fetch successful"
        })
    except Exception as e:
        print("ERROR:", e)
        return jsonify({"message": "Server error", 'error': str(e)}), 500


@app.route('/ping')
def ping():
    return "pong"


@app.route('/transactions/<transaction_id>', methods=['GET'])
def fetch_single_transaction(transaction_id):
    if not transaction_id or not isinstance(transaction_id, str):
        return jsonify({"message": "Invalid transaction ID"}, 400)

    try:
        transaction = get_single_transaction(transaction_id)

        if not transaction:
            return jsonify({"message": f"Transaction with id {transaction_id} was not found"}), 404

        # Convert ObjectId to string if it exists
        if "_id" in transaction:
            transaction["_id"] = str(transaction["_id"])

        return jsonify({
            "transaction": transaction,
            "message": "Transaction Found"
        }), 200

    except Exception as e:
        return jsonify({"message": "Server error", "error": str(e)}), 500

# CREATE TRANSACTION


@app.route('/transactions', methods=['POST'])
def create_transaction():
    data = request.get_json()

    transaction_amount = data.get('transaction_amount')
    transaction_name = data.get('transaction_name')

    if not transaction_name or not transaction_amount:
        return jsonify({"message": "Amount and name are required"}), 400

    try:
        new_transaction = insert_transaction(
            transaction_amount=transaction_amount,
            transaction_name=transaction_name)

        return jsonify({
            "message": "Transaction created",
            "transaction": new_transaction
        }), 201
    except Exception as e:
        return jsonify({"message": "Server error", "error": str(e)}), 500
# UPDATE TRANSACTION


@app.route('/transactions/<transaction_id>', methods=['PATCH'])
def update_transaction(transaction_id):
    try:
        data = request.get_json()

        if not data:
            return jsonify({"message": "No data provided"}), 400

        if not data.get("transaction_name") or not data.get("transaction_amount"):
            return jsonify({"message": "Invalid transaction data"}), 400

        try:
            converted_amount = float(data["transaction_amount"])
        except ValueError:
            return jsonify({"message": "transaction_amount must be a number"}), 400

        updated_transaction = update_transaction_by_id(transaction_id, {
            "transaction_name": data["transaction_name"],
            "transaction_amount": converted_amount
        })

        if updated_transaction is None:
            return jsonify({"message": "Transaction not found"}), 404

        return jsonify({
            "message": "Transaction updated successfully",
            "transaction": updated_transaction
        }), 200

    except Exception as e:
        return jsonify({"message": "Server error", "error": str(e)}), 500
# DELETE TRANSACTION


@app.route('/transactions/<transaction_id>', methods=['DELETE'])
def remove_transaction(transaction_id):
    try:
        result = delete_transaction(transaction_id)
        if result.deleted_count == 0:
            return jsonify({"message": "Transaction not found"}), 404
        return jsonify({"message": "Transaction deleted"}), 200
    except Exception as e:
        return jsonify({"message": "Error deleting transaction", "error": str(e)}), 400


# Only for local dev
if __name__ == '__main__':
    app.run(debug=True)
