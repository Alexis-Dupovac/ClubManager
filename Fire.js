import { initializeApp } from 'firebase/app'
import { getFirestore,collection,addDoc,query,orderBy,onSnapshot,
  doc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCOV0ATmCFA3yO_30gmXoJAsf0t3iQT2mY",
  authDomain: "football-2fbc0.firebaseapp.com",
  projectId: "football-2fbc0",
  storageBucket: "football-2fbc0.appspot.com",
  messagingSenderId: "61203166101",
  appId: "1:61203166101:web:800ba561fceb461c24fc9c",
  measurementId: "G-Z69LZLD6QM"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export const getFootball = callback => {
  const q = query(collection(db, 'football'), orderBy('title', 'asc'))
  onSnapshot(q, snapshot => {
    let football = []
    snapshot.forEach(doc => {
      football.push({ id: doc.id, ...doc.data() })
    })
    callback(football)
  })
}

export const addFootball = football => {
  addDoc(collection(db, 'football'), football)
}

export const updateFootball = football => {
  updateDoc(doc(db, 'football', football.id), football)
}

export const deleteFootball = football => {
  deleteDoc(doc(db, 'football', football.id))
}

export { app };