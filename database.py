#Takes in SMS from the user and pushes it to the database
#Initialize

import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

cred = credentials.Certificate('satisfy-me-firebase.json')
firebase_admin.initialize_app(cred,
                             {'databaseURL': 'https://satisfy-me.firebaseio.com/'})



#Push to Firebase

import urllib.request
import urllib.parse
import json
from firebase_admin import db

def getMessages(apikey, inboxID):
    data =  urllib.parse.urlencode({'apikey': apikey, 'inbox_id' : inboxID})
    data = data.encode('utf-8')
    request = urllib.request.Request("https://api.textlocal.in/get_messages/?")
    f = urllib.request.urlopen(request, data)
    fr = f.read()
    return(fr)
 
s =  getMessages('apikey', '10')
s = s.decode('utf8').replace("'", '"')
s = json.loads(s)

ref = db.reference('messages')

message = s['messages']

messages_dict = message[-1]

print(messages_dict)

all_sms = ref.get()

print(all_sms)

uid = ref.push().set(messages_dict['message'])
