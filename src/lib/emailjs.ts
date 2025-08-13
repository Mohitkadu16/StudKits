import emailjs from '@emailjs/browser';

// Initialize with your EmailJS public key
emailjs.init("6RiCVhLH21Obe8p24"); // You'll get this from EmailJS dashboard

interface EmailData {
  name: string;
  email: string;
  subject?: string;
  message: string;
  requestType: 'project' | 'presentation';
  [key: string]: any; // For additional fields
}

export const sendFormEmail = async (data: EmailData) => {
  try {
    const templateParams = {
      from_name: data.name,
      from_email: data.email,
      to_name: "StudKits Team",
      request_type: data.requestType,
      ...data
    };

    const result = await emailjs.send(
      'service_nsbwx7i', // You'll get this from EmailJS dashboard
      'template_yawmfuf', // You'll get this from EmailJS dashboard
      templateParams
    );

    return { success: true, message: 'Email sent successfully!' };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Failed to send email' 
    };
  }
};
