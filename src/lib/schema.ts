export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'StudKits',
  url: 'https://studkits.shop',
  logo: 'https://studkits.shop/images/studkits logo_converted.webp',
  description: 'Expert provider of IoT, Robotics, and Electronics full-fledged working projects. Custom PCB design and microcontroller solutions for engineering students and tech enthusiasts.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Mumbai',
    addressRegion: 'Maharashtra',
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
      description: 'Internet of Things working projects for smart automation and connectivity',
      url: 'https://studkits.shop/projects?category=iot'
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Robotics Projects',
      description: 'Robotics and automation working projects for learning and implementation',
      url: 'https://studkits.shop/projects?category=robotics'
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Embedded Systems',
      description: 'Embedded systems and microcontroller-based working projects',
      url: 'https://studkits.shop/projects?category=embedded'
    }
  ]
};

// --- Page Specific FAQ Schemas ---

export const homeFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What types of working projects do you offer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We offer full-fledged working projects in IoT, robotics, automation, and embedded systems. Based in Mumbai, our projects are fully assembled, tested, and include comprehensive documentation for students and professionals across India.'
      }
    },
    {
      '@type': 'Question',
      name: 'Do you provide custom project solutions?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, we specialize in custom project solutions tailored to your unique specifications. Share your project requirements with our engineering team, and we will build it from scratch.'
      }
    },
    {
      '@type': 'Question',
      name: 'Is technical support included with the projects?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolutely. We provide dedicated technical support and troubleshooting guidance to help you understand your working project completely. Our expert team is accessible via WhatsApp and email.'
      }
    }
  ]
};

export const customProjectFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How long does a custom project take to build?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Depending on the complexity, custom projects typically take between 1 to 3 weeks. Simple embedded systems take less time, while complex IoT and robotics solutions require more testing.'
      }
    },
    {
      '@type': 'Question',
      name: 'What information do I need to provide for a custom request?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Provide a detailed problem statement, required hardware components, desired functionalities, and any specific deadlines. The more detailed your request, the faster we can deliver an accurate solution.'
      }
    }
  ]
};

export const marketplaceFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Are the marketplace projects ready to use immediately?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, all marketplace projects are pre-built, tested, and guaranteed to work upon delivery. They serve as excellent practical learning tools and foundation systems for engineering students.'
      }
    },
    {
      '@type': 'Question',
      name: 'Can I request modifications to a marketplace project?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Minor modifications can sometimes be accommodated before shipping. If you need significant changes, we recommend requesting a custom project instead so we can build exactly what you need.'
      }
    }
  ]
};

// --- How-To Schemas for GEO ---

export const howToOrderSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Order a Working Project from StudKits',
  description: 'A simple step-by-step guide to browsing and ordering a full-fledged working project from the StudKits marketplace.',
  step: [
    {
      '@type': 'HowToStep',
      name: 'Browse Projects',
      text: 'Explore our catalog of IoT, robotics, and embedded systems to find the project that matches your academic or professional needs.'
    },
    {
      '@type': 'HowToStep',
      name: 'Review Specifications',
      text: 'Read the detailed hardware components, capabilities, and technical documentation provided on the specific project page.'
    },
    {
      '@type': 'HowToStep',
      name: 'Place Order',
      text: 'Add the project to your cart and complete the secure checkout process to initiate your order.'
    },
    {
      '@type': 'HowToStep',
      name: 'Receive and Learn',
      text: 'Receive your fully assembled, tested working project along with presentation materials, and start learning immediately.'
    }
  ]
};

export const howToCustomProjectSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Request a Custom Engineering Project',
  description: 'The step-by-step process for requesting and receiving a custom-built engineering project from StudKits.',
  step: [
    {
      '@type': 'HowToStep',
      name: 'Submit Requirements',
      text: 'Fill out our detailed custom project request form with your specific problem statement, desired features, and deadlines.'
    },
    {
      '@type': 'HowToStep',
      name: 'Consultation & Quote',
      text: 'Our engineering team reviews your request, discusses technical feasibility, and provides a timeline and cost estimate.'
    },
    {
      '@type': 'HowToStep',
      name: 'Development Phase',
      text: 'Upon approval, our experts design the PCB, write the microcontroller code, and assemble the hardware.'
    },
    {
      '@type': 'HowToStep',
      name: 'Testing & Delivery',
      text: 'The project undergoes rigorous functionality testing before being securely shipped to you with comprehensive documentation.'
    }
  ]
};