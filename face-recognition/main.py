import os
import pickle
import cv2
import face_recognition
import numpy as np
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
from firebase_admin import storage
from datetime import datetime
import time
from email.message import EmailMessage
import ssl
import smtplib

cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred, {
    'databaseURL': "https://attendance-system-cff1f-default-rtdb.firebaseio.com/",
    'storageBucket': "attendance-system-cff1f.appspot.com"

})

# Test Code 
email_sender = "attendance.management.sys@gmail.com"
email_password = "hozgbzttsbqpynsn"
subject = "Face Recognized!"



# Test Code

counter = -1

cap = cv2.VideoCapture(1)
cap.set(3, 640)
cap.set(4, 480)

# Load Encoding File
file = open('EncodeFile.p','rb')
encodeListKnownWithIds = pickle.load(file)
file.close()
encodeListKnown, studentIds = encodeListKnownWithIds


while True:
    success, img = cap.read()
    imgSmall = cv2.resize(img, (640, 480))
    imgSmall = cv2.cvtColor(imgSmall, cv2.COLOR_BGR2RGB)

    currentFrameFace = face_recognition.face_locations(imgSmall)
    encodeCurrentFrame = face_recognition.face_encodings(imgSmall, currentFrameFace)

    imgBackground = img

    for encodeFace, faceLoc in zip(encodeCurrentFrame, currentFrameFace):
        matches = face_recognition.compare_faces(encodeListKnown, encodeFace)
        faceDis = face_recognition.face_distance(encodeListKnown, encodeFace)

        # print("Match:", matches)
        # print("Accuracy", faceDis)

        matchedIndex = np.argmin(faceDis)

        if matches[matchedIndex]:
            # print("Detected: ", studentIds[matchedIndex])
            id = studentIds[matchedIndex]
            if counter == 0:
                counter = 1
    if counter != 0:
        if counter == 1:
            studentInfo = db.reference(f'Students/{id}').get()
            print(studentInfo)
            datatimeObject = datetime.strptime(studentInfo['last_attendance'],"%Y-%m-%d %H:%M:%S")
            secondsElapsed = (datetime.now()  - datatimeObject).total_seconds()

            if secondsElapsed>1800:
                ref = db.reference(f'Students/{id}')
                studentInfo['face_recognized'] = True
                ref.child('face_recognized').set(studentInfo['face_recognized'])
                ref.child('last_attendance').set(datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
                reqEmail = studentInfo['email']
                print("Sending Mail To:",reqEmail)
                body = "Hey "+studentInfo['name']+"!!"+'''
Your face has been recognized by the Attendance Management System.
Kindly use the Mobile Application to confirm your Location and Mark your Attendance.
Thank You!
'''
                ## 
                email_reciever = reqEmail
                em = EmailMessage()
                em['From'] = email_sender
                em['To'] = email_reciever
                em['Subject'] = subject
                em.set_content(body)
                context = ssl.create_default_context()
                with smtplib.SMTP_SSL('smtp.gmail.com',465, context = context) as smtp:
                    smtp.login(email_sender, email_password)
                    smtp.sendmail(email_sender, email_reciever, em.as_string())
                ## 


        counter+= 1

        if counter >= 5:
            counter = 0
            studentInfo=[]

   
    if success:
        cv2.imshow("Face Attendance", imgBackground)
    # cv2.waitKey(0)
    if cv2.waitKey(1) == ord('q'):
        os.system('python addDataToDatabase.py')
        break

cap.release()
cv2.destroyAllWindows()
    







