import emailjs from '@emailjs/browser';

// EmailJS configuration
const EMAIL_SERVICE_ID = 'service_nsbwx7i';
const EMAIL_TEMPLATE_ID = 'template_td18uxa';
const EMAIL_PUBLIC_KEY = 'BjqOoUebyLRaQ_cOW';

// Initialize EmailJS with proper configuration
let isInitialized = false;
const initEmailJS = () => {
  if (typeof window !== 'undefined' && !isInitialized) {
    emailjs.init(EMAIL_PUBLIC_KEY);
    isInitialized = true;
  }
};

interface EmailData {
  name: string;
  email: string;
  subject?: string;
  message: string;
  requestType: 'project' | 'presentation';
  projectTitle?: string;
  microcontroller?: string;
  components?: string;
  topic?: string;
  instructions?: string;
  [key: string]: any; // For additional fields
}

export const sendFormEmail = async (data: EmailData) => {
  try {
    const templateParams = {
      // Basic info
      from_name: data.name,
      from_email: data.email,
      to_name: "StudKits Team",
      subject: data.subject || `New ${data.requestType} Request`,
      message: data.message,
      
      // Project specific fields
      project_title: data.projectTitle || '',
      microcontroller: data.microcontroller || '',
      components: data.components || '',
      
      // Presentation specific fields
      topic: data.topic || '',
      instructions: data.instructions || '',
      
      // Request type
      request_type: data.requestType
    };

    console.log('Sending email with params:', templateParams);
    
    // Initialize EmailJS before sending
    initEmailJS();
    
    const result = await emailjs.send(
      EMAIL_SERVICE_ID,
      EMAIL_TEMPLATE_ID,
      templateParams
    );

    console.log('Email sent successfully:', result);
    return { 
      success: true, 
      message: 'Email sent successfully!',
      result 
    };

    console.log('Email sent successfully:', result);
    return { 
      success: true, 
      message: 'Email sent successfully!',
      result 
    };
  } catch (error) {
    console.error('Failed to send email:', error);
    const errorMessage = error instanceof Error 
      ? error.message 
      : typeof error === 'string' 
        ? error 
        : 'Failed to send email. Please try again later.';
        
    return { 
      success: false, 
      message: errorMessage,
      error
    };
  }
};
