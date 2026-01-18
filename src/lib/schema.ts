export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'StudKits',
  url: 'https://studkits.shop',
  logo: 'https://studkits.shop/images/studkits logo_converted.webp',
  description: 'Expert provider of IoT, Robotics, and Electronics project kits. Custom PCB design and microcontroller solutions for students and tech enthusiasts.',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'IN',
  },
  contactPoint: [{
    '@type': 'ContactPoint',
    telephone: '+91-750-610-4767',
    contactType: 'customer service',
    availableLanguage: ['English', 'Hindi'],
  }],
  sameAs: [
    'https://github.com/Mohitkadu16',
    // Add other social media URLs here
  ],
  founder: {
    '@type': 'Person',
    name: 'Mohit Kadu',
  },
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'StudKits',
  url: 'https://studkits.shop',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://studkits.shop/?search={search_term_string}'
    },
    'query-input': 'required name=search_term_string'
  }
};

export const productCategoriesSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'IoT Projects',
      description: 'Internet of Things project kits for smart automation and connectivity',
      url: 'https://studkits.shop/projects?category=iot'
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Robotics Projects',
      description: 'Robotics and automation project kits for learning and implementation',
      url: 'https://studkits.shop/projects?category=robotics'
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Embedded Systems',
      description: 'Embedded systems and microcontroller-based project kits',
      url: 'https://studkits.shop/projects?category=embedded'
    }
  ]
};

export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What types of project kits do you offer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We offer a wide range of project kits including IoT, robotics, automation, and embedded systems. Our kits come with all necessary components and detailed documentation.'
      }
    },
    {
      '@type': 'Question',
      name: 'Do you provide custom project solutions?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, we offer custom project solutions tailored to your specific requirements. Contact us with your project details and we\'ll help you create a custom solution.'
      }
    },
    {
      '@type': 'Question',
      name: 'Can I get help with my project implementation?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolutely! We provide technical support and guidance throughout your project implementation. Our team is available via WhatsApp and email.'
      }
    }
  ]
};