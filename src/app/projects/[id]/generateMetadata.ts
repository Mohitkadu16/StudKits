import { Metadata } from 'next';
import { getProjectById } from '@/lib/projects';

type Props = {
  params: { id: string }
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProjectById(params.id);
  
  if (!project) {
    return {
      title: 'Project Not Found',
      description: 'The requested project could not be found.',
    };
  }

  const title = `${project.title} - StudKits Projects`;
  const description = project.longDescription.slice(0, 160);

  return {
    title,
    description,
    keywords: [project.category, ...project.features.slice(0, 5)],
    openGraph: {
      title,
      description,
      type: 'article',
      url: `https://studkits.shop/projects/${params.id}`,
      images: [
        {
          url: project.image,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [project.image],
    },
    alternates: {
      canonical: `https://studkits.shop/projects/${params.id}`,
    },
  };
}