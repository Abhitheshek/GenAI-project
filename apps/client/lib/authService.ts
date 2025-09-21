import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

export interface AuthUser {
  uid: string;
  email: string;
  name: string;
  role: 'artisan' | 'buyer';
  preferredLanguage: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  role: 'artisan' | 'buyer';
  preferredLanguage: string;
}

export const authService = {
  async register(data: RegisterData): Promise<void> {
    const { email, password, name, role, preferredLanguage } = data;
    
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      email,
      name,
      role,
      preferredLanguage,
      createdAt: new Date()
    });
  },

  async login(data: LoginData): Promise<{ user: AuthUser; token: string }> {
    const { email, password } = data;
    
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;
    const token = await firebaseUser.getIdToken();
    
    const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
    if (!userDoc.exists()) {
      throw new Error('User profile not found');
    }
    
    const userData = userDoc.data() as AuthUser;
    return { user: userData, token };
  },

  async logout(): Promise<void> {
    await signOut(auth);
    localStorage.removeItem('authUser');
  },

  getCurrentUser(): AuthUser | null {
    const user = localStorage.getItem('authUser');
    return user ? JSON.parse(user) : null;
  },

  setCurrentUser(user: AuthUser): void {
    localStorage.setItem('authUser', JSON.stringify(user));
  },

  onAuthStateChange(callback: (user: AuthUser | null) => void): () => void {
    return onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data() as AuthUser;
            this.setCurrentUser(userData);
            callback(userData);
          } else {
            callback(null);
          }
        } catch (error) {
          callback(null);
        }
      } else {
        localStorage.removeItem('authUser');
        callback(null);
      }
    });
  }
};