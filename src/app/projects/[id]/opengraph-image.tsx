import { ImageResponse } from 'next/og';
import { getProjectById } from '@/lib/projects';
 
export const runtime = 'edge';
export const alt = 'Project Details';
export const size = {
  width: 1200,
  height: 630,
};
 
export default async function Image({ params }: { params: { id: string } }) {
  const project = getProjectById(params.id);
  
  if (!project) {
    return new Response('Project not found', { status: 404 });
  }
 
  return new ImageResponse(
    (
      <div
        style={{
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '48px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '24px',
          }}
        >
          <img
            src={`https://studkits.shop${project.image}`}
            alt={project.title}
            width={200}
            height={200}
            style={{
              objectFit: 'contain',
              marginRight: '24px',
            }}
          />
        </div>
        <h1
          style={{
            fontSize: '48px',
            fontWeight: 'bold',
            color: '#1a1a1a',
            textAlign: 'center',
            marginBottom: '16px',
          }}
        >
          {project.title}
        </h1>
        <p
          style={{
            fontSize: '24px',
            color: '#666666',
            textAlign: 'center',
            maxWidth: '800px',
          }}
        >
          {project.longDescription.slice(0, 150)}...
        </p>
      </div>
    ),
    size
  );
}