import { NextResponse } from 'next/server';

const manifest = {
  name: "StudKits",
  short_name: "StudKits",
  description: "DIY electronics kits, projects, and custom requests for students and hobbyists.",
  start_url: "/",
  display: "standalone",
  background_color: "#ffffff",
  theme_color: "#06b6d4",
  icons: [
    { src: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
    { src: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" }
  ]
};

export function GET() {
  return NextResponse.json(manifest, {
    headers: { 'Content-Type': 'application/manifest+json' }
  });
}
