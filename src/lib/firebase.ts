
// lib/firebase.ts ou utils/firebase.ts

// lib/firebase.ts ou utils/firebase.ts

// Importe as funções que você precisa do SDKs
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'; // Exemplo para autenticação
import { getFirestore } from 'firebase/firestore'; // Exemplo para o Firestore

// Sua configuração do Firebase usando variáveis de ambiente
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Inicialize o Firebase
const app = initializeApp(firebaseConfig);

// Inicialize os serviços que você vai usar
const analytics = getAnalytics(app);
const auth = getAuth(app); // Exemplo
const db = getFirestore(app); // Exemplo

// Exporte as instâncias para uso em outros arquivos
export { app, analytics, auth, db };