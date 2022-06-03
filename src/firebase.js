import firebase from 'firebase/app'
import firebase2 from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDWLoS5njPvL9-TqJoK6lot2IUPtj-rYhc",
  authDomain: "fun-olympic-games-24ef8.firebaseapp.com",
  projectId: "fun-olympic-games-24ef8",
  storageBucket: "fun-olympic-games-24ef8.appspot.com",
  messagingSenderId: "927296684967",
  appId: "1:927296684967:web:727aceb14ed5e2d5a72c82"
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export const logAction = (email, action, region) => {
  const currentdate = new Date()
  const datetime =
    currentdate.getDate() +
    '/' +
    (currentdate.getMonth() + 1) +
    '/' +
    currentdate.getFullYear() +
    ' @ ' +
    currentdate.getHours() +
    ':' +
    currentdate.getMinutes() +
    ':' +
    currentdate.getSeconds()

  // Firestore function to activity by user:
  firebase
    .firestore()
    .collection('activity_log')
    .doc()
    .set({
      user: email,
      action: action,
      region: region,
      time: datetime,
    })
    .then(() => {
      console.log('Document successfully written!')
    })
    .catch((error) => {
      console.error('Error writing document: ', error)
    })
}
export const auth = firebase.auth()
export const firestore = firebase.firestore()
export const storage = firebase.storage()

export const firebaseApp = firebase2.initializeApp(
  firebaseConfig,
  'create-user',
)


