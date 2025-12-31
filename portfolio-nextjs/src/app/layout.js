import { Inter } from 'next/font/google';
import './index.css';
import './App.css';
import ScrollToTop from '@/components/ScrollToTop';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
});

export const metadata = {
  metadataBase: new URL('https://vigneshbs.xyz'),
  title: {
    default: 'Vignesh B S | AI/ML & Agentic Systems Developer',
    template: '%s | Vignesh B S',
  },
  description: 'Vignesh B S - AI/ML Engineer & Agentic Systems Developer based in Bangalore, India | Building Intelligent Systems | Portfolio showcasing innovative projects in machine learning, AI agents, and software development',
  keywords: [
    'Vignesh B S', 'Vignesh BS', 'vignesh b s', 'vignesh', 'vigneshbs', 'vigneshbs.xyz',
    'Vignesh Bangalore', 'Vignesh AI Developer', 'Vignesh Machine Learning',
    'AI Agents', 'Agentic AI', 'AI Engineer', 'ML Engineer', 'Machine Learning Developer',
    'Software Developer', 'React Developer', 'Python Developer', 'LangChain',
    'Portfolio', 'Bangalore', 'Karnataka', 'India', 'Full Stack Developer'
  ],
  authors: [{ name: 'Vignesh B S' }],
  creator: 'Vignesh B S',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://vigneshbs.xyz/',
    siteName: 'Vignesh B S Portfolio',
    title: 'Vignesh B S | AI/ML & Agentic Systems Developer',
    description: 'Portfolio of Vignesh B S - Building intelligent systems and agentic AI solutions',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Vignesh B S Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vignesh B S | AI/ML & Agentic Systems Developer',
    description: 'Portfolio of Vignesh B S - Building intelligent systems and agentic AI solutions',
    images: ['/og-image.png'],
    site: '@vigneshbs',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: 'https://vigneshbs.xyz/',
  },
  other: {
    'google-site-verification': '',
  },
};

// JSON-LD structured data
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Vignesh B S',
  alternateName: ['Vignesh BS', 'vigneshbs', 'Vignesh'],
  url: 'https://vigneshbs.xyz',
  jobTitle: 'AI/ML Engineer & Agentic Systems Developer',
  description: 'AI/ML Engineer specializing in building intelligent systems and agentic AI solutions',
  sameAs: [
    'https://github.com/vigneshbs33',
    'https://www.linkedin.com/in/vigneshbs-dev/'
  ],
  image: 'https://vigneshbs.xyz/og-image.png',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Bangalore',
    addressRegion: 'Karnataka',
    addressCountry: 'India'
  },
  knowsAbout: ['Artificial Intelligence', 'Machine Learning', 'Agentic AI', 'Python', 'React', 'LangChain'],
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Vignesh B S Portfolio',
  url: 'https://vigneshbs.xyz',
  description: 'Portfolio of Vignesh B S - AI/ML Engineer & Agentic Systems Developer',
  author: {
    '@type': 'Person',
    name: 'Vignesh B S'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body>
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}
