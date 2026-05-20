import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './config';

export async function createUserDocumentIfNew(user) {
  const userRef = doc(db, 'users', user.uid);
  const snap = await getDoc(userRef);
  if (snap.exists()) return;

  await setDoc(userRef, {
    uid: user.uid,
    email: user.email ?? null,
    phone: user.phoneNumber ?? null,
    createdAt: serverTimestamp(),
    displayName: null,
    onboardingComplete: false,
    voicePersona: null,
    goals: [],
    triggers: [],
    painPoints: [],
    streak: {
      current: 0,
      longest: 0,
      lastCheckIn: null,
      freezeAvailable: true,
    },
    identityStatement: null,
  });
}
