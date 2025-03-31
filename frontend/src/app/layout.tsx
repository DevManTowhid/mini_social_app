// app/layout.tsx

import { AuthProvider } from "../context/AuthContext"; // Adjust path as needed
import "./globals.css"; // Your global styles

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </AuthProvider>
  );
}
