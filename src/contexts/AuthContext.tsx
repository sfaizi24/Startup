'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  User,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  AuthError
} from 'firebase/auth';
import { auth, db } from '@/lib/firebase/firebase'; // Import db
import { doc, setDoc, serverTimestamp, Timestamp, FieldValue } from "firebase/firestore"; // Import Firestore functions

interface UserProfileData {
  uid: string;
  email: string | null;
  firstName: string;
  lastName: string;
  displayName: string;
  birthday: string; // Store as string, consider ISO format YYYY-MM-DD
  createdAt: Timestamp | FieldValue; // Allow FieldValue for writing, will be Timestamp on read
  // Add any other fields you want to store
}

interface AuthContextType {
  currentUser: User | null;
  loading: boolean; // This will now primarily indicate initial auth state loading
  loginWithGoogle: () => Promise<void>;
  signUpWithEmailPassword: (email: string, password: string, firstName: string, lastName: string, birthday: string) => Promise<{ success: boolean; error?: AuthError }>;
  signInWithEmailPassword: (email: string, password: string) => Promise<{ success: boolean; error?: AuthError }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const googleProvider = new GoogleAuthProvider();

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // True until initial onAuthStateChanged completes

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("onAuthStateChanged - User:", user.uid, "DisplayName:", user.displayName);
      }
      setCurrentUser(user);
      setLoading(false); // Initial auth check is done
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    // setLoading(true); // Removed: Let onAuthStateChanged handle state post-operation
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const user = userCredential.user;
      // Check if user data already exists in Firestore to prevent overwriting (optional for Google Sign-In)
      // This is more relevant if you want to collect additional info for Google Sign-In users on their first login
      // For now, assuming Google Sign-In has all necessary info or will be handled separately.
      console.log("Google sign-in successful for:", user.displayName);
    } catch (error) {
      console.error("Error during Google sign-in:", error);
      // Propagate or handle error appropriately for UI if needed
    }
  };

  const signUpWithEmailPassword = async (
    email: string, 
    password: string, 
    firstName: string, 
    lastName: string, 
    birthday: string
  ): Promise<{ success: boolean; error?: AuthError }> => {
    // setLoading(true); // Removed
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const displayName = `${firstName} ${lastName}`;

      // 1. Update Firebase Auth profile (displayName)
      await updateProfile(user, { displayName });

      // 2. Save additional user data to Firestore
      const userDocRef = doc(db, "users", user.uid);
      const userProfile: UserProfileData = {
        uid: user.uid,
        email: user.email,
        firstName,
        lastName,
        displayName, // Store it here as well for easier querying if needed
        birthday, // Ensure this is in a consistent format, e.g., YYYY-MM-DD
        createdAt: serverTimestamp() // Adds a server-side timestamp
      };
      await setDoc(userDocRef, userProfile);
      
      // Manually update the currentUser state in the context
      // because onAuthStateChanged might not fire again for profile updates.
      // auth.currentUser should reflect the updated profile.
      if (auth.currentUser) {
        setCurrentUser({ ...auth.currentUser }); // Create a new object to ensure React detects the change
      }
      
      console.log("User created, profile updated, and data stored in Firestore.");
      
      // onAuthStateChanged will update the currentUser in context.
      // The displayName might take a moment to propagate to the currentUser object from onAuthStateChanged.

      return { success: true };
    } catch (error) {
      console.error("Error during email/password sign-up and data storage:", error);
      return { success: false, error: error as AuthError };
    }
  };

  const signInWithEmailPassword = async (email: string, password: string): Promise<{ success: boolean; error?: AuthError }> => {
    // setLoading(true); // Removed
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // onAuthStateChanged will update currentUser and setLoading(false) via the listener
      return { success: true };
    } catch (error) {
      console.error("Error during email/password sign-in:", error);
      return { success: false, error: error as AuthError };
    }
  };

  const logout = async () => {
    // setLoading(true); // Removed
    try {
      await signOut(auth);
      // onAuthStateChanged will set currentUser to null and setLoading(false) via the listener
    } catch (error) {
      console.error("Error during sign-out:", error);
    }
  };

  const value = {
    currentUser,
    loading,
    loginWithGoogle,
    signUpWithEmailPassword,
    signInWithEmailPassword,
    logout,
  };

  // Render children immediately; consuming components can use the 'loading' state
  // to show appropriate UI (e.g., skeletons, spinners) instead of delaying child rendering.
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 