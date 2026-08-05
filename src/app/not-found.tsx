import Link from "next/link";

export default function RootNotFound() {
  return (
    <html lang="en">
      <body
        style={{
          display: "flex",
          minHeight: "100vh",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          background: "#131313",
          color: "#f4ede4",
          fontFamily: "sans-serif",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <h1 style={{ fontSize: "1.5rem" }}>Page not found</h1>
        <Link
          href="/en"
          style={{
            padding: "0.75rem 1.5rem",
            background: "#d4af37",
            color: "#131313",
            borderRadius: "9999px",
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          Back to Home
        </Link>
      </body>
    </html>
  );
}
