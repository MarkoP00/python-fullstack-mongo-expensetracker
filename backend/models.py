from config import db
from datetime import datetime
import uuid


class Transaction(db.Model):

    id = db.Column(db.String(36), primary_key=True,
                   default=lambda: str(uuid.uuid4()))

    transaction_amount = db.Column(db.Float(), unique=False, nullable=False)

    transaction_name = db.Column(db.String(100), unique=False,
                                 nullable=False, default="Transaction")

    transaction_date = db.Column(db.Date(), unique=False,
                                 nullable=False, default=datetime.now)

    def to_json(self):
        return {
            "id": self.id,
            "transaction_amount": self.transaction_amount,
            "transaction_name": self.transaction_name,
            "transaction_date": self.transaction_date.strftime("%Y-%m-%d")
        }
