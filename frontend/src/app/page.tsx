"use client";
import React from "react";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { user, signInWithGoogle, logout } = useAuth();

  useEffect(() => {
    // If the user is logged in, display their profile
    if (user) {
      console.log("User is signed in:", user);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {!user ? (
        <div>
          <button
            onClick={signInWithGoogle}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg"
          >
            Sign in with Google
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <img
            src={user.photoURL || "/default-profile.png"}
            alt="Profile"
            className="w-16 h-16 rounded-full"
          />
          <h2 className="text-2xl font-semibold mt-4">{user.displayName}</h2>
          <p className="text-gray-500">{user.email}</p>
          <button
            onClick={logout}
            className="bg-red-500 text-white py-2 px-4 rounded-lg mt-4"
          >
            Log Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
