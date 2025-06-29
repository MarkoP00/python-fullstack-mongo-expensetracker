from datetime import datetime


def handleDate():
    current_date = datetime.now().date()
    print(current_date)
    return current_date
