import { getProjectById } from '@/lib/projects';
import { generateProjectStructuredData } from '@/lib/structured-data';
import Script from 'next/script';

export default function ProjectStructuredData({ id }: { id: string }) {
  const project = getProjectById(id);
  
  if (!project) {
    return null;
  }

  const structuredData = generateProjectStructuredData(project);

  return (
    <Script id="structured-data" type="application/ld+json">
      {JSON.stringify(structuredData)}
    </Script>
  );
}