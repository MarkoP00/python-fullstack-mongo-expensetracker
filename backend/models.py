from config import db
from datetime import datetime


class Expense(db.Model):

    id = db.Column(db.Integer, primary_key=True)

    expense_amount = db.Column(db.Float(), unique=False, nullable=False)

    expense_name = db.Column(db.String(100), unique=False,
                             nullable=False, default="Expense")

    expense_date = db.Column(db.Date(), unique=False,
                             nullable=False, default=datetime.now)

    def to_json(self):
        return {
            "id": self.id,
            "expense_amount": self.expense_amount,
            "expense_name": self.expense_name,
            "expense_date": self.expense_date.strftime("%Y-%m-%d")
        }
