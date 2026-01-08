export interface ProductVariant {
  name: string;           // e.g., "Resistance", "Color", "Voltage"
  type: 'select' | 'radio' | 'input';
  required: boolean;
  options?: string[];     // e.g., ["10Ω", "220Ω", "1kΩ"]
  unit?: string;          // e.g., "Ω", "µF", "V"
  defaultValue?: string;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  sku?: string;
  inStock?: boolean;
  image?: string;
  hasVariants?: boolean;
  variants?: ProductVariant[];
  basePrice?: number;     // For variant-based pricing
}

export const sampleProducts: Product[] = [
  { id: 'p1', title: 'Arduino Uno (DIP)', price: 800, sku: 'A000066', inStock: true, image: '/images/comp-images/arduino uno.webp' },
  { id: 'p2', title: 'Arduino Uno (SMD)', price: 4500, sku: 'ABX00021', inStock: true, image: '/images/comp-images/arduino uno r2 wifi.webp' },
  { id: 'p3', title: 'Arduino Nano R3', price: 550, sku: 'A000005', inStock: true, image: '/images/comp-images/arduino nano r3.webp' },
  { id: 'p4', title: 'Arduino Micro', price: 1500, sku: 'A000053', inStock: true, image: '/images/comp-images/arduino micro.webp' },
  { id: 'p5', title: 'Arduino Leonardo R3', price: 500, sku: 'A000057', inStock: true, image: '/images/comp-images/arduino leonardo.webp' },
  { id: 'p6', title: 'Arduino Mega 2560  R3', price: 1000 , sku: 'A000067', inStock: true, image: '/images/comp-images/arduino mega r3.webp' },
  { id: 'p7', title: 'Arduino Lilypad', price: 550, sku: 'DEV-13342', inStock: true, image: '/images/comp-images/arduino lilypad.webp' },
  { id: 'p8', title: 'ESP32 Development Board', price: 320, sku: 'ESP32-WROOM-32', inStock: true, image: '/images/comp-images/esp32.webp' },
  { id: 'p9', title: 'Raspberry Pi 4 Model B', price: 3500, sku: 'RPI4-MODB-4GB', inStock: true, image: '/images/comp-images/rpi4.webp' },
  { id: 'p10', title: 'HC-SR04 Ultrasonic Distance Sensor', price: 85, sku: 'HC-SR04', inStock: true, image: '/images/comp-images/hc sr40 ultra sensor.webp' },
  { id: 'p11', title: 'DHT22 Temperature & Humidity Sensor', price: 180, sku: 'dht22', inStock: true, image: '/images/comp-images/dht22.webp' },
  { id: 'p12', title: 'L298N Motor Driver Module', price: 120, sku: 'L298N', inStock: true, image: '/images/comp-images/l298n driver.webp' },
  { id: 'p13', title: '16x2 Lcd with I2C Module', price: 150, sku: 'LCD-I2C', inStock: true, image: '/images/comp-images/lcd with i2c.webp' },
  { id: 'p14', title:'TFT Display', price: 1000, sku: 'TFT', inStock: true, image: '/images/comp-images/tft display.webp' },
  { id: 'p15', title: 'Breadboard and Jumper Wires Kit', price: 250, sku: 'BB-JW-KIT', inStock: true, image: '/images/comp-images/breadboard with jumper.webp' },
  { id: 'p16', title: 'Assorted Sensor Kit', price: 1200, sku: 'SENSOR-KIT', inStock: true, image: '/images/comp-images/sensor kit.webp' },
  { id: 'p17', title: 'DC Motors (Set of 2)', price: 300, sku: 'DC-MOTOR-2', inStock: true, image: '/images/comp-images/dc motors.webp' },
  { id: 'p18', title: 'LiPo Battery 3.7V 1000mAh', price: 400, sku: 'LIPO-1000MAH', inStock: true, image: '/images/comp-images/lipo battery.webp' },
  { id: 'p19', title: 'PCB Prototyping Board', price: 200, sku: 'PCB-PROTOTYPE', inStock: true, image: '/images/comp-images/pcb prototyping board.webp' }, 
  {
    id: 'p20',
    title: 'Jumper Wires (Set of 50 wires)',
    price: 50,
    sku: 'JUMPER-WIRES',
    inStock: true,
    image: '/images/comp-images/jumper-wires-set.webp',
    hasVariants: true,
    variants: [
      {
        name: 'Type',
        type: 'select',
        required: true,
        options: ['Male to Male (M-M)', 'Male to Female (M-F)', 'Female to Female (F-F)'],
        defaultValue: 'Male to Female (M-F)'
      }
    ]
  },
  { id: 'p21', title: 'Arduino Starter Kit', price: 2500, sku: 'ARD-ST-KIT', inStock: true },
  { id: 'p22', title: '9V Battery with Barrel-Jack Holder', price: 15, sku: 'BATTERY-9V', inStock: true, image: '/images/comp-images/9v battery with holder.webp' },
  { 
    id: 'p23', 
    title: 'LED', 
    price: 1, 
    sku: 'LED', 
    inStock: true, 
    image: '/images/comp-images/leds-rgb.webp',
    hasVariants: true,
    variants: [
      {
        name: 'Color',
        type: 'select',
        required: true,
        options: ['Red', 'Green', 'Blue', 'Yellow', 'White'],
        defaultValue: 'Red'
      },
      {
        name: 'Size',
        type: 'select',
        required: true,
        options: ['3mm', '5mm'],
        defaultValue: '5mm'
      }
    ]
  },
  { 
    id: 'p24', 
    title: 'Resistor', 
    price: 1, 
    sku: 'RESISTOR', 
    inStock: true, 
    image: '/images/comp-images/resistor-220.webp',
    hasVariants: true,
    variants: [
      {
        name: 'Resistance',
        type: 'select',
        required: true,
        options: ['10Ω', '22Ω', '47Ω', '100Ω', '220Ω', '330Ω', '470Ω', '1kΩ', '2.2kΩ', '4.7kΩ', '10kΩ', '22kΩ', '47kΩ', '100kΩ', '1MΩ'],
        unit: 'Ω',
        defaultValue: '220Ω'
      }
    ]
  },
  { id: 'p25', title: 'Push Button', price: 2, sku: 'PUSH-BUTTON', inStock: true, image: '/images/comp-images/push button.webp' },
  { id: 'p26', title: '4x4 Matrix PCB', price: 10, sku: 'MATRIX-4X4', inStock: true, image: '/images/comp-images/4x4 matrix pcb.webp' },
  { 
    id: 'p27', 
    title: 'Capacitor', 
    price: 1, 
    sku: 'CAPACITOR', 
    inStock: true, 
    image: '/images/comp-images/capacitor-10uf.webp',
    hasVariants: true,
    variants: [
      {
        name: 'Capacitance',
        type: 'select',
        required: true,
        options: ['10pF', '100pF', '1nF', '10nF', '100nF', '1µF', '10µF', '47µF', '100µF', '220µF', '470µF', '1000µF'],
        unit: 'F',
        defaultValue: '10µF'
      }
    ]
  },
  { 
    id: 'p28', 
    title: 'Diode', 
    price: 1, 
    sku: 'DIODE', 
    inStock: true, 
    image: '/images/comp-images/diode-1n4007.webp',
    hasVariants: true,
    variants: [
      {
        name: 'Type',
        type: 'select',
        required: true,
        options: ['1N4007 (1A, 1000V)', '1N5819 (Schottky)', 'Zener 3.3V', 'Zener 5.1V', 'Zener 9.1V', 'Zener 12V'],
        defaultValue: '1N4007 (1A, 1000V)'
      }
    ]
  },
  { 
    id: 'p29', 
    title: 'Transistor', 
    price: 1, 
    sku: 'TRANSISTOR', 
    inStock: true, 
    image: '/images/comp-images/transistor-bc547.webp',
    hasVariants: true,
    variants: [
      {
        name: 'Type',
        type: 'select',
        required: true,
        options: ['BC547 (NPN)', 'BC557 (PNP)', '2N2222 (NPN)'],
        defaultValue: 'BC547 (NPN)'
      }
    ]
  },
  { id: 'p30', title: 'IR Sensor', price: 10, sku: 'IR-SENSOR', inStock: true, image: '/images/comp-images/ir sensor.webp' },
  { id: 'p31', title: 'Bluetooth Module (HC-05 / HC-06)', price: 180, sku: 'HC-05-06', inStock: true, image: '/images/comp-images/bluetooth-hc05.webp' },
  { id: 'p32', title: 'WiFi Module (ESP8266)', price: 250, sku: 'ESP8266', inStock: true, image: '/images/comp-images/esp8266.webp' },
  { id: 'p33', title: 'GSM Module (SIM800L)', price: 450, sku: 'SIM800L', inStock: true, image: '/images/comp-images/gsm-sim800l.webp' },
  { id: 'p34', title: 'LoRa Module (SX1278)', price: 550, sku: 'SX1278', inStock: true, image: '/images/comp-images/lora-sx1278.webp' },
  { id: 'p35', title: 'NRF24L01 RF Module', price: 120, sku: 'NRF24L01', inStock: true, image: '/images/comp-images/nrf24l01.webp' },
  { id: 'p36', title: 'GPS Module (NEO-6M)', price: 350, sku: 'NEO-6M', inStock: true, image: '/images/comp-images/gps-neo6m.webp' },
  { id: 'p37', title: 'MPU6050 (Accelerometer + Gyro)', price: 200, sku: 'MPU6050', inStock: true, image: '/images/comp-images/mpu6050.webp' },
  { id: 'p38', title: 'RFID Module (RC522) + Cards', price: 150, sku: 'RC522', inStock: true, image: '/images/comp-images/rfid-rc522.webp' },
  { id: 'p39', title: 'OLED Display (0.96″ / 1.3″)', price: 280, sku: 'OLED-096-13', inStock: true, image: '/images/comp-images/oled-display-096.webp' },
  { id: 'p40', title: 'TP4056 Type-C Charging Module', price: 35, sku: 'TP4056-TYPEC', inStock: true, image: '/images/comp-images/tp4056-typec.webp' },
  { id: 'p41', title: '18650 Li-ion Battery', price: 180, sku: 'BATTERY-18650', inStock: true, image: '/images/comp-images/18650-battery.webp' },
  { id: 'p42', title: 'Battery Holder', price: 20, sku: 'BATTERY-HOLDER', inStock: true, image: '/images/comp-images/battery-holder.webp' },
  { id: 'p43', title: 'LM2596 Buck Converter', price: 80, sku: 'LM2596', inStock: true, image: '/images/comp-images/lm2596-buck.webp' },
  { id: 'p44', title: 'DC Power Jack', price: 15, sku: 'DC-JACK', inStock: true, image: '/images/comp-images/dc-power-jack.webp' },
  { id: 'p45', title: 'On/Off Switch', price: 10, sku: 'SWITCH-ONOFF', inStock: true, image: '/images/comp-images/onoff-switch.webp' },
  { id: 'p46', title: 'Relay Module (1/2/4 Channel)', price: 120, sku: 'RELAY-MODULE', inStock: true, image: '/images/comp-images/relay-module.webp' },
  { id: 'p47', title: 'Servo Motor (SG90 / MG996R)', price: 280, sku: 'SERVO-SG90-MG996R', inStock: true, image: '/images/comp-images/servo-motor-sg90.webp' },
  { id: 'p48', title: 'DC Gear Motor', price: 150, sku: 'DC-GEAR-MOTOR', inStock: true, image: '/images/comp-images/dc-gear-motor.webp' },
  { id: 'p49', title: 'Buzzer', price: 8, sku: 'BUZZER', inStock: true, image: '/images/comp-images/buzzer.webp' },
  { id: 'p50', title: 'LEDs (Normal & RGB)', price: 25, sku: 'LED-NORMAL-RGB', inStock: true, image: '/images/comp-images/leds-rgb.webp' },
  { id: 'p51', title: 'Breadboard', price: 80, sku: 'BREADBOARD', inStock: true, image: '/images/comp-images/breadboard.webp' },
  { id: 'p52', title: 'Jumper Wires (M-M, M-F, F-F)', price: 120, sku: 'JUMPER-WIRES-SET', inStock: true, image: '/images/comp-images/jumper-wires-set.webp' },
  { id: 'p53', title: 'Zero PCB / Perfboard', price: 30, sku: 'ZERO-PCB', inStock: true, image: '/images/comp-images/zero-pcb.webp' },
  { id: 'p54', title: 'Potentiometer', price: 20, sku: 'POTENTIOMETER', inStock: true, image: '/images/comp-images/potentiometer.webp' },
  { id: 'p55', title: 'Soldering Wire', price: 80, sku: 'SOLDER-WIRE', inStock: true, image: '/images/comp-images/soldering-wire.webp' },
  { id: 'p56', title: 'ESP32 IoT Kit', price: 3200, sku: 'ESP32-IOT-KIT', inStock: true },
];