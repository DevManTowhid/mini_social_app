import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, User } from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";

interface AuthContextType {
  user: User | null;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
          await setDoc(userRef, {
            uid: user.uid,
            name: user.displayName,
            email: user.email,
            profilePic: user.photoURL,
            createdAt: new Date(),
          });
        }

        setUser(user);
      }
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
// This code defines an authentication context for a React application using Firebase Authentication.
// It provides a way to manage user authentication state, including signing in with Google and logging out.
// The `AuthProvider` component wraps the application and provides the authentication context to its children.
// The `useAuth` hook allows components to access the authentication context easily.
// The code also includes error handling for sign-in and logout operations. 
// The authentication state is managed using the `onAuthStateChanged` listener from Firebase, which updates the user state whenever the authentication state changes.
// The user data is stored in Firestore when a new user signs in for the first time, ensuring that user information is available for future use.
// The code is structured to be reusable and maintainable, making it easy to integrate into a larger application. 
// The `AuthProvider` component can be used at the root level of the application to provide authentication context to all components. 
// The `useAuth` hook can be used in any component to access the authentication context, allowing for easy integration of authentication features throughout the application.
// The code is designed to be flexible and can be extended to include additional authentication methods or features as needed.
// The use of TypeScript ensures type safety and helps catch potential errors during development, making the code more robust and maintainable.
// Overall, this code provides a solid foundation for managing user authentication in a React application using Firebase Authentication and Firestore.
// It can be easily integrated into a larger application and extended to include additional features as needed.