from flask import request, jsonify
from config import app, db
from models import Expense
from datetime import datetime
from services.date_utils import handleDate
from sqlalchemy.exc import SQLAlchemyError

# GET ALL EXPENSES


@app.route('/', methods=['GET'])
@app.route('/expenses', methods=['GET'])
def get_expenses():
    try:
        expenses = Expense.query.all()

        json_expenses = list(map(lambda expense: expense.to_json(), expenses))

        return jsonify({
            'expenses': json_expenses,
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

# GET SINGLE EXPENSE


@app.route('/expenses/<int:expense_id>', methods=[
    'GET'
])
def get_single_expense(expense_id):

    expense = Expense.query.get(expense_id)

    if not expense:
        return jsonify({"message": "Expense not found"}), 404

    return jsonify(expense.to_json()), 200
# CREATE EXPENSE


@app.route('/expenses', methods=['POST'])
def create_expense():
    data = request.json

    expense_amount = data.get('expense_amount')
    expense_name = data.get('expense_name')
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

    if not expense_amount or not expense_name:
        return jsonify({"message": "Amount and name are required"}), 400

    new_expense = Expense(
        expense_amount=expense_amount,
        expense_name=expense_name,
        # expense_date=expense_date_obj
    )

    try:
        db.session.add(new_expense)
        db.session.commit()
    except Exception as e:
        print(e)
        return jsonify({"message": str(e)}), 400

    return jsonify({"message": "Expense created"}), 201

# UPDATE EXPENSE


@app.route('/expenses/<int:expense_id>', methods=['PATCH'])
def update_expense(expense_id):

    expense = Expense.query.get(expense_id)

    if not expense:
        return jsonify({"message": "Expense not found"}), 404

    data = request.get_json()

    if not data:
        return jsonify({"message": "No data provided"}), 400

    if not data.get("expense_name") or not data.get("expense_amount"):
        return jsonify({"message": "Invalid expense data"}), 400

    expense.expense_name = data["expense_name"]
    expense.expense_amount = data["expense_amount"]
    # expense.expense_date = handleDate()

    db.session.commit()

    return jsonify({"message": "Fetch successfull", "expense": expense.to_json()}), 200

# DELETE EXPENSE


@app.route('/expenses/<int:expense_id>', methods=['DELETE'])
def delete_expense(expense_id):
    expense = Expense.query.get(expense_id)

    if not expense:
        return jsonify({"message": "Expense not found"}), 404

    db.session.delete(expense)
    db.session.commit()

    return jsonify({"message": "Expense deleted."}), 200


if __name__ == '__main__':
    with app.app_context():
        db.create_all()

    app.run(debug=True)
