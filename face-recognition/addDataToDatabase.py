import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred, {
    'databaseURL': "https://attendance-system-cff1f-default-rtdb.firebaseio.com/"
})

ref = db.reference('Students')
print("Database Updated")
data = {
    "721420104057": {
        "name": "Surya Kannan Kumbhar",
        "email": "suryakannankumbhar@gmail.com",
        "last_attendance": "2023-04-12 00:15:20",
        "face_recognized": False,
        "lat": "",
        "long": ""
    },
    "721420104012": {
        "name": "Jeffery",
        "email": "jefyjery10@gmail.com",
        "last_attendance": "2023-04-12 00:15:20",
        "face_recognized": False,
        "lat": "",
        "long": ""
    },
    "721420104028": {
        "name": "Muruguraj",
        "email": "muruguraj028@gmail.com",
        "last_attendance": "2023-04-12 00:15:20",
        "face_recognized": False,
        "lat": "",
        "long": ""
    },
    "721420104059": {
        "name": "Vyshnav M",
        "email": "vyshnav@gmail.com",
        "last_attendance": "2023-04-08 00:15:20",
        "face_recognized": False,
        "lat": "",
        "long": ""
    },
    "721420104031": {
        "name": "Nitin",
        "email": "zeusnitin@gmail.com",
        "last_attendance": "2023-04-12 00:15:20",
        "face_recognized": False,
        "lat": "",
        "long":""
    },
    "721420104001": {
        "name": "Abhinand B G",
        "email": "abhinandbg@gmail.com",
        "last_attendance": "2023-04-06 00:15:20",
        "face_recognized": False,
        "lat": "",
        "long": ""
    }
}

for key, value in data.items():
    ref.child(key).set(value)
