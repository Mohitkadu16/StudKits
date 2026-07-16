import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "About StudKits - Empowering Tech Education Through Innovation",
  description: "Discover StudKits' mission to revolutionize tech education with high-quality working projects, expert guidance, and innovative solutions. Learn about our team, values, and commitment to student success.",
  openGraph: {
    title: "About StudKits | Our Mission & Team",
    description: "Discover StudKits' mission to revolutionize tech education with high-quality working projects and expert guidance.",
    images: [
      {
        url: "/images/mohit photo.jpg",
        width: 800,
        height: 600,
        alt: "StudKits Team"
      }
    ],
  }
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
