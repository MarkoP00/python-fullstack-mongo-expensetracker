from flask import request, jsonify
from config import app, db
from models import Transaction
from datetime import datetime
from services.date_utils import handleDate
from sqlalchemy.exc import SQLAlchemyError

# GET ALL TRANSACTIONS


@app.route('/', methods=['GET'])
@app.route('/transactions', methods=['GET'])
def get_transactions():
    try:
        transactions = Transaction.query.all()

        json_transactions = list(
            map(lambda transaction: transaction.to_json(), transactions))

        return jsonify({
            'transactions': json_transactions,
            "message": "Fetch successful"
        }), 200

    except SQLAlchemyError as e:
        return jsonify({
            "message": "Database error",
            "error": str(e)
        }), 400

    except Exception as e:
        return jsonify({
            "message": "Server error",
            "error": str(e)
        }), 500

# GET SINGLE TRANSACTION


@app.route('/transactions/<transaction_id>', methods=[
    'GET'
])
def get_single_transaction(transaction_id):

    transaction = Transaction.query.get(transaction_id)

    if not transaction:
        return jsonify({"message": "Transaction not found"}), 404

    return jsonify(transaction.to_json()), 200
# CREATE EXPENSE


@app.route('/transactions', methods=['POST'])
def create_transaction():
    data = request.json

    transaction_amount = data.get('transaction_amount')
    transaction_name = data.get('transaction_name')
    # expense_date = data.get('expense_date')

    # Use current date if none provided
    # if not expense_date:
    #     expense_date_obj = datetime.now().date()
    # else:
    #     try:
    #         expense_date_obj = datetime.strptime(
    #             expense_date, "%Y-%m-%d").date()
    #     except ValueError:
    #         return jsonify({"message": "Invalid date format (use YYYY-MM-DD)"}), 400

    if not transaction_name or not transaction_amount:
        return jsonify({"message": "Amount and name are required"}), 400

    new_transaction = Transaction(
        transaction_name=transaction_name,
        transaction_amount=transaction_amount,
        # expense_date=expense_date_obj
    )

    try:
        db.session.add(new_transaction)
        db.session.commit()
    except Exception as e:
        print(e)
        return jsonify({"message": str(e)}), 400

    return jsonify({"message": "Transaction created"}), 201

# UPDATE TRANSACTION


@app.route('/transactions/<transaction_id>', methods=['PATCH'])
# if i were using db.Integer, provided id should be handled like this <int:expense_id> but bcs it's a string, i have to do it like this <string:expense_id>
def update_transaction(transaction_id):
    transaction = Transaction.query.get(transaction_id)

    if not transaction:
        return jsonify({"message": "Transaction not found"}), 404

    data = request.get_json()

    if not data:
        return jsonify({"message": "No data provided"}), 400

    if not data.get("transaction_name") or not data.get("transaction_amount"):
        return jsonify({"message": "Invalid transaction data"}), 400

    transaction.transaction_name = data["transaction_name"]
    transaction.transaction_amount = data["transaction_amount"]
    # expense.expense_date = handleDate()

    db.session.commit()

    return jsonify({"message": "Fetch successfull", "transaction": transaction.to_json()}), 200

# DELETE EXPENSE


@app.route('/transactions/<transaction_id>', methods=['DELETE'])
def delete_transaction(transaction_id):
    transaction = Transaction.query.get(transaction_id)

    if not transaction:
        return jsonify({"message": "Transaction not found"}), 404

    db.session.delete(transaction)
    db.session.commit()

    return jsonify({"message": "Transaction deleted."}), 200


if __name__ == '__main__':
    with app.app_context():
        db.create_all()

    app.run(debug=True)
