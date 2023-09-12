from email.message import EmailMessage
import ssl
import smtplib

email_sender = "suryakannankumbhar@gmail.com"
email_password = "aqwzvqlkeunvqhen"
email_reciever = ""

subject = "Face Recognized!"
body = '''
Hey!
Your face has been recognized by the Attendance Management System.
Kindly use the Mobile Application to confirm your Location and Mark your Attendance.
Thank You!
'''

em = EmailMessage()
em['From'] = email_sender
em['To'] = email_reciever
em['Subject'] = subject
em.set_content(body)

context = ssl.create_default_context()

with smtplib.SMTP_SSL('smtp.gmail.com',465, context = context) as smtp:
    smtp.login(email_sender, email_password)
    smtp.sendmail(email_sender, email_reciever, em.as_string())