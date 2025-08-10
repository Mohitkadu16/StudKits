
import type { LucideIcon } from 'lucide-react';
import { Laptop, Smartphone, Code2, ShoppingCart, Network, Bot, Cpu, CircuitBoard, Presentation } from 'lucide-react';

export interface Project {
  id: string;
  title: string;
  description: string; // Short description for card
  longDescription: string; // Detailed description for project page
  price: number;
  category: string;
  categoryIcon?: LucideIcon;
  image: string; // Fallback image if no 3D model
  features: string[];
  benefits: string[];
  dataAiHint?: string;
  sketchfabEmbedUrl?: string; // Optional Sketchfab embed URL
  isService?: boolean; // To differentiate services from projects
  servicePageUrl?: string; // Custom URL for services
}

export const projects: Project[] = [
  // New IoT-Based Projects
  {
    id: 'iot-1',
    title: 'Smart Home Automation',
    description: 'Voice and App controlled smart home system.',
    longDescription: 'Control your home appliances using voice commands or a mobile application. This project includes ESP32, relays for switching, various sensors for environmental data, and a breadboard for easy assembly. Ideal for modernizing your living space.',
    price: 1700,
    category: 'IoT-Based Projects',
    categoryIcon: Network,
    image: '/images/smart home automation.png',
    features: ['ESP32 Microcontroller', 'Relay Modules', 'Environment Sensors', 'Voice Control Integration', 'Mobile App Interface'],
    benefits: ['Convenient Home Control', 'Energy Savings', 'Enhanced Security', 'Customizable Automation'],
    dataAiHint: 'iot smart-home'
  },
  {
    id: 'iot-2',
    title: 'Agriculture IoT System',
    description: 'Automated irrigation based on soil moisture.',
    longDescription: 'An IoT solution for smart farming. This project uses a soil moisture sensor to monitor ground conditions and a NodeMCU to automatically control a water pump for irrigation, optimizing water usage for crops.',
    price: 2000,
    category: 'IoT-Based Projects',
    categoryIcon: Network,
    image: '/images/agriculture iot.png',
    features: ['Soil Moisture Sensor', 'NodeMCU (ESP8266)', 'Water Pump Control', 'Automated Irrigation Logic', 'Data Logging (optional)'],
    benefits: ['Water Conservation', 'Improved Crop Yield', 'Reduced Manual Labor', 'Remote Monitoring Potential'],
    dataAiHint: 'iot agriculture'
  },
  {
    id: 'iot-3',
    title: 'Machine Health Monitor',
    description: 'Monitor machine health using vibration sensors and ESP32.',
    longDescription: 'An Industry 4.0 project to monitor the health of machinery. It uses a vibration sensor to detect anomalies, an ESP32 for processing and connectivity, and an OLED display for real-time status updates. Helps in predictive maintenance.',
    price: 2500,
    category: 'IoT-Based Projects',
    categoryIcon: Network,
    image: 'https://placehold.co/600x400.png',
    features: ['Vibration Sensor', 'ESP32 Microcontroller', 'OLED Display', 'Data Analysis for Anomalies', 'Wireless Connectivity'],
    benefits: ['Predictive Maintenance', 'Reduced Downtime', 'Extended Machine Lifespan', 'Improved Safety'],
    dataAiHint: 'iot industrial'
  },
  {
    id: 'iot-4',
    title: 'Water Quality Monitoring System',
    description: 'Monitor water quality using pH and TDS sensors with Arduino.',
    longDescription: 'This system monitors water quality by measuring pH and Total Dissolved Solids (TDS) levels using dedicated sensors connected to an Arduino. Essential for environmental monitoring and ensuring water safety.',
    price: 2300,
    category: 'IoT-Based Projects',
    categoryIcon: Network,
    image: 'https://placehold.co/600x400.png',
    features: ['pH Sensor', 'TDS Sensor', 'Arduino Microcontroller', 'LCD/OLED Display (optional)', 'Data Logging'],
    benefits: ['Ensures Water Safety', 'Environmental Protection', 'Real-time Data', 'Suitable for Various Applications'],
    dataAiHint: 'iot water-quality'
  },
  // New Robotics & Automation Projects
  {
    id: 'robotics-1',
    title: 'Water Cleaning Boat',
    description: 'Autonomous boat to collect garbage from water surfaces.',
    longDescription: 'A robotic boat designed to clean water bodies by collecting floating garbage. It uses DC motors for propulsion, floaters for buoyancy, an Arduino for control, and IR sensors for navigation or obstacle detection.',
    price: 1500,
    category: 'Robotics & Automation',
    categoryIcon: Bot,
    image: 'https://placehold.co/600x400.png',
    features: ['DC Motors', 'Floaters/Buoyancy System', 'Arduino Controller', 'IR Sensors for Detection', 'Garbage Collection Mechanism'],
    benefits: ['Automated Water Cleaning', 'Environmental Improvement', 'Reduces Manual Effort', 'Scalable Design'],
    dataAiHint: 'robotics boat'
  },
  {
    id: 'robotics-2',
    title: 'Obstacle-Avoidance Robot',
    description: 'A robot that navigates autonomously by avoiding obstacles.',
    longDescription: 'This classic robotics project involves building a robot that can autonomously navigate its environment by detecting and avoiding obstacles using an ultrasonic sensor. Controlled by an Arduino, it sits on a chassis with wheels.',
    price: 1700,
    category: 'Robotics & Automation',
    categoryIcon: Bot,
    image: 'https://placehold.co/600x400.png',
    features: ['Ultrasonic Sensor', 'Arduino Microcontroller', 'Robot Chassis & Wheels', 'Motor Driver', 'Autonomous Navigation Algorithm'],
    benefits: ['Introduction to Robotics', 'Understanding Sensor Integration', 'Autonomous Movement', 'Fun and Educational'],
    dataAiHint: 'robotics autonomous'
  },
  {
    id: 'robotics-3',
    title: 'Pick & Place Robotic Arm',
    description: 'A robotic arm capable of picking up and moving objects.',
    longDescription: 'Build a functional robotic arm that can pick up small objects and place them elsewhere. This project utilizes servo motors for precise joint movements, an Arduino for control, and a gripper mechanism.',
    price: 3000,
    category: 'Robotics & Automation',
    categoryIcon: Bot,
    image: 'https://placehold.co/600x400.png',
    features: ['Servo Motors (Multiple)', 'Arduino Controller', 'Robotic Arm Structure', 'Gripper Mechanism', 'Control Interface (e.g., potentiometers or code)'],
    benefits: ['Learn about Kinematics', 'Precise Motor Control', 'Automation Principles', 'Hands-on Mechanical Assembly'],
    dataAiHint: 'robotics arm'
  },
  {
    id: 'robotics-4',
    title: 'Solar Panel Cleaning Robot',
    description: 'Automated robot for cleaning solar panels.',
    longDescription: 'An automated solution for maintaining solar panel efficiency. This robot uses a wiper motor for the cleaning mechanism, is powered by a solar panel itself (or battery), and controlled by an ESP32 for smart operations.',
    price: 2700,
    category: 'Robotics & Automation',
    categoryIcon: Bot,
    image: 'https://placehold.co/600x400.png',
    features: ['Wiper Motor & Cleaning Brush/Squeegee', 'Solar Panel for Power (optional)', 'ESP32 Microcontroller', 'Movement Mechanism (wheels/tracks)', 'Automated Cleaning Cycle'],
    benefits: ['Maintains Solar Panel Efficiency', 'Reduces Manual Cleaning', 'Water-Saving (if dry cleaning)', 'Automated Operation'],
    dataAiHint: 'robotics solar'
  },
  // New Embedded Systems Projects
  {
    id: 'embedded-1',
    title: 'Biometric Attendance System',
    description: 'Fingerprint-based attendance system with Arduino and LCD.',
    longDescription: 'A secure and reliable attendance system using a fingerprint sensor for biometric verification. The system is controlled by an Arduino and displays information on an LCD screen. Can store attendance records.',
    price: 2300,
    category: 'Embedded Systems',
    categoryIcon: Cpu,
    image: 'https://placehold.co/600x400.png',
    features: ['Fingerprint Sensor Module', 'Arduino Microcontroller', 'LCD Display', 'Real-Time Clock (RTC) (optional)', 'Data Storage (SD card/EEPROM)'],
    benefits: ['Accurate Attendance Tracking', 'Prevents Proxy Attendance', 'Easy to Use', 'Automated Record Keeping'],
    dataAiHint: 'embedded fingerprint'
  },
  {
    id: 'embedded-2',
    title: 'Smart Traffic Light Control',
    description: 'Intelligent traffic light system using IR sensors and Arduino.',
    longDescription: 'An embedded system project to create a smart traffic light controller. It uses IR sensors to detect vehicle density on different lanes and an Arduino to dynamically adjust signal timings using LEDs, optimizing traffic flow.',
    price: 1400,
    category: 'Embedded Systems',
    categoryIcon: Cpu,
    image: 'https://placehold.co/600x400.png',
    features: ['IR Sensors for Vehicle Detection', 'Arduino Microcontroller', 'LEDs for Traffic Lights', 'Dynamic Signal Timing Algorithm', 'Pedestrian Button (optional)'],
    benefits: ['Reduced Traffic Congestion', 'Improved Traffic Flow', 'Energy Efficient', 'Adaptable to Real-time Conditions'],
    dataAiHint: 'embedded traffic'
  },
  {
    id: 'embedded-3',
    title: 'Health Monitoring Wearable',
    description: 'Wearable device for monitoring pulse rate with ESP32 and OLED.',
    longDescription: 'A compact wearable device to monitor vital health signs, specifically pulse rate, using a pulse sensor. The ESP32 processes the data and displays it on an OLED screen. Can be enhanced with wireless data transmission.',
    price: 2100,
    category: 'Embedded Systems',
    categoryIcon: Cpu,
    image: 'https://placehold.co/600x400.png',
    features: ['Pulse Sensor (e.g., MAX30100 or similar)', 'ESP32 Microcontroller (with Bluetooth/Wi-Fi)', 'OLED Display', 'Compact Wearable Design', 'Battery Power'],
    benefits: ['Personal Health Tracking', 'Early Detection of Irregularities', 'Portable and Convenient', 'Potential for IoT Integration'],
    dataAiHint: 'embedded health'
  },
  {
    id: 'embedded-4',
    title: 'Voice-Controlled Wheelchair',
    description: 'Wheelchair controlled by voice commands via Arduino.',
    longDescription: 'An assistive technology project to create a wheelchair that can be controlled using voice commands. It employs a voice recognition module, motors for movement, and an Arduino to interpret commands and drive the wheelchair.',
    price: 3500,
    category: 'Embedded Systems',
    categoryIcon: Cpu,
    image: 'https://placehold.co/600x400.png',
    features: ['Voice Recognition Module (e.g., V3)', 'DC Motors & Motor Driver', 'Arduino Microcontroller', 'Wheelchair Chassis Integration', 'Safety Features (e.g., obstacle sensors - optional)'],
    benefits: ['Increased Independence for Users', 'Hands-Free Operation', 'Accessibility Solution', 'Customizable Commands'],
    dataAiHint: 'embedded assistive'
  },
  // New PCB Design & Prototyping Projects
  {
    id: 'pcb-1',
    title: 'Custom PCB Design (Single Layer)',
    description: 'Schematic capture and Gerber file generation for single-layer PCBs.',
    longDescription: 'Professional single-layer PCB design service. Includes schematic capture based on your circuit diagram and generation of Gerber files ready for manufacturing (e.g., via JLCPCB). Ideal for simple to moderately complex circuits.',
    price: 1000,
    category: 'PCB Design & Prototyping',
    categoryIcon: CircuitBoard,
    image: 'https://placehold.co/600x400.png',
    features: ['Schematic Design', 'Component Footprint Creation', 'Single-Layer Routing', 'Gerber File Generation', 'Bill of Materials (BOM) (optional)'],
    benefits: ['Professional & Compact Circuits', 'Reduced Wiring Errors', 'Reliable Performance', 'Ready for Manufacturing'],
    dataAiHint: 'pcb design'
  },
  {
    id: 'pcb-2',
    title: 'Sensor Breakout Board Design',
    description: 'Design of ready-to-use breakout boards for common sensors.',
    longDescription: 'Design and prototyping of custom breakout boards for popular sensors (e.g., DHT11, HC-SR04, MPU6050). Simplifies integration into projects by providing easy pin access and necessary support circuitry. Price is for design; manufacturing cost is separate.',
    price: 800,
    category: 'PCB Design & Prototyping',
    categoryIcon: CircuitBoard,
    image: 'https://placehold.co/600x400.png',
    features: ['Optimized for Specific Sensor', 'Easy Pin Access', 'On-board Components (if needed)', 'Compact Design', 'Gerber Files Provided'],
    benefits: ['Simplified Sensor Integration', 'Plug-and-Play Usage', 'Reduced Prototyping Time', 'Space Saving'],
    dataAiHint: 'pcb sensor'
  },
  {
    id: 'pcb-3',
    title: 'Power Management PCB Design',
    description: 'Design of PCBs for battery or solar charging circuits.',
    longDescription: 'Custom PCB design for power management solutions, including battery charging circuits (e.g., TP4056 based) or solar power harvesting systems. Ensures efficient and safe power delivery for your embedded projects.',
    price: 1200,
    category: 'PCB Design & Prototyping',
    categoryIcon: CircuitBoard,
    image: 'https://placehold.co/600x400.png',
    features: ['Battery Charging Circuit Design', 'Solar Charge Controller Design', 'Voltage Regulation', 'Protection Circuitry (overcharge, over-discharge)', 'Gerber Files Provided'],
    benefits: ['Reliable Power for Projects', 'Efficient Energy Use', 'Safe Battery Operation', 'Compact Power Solution'],
    dataAiHint: 'pcb power'
  },
  // New Presentation Service
  {
    id: 'service-1',
    title: 'Custom Presentation Service',
    description: 'Get a professional presentation for any project or topic.',
    longDescription: 'We create custom, informative presentations for any need. Whether for a college submission, a business pitch, or academic purposes, our presentations are tailored to highlight key information with a professional design. Contact us for a quote.',
    price: 500,
    category: 'Services',
    categoryIcon: Presentation,
    image: 'https://placehold.co/600x400.png',
    features: ['Tailored Content on Any Topic', 'Professional & Modern Design', 'Clear Explanations of Technical Details', 'Inclusion of Diagrams and Visuals', 'Source File Delivery (PPTX)'],
    benefits: ['Saves Time and Effort', 'Clearly Communicates Your Ideas', 'Improves Grades or Pitch Success', 'Professional Quality'],
    dataAiHint: 'presentation service',
    isService: true,
    servicePageUrl: '/custom-presentation'
  }
];

export const getProjectById = (id: string): Project | undefined => {
  return projects.find(project => project.id === id);
};

export const getCategories = (): string[] => {
  const categories = projects.map(project => project.category);
  return Array.from(new Set(categories)).sort(); // Sorted for consistent order
};

export const getCategoryIcon = (categoryName: string): LucideIcon | undefined => {
  // Find the first project in that category that has an icon defined
  const projectWithCategory = projects.find(p => p.category === categoryName && p.categoryIcon);
  if (projectWithCategory) {
    return projectWithCategory.categoryIcon;
  }
  // Fallback: if no project has a specific icon, try to return a general icon for the category if needed
  // For now, this relies on at least one project in the category defining the icon.
  // Or, you could have a mapping here:
  // if (categoryName === 'Mobile App') return Smartphone;
  return undefined;
};
