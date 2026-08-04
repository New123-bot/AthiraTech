export interface MetaProps {
  title?: string;
  description?: string;
  ogImage?: string;
  url?: string;
}

export function generateSeoMetadata({
  title = 'Athira Technology | Enterprise AI Software Engineer Platform',
  description = 'Athira Technology delivers enterprise-grade AI SDLC agents that write, test, and deploy code with unprecedented precision and speed.',
  ogImage = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
  url = 'https://athira.tech'
}: MetaProps = {}) {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: 'Athira Technology',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title
        }
      ],
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage]
    }
  };
}
