import firebase from 'firebase/app'
import 'firebase/auth'

const firebaseUseEmulator = !!process.env.NEXT_PUBLIC_FIREBASE_AUTH_USE_EMULATOR

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
}

export default function initFirebase(): void {
  if (!firebase.apps.length) {
    if (firebaseUseEmulator) {
      firebase.initializeApp({ apiKey: 'foo' })

      // TODO: mock `useEmulator` with jest to suppress console warning
      if (process.env.NODE_ENV == 'test') {
        firebase.auth()
      } else {
        firebase.auth().useEmulator('http://localhost:9099/')
      }

      // eslint-disable-next-line no-console
      console.info('Firebase Init with Emulator mode')
    } else {
      firebase.initializeApp(config)

      // eslint-disable-next-line no-console
      console.info('Firebase Init with config')
    }
  }
}
