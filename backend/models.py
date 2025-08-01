from config import mongo
from datetime import datetime
import uuid

# GET TRANSACTIONS


def get_transactions():
    transactions = list(mongo.db.transactions.find())
    for t in transactions:
        t["_id"] = str(t["_id"])
    return transactions


# GET SINGLE TRANSACTION

def get_single_transaction(transaction_id: str):
    transaction = mongo.db.transactions.find_one({"id": transaction_id})

    return transaction

# CREATE TRANSACTION


def insert_transaction(transaction_amount, transaction_name: str = "Transaction"):
    try:
        transaction_amount = float(transaction_amount)
    except (ValueError, TypeError):
        raise ValueError("Invalid transaction amount")

    transaction = {
        "id": str(uuid.uuid4()),
        "transaction_amount": transaction_amount,
        "transaction_name": transaction_name,
        "transaction_date": datetime.now().isoformat()
    }
    mongo.db.transactions.insert_one(transaction)
    return transaction


# PATCH TRANSACTION


# UPDATED PATCH
def update_transaction_by_id(transaction_id: str, updated_data: dict):
    updated_data["transaction_date"] = datetime.now().strftime(
        "%d-%m-%Y %H:%M:%S")
    # this takes only two argumets - i have to remember
    result = mongo.db.transactions.update_one(
        {"id": transaction_id},
        {"$set": updated_data}
    )
    if result.modified_count == 1:
        return get_single_transaction(transaction_id)
    return None

# DELETE TRANSACTION


def delete_transaction(transaction_id: str):
    return mongo.db.transactions.delete_one({"id": transaction_id})
