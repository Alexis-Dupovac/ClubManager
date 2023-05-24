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

export const getMovies = callback => {
  const q = query(collection(db, 'movies'), orderBy('title', 'asc'))
  onSnapshot(q, snapshot => {
    let movies = []
    snapshot.forEach(doc => {
      movies.push({ id: doc.id, ...doc.data() })
    })
    callback(movies)
  })
}

export const addMovie = movie => {
  addDoc(collection(db, 'movies'), movie)
}

export const updateMovie = movie => {
  updateDoc(doc(db, 'movies', movie.id), movie)
}

export const deleteMovie = movie => {
  deleteDoc(doc(db, 'movies', movie.id))
}


