// Delivery charge calculation utilities with regional pricing for Maharashtra

// Constants
export const BASE_PINCODE = 400033; // Your store/warehouse location (numeric)

// Regional delivery charges
export const DELIVERY_CHARGES = {
  FREE_ZONE: 0,           // Specific pincodes within 2.5km: 400008, 400009, 400010, 400011, 400012, 400013, 400027, 400033
  MUMBAI: 100,            // 400001 - 400104 (excluding free zone)
  PUNE: 150,              // 410001 - 413999
  NASHIK: 180,            // 422001 - 424999
  AURANGABAD: 200,        // 431001 - 431999
  VIDARBHA: 250,          // 440001 - 444999
  MAHARASHTRA: 300,       // Rest of Maharashtra (400001 - 444999)
  OUTSIDE_MAHARASHTRA: 350 // Outside Maharashtra
};

/**
 * Determine the region based on pincode
 */
export function getRegion(pincode: string): string {
  if (!isValidPincode(pincode)) {
    return 'INVALID';
  }
  
  const trimmedPincode = pincode.trim();
  const pincodeNum = parseInt(trimmedPincode, 10);
  
  // Free delivery zone - specific pincodes within 2.5km of 400033
  const freePincodes = [400008, 400009, 400010, 400011, 400012, 400013, 400027, 400033];
  const isInFreeZone = freePincodes.includes(pincodeNum);
  
  if (isInFreeZone) {
    return 'FREE_ZONE';
  }
  
  // Mumbai region (excluding free zone)
  if (pincodeNum >= 400001 && pincodeNum <= 400104) {
    return 'MUMBAI';
  }
  
  // Pune region
  if (pincodeNum >= 410001 && pincodeNum <= 413999) {
    return 'PUNE';
  }
  
  // Nashik region
  if (pincodeNum >= 422001 && pincodeNum <= 424999) {
    return 'NASHIK';
  }
  
  // Aurangabad region
  if (pincodeNum >= 431001 && pincodeNum <= 431999) {
    return 'AURANGABAD';
  }
  
  // Vidarbha region
  if (pincodeNum >= 440001 && pincodeNum <= 444999) {
    return 'VIDARBHA';
  }
  
  // Rest of Maharashtra
  if (pincodeNum >= 400001 && pincodeNum <= 444999) {
    return 'MAHARASHTRA';
  }
  
  // Outside Maharashtra
  return 'OUTSIDE_MAHARASHTRA';
}

/**
 * Get region display name
 */
export function getRegionDisplayName(region: string): string {
  const names: Record<string, string> = {
    FREE_ZONE: 'Local Area (Free Delivery)',
    MUMBAI: 'Mumbai',
    PUNE: 'Pune',
    NASHIK: 'Nashik',
    AURANGABAD: 'Aurangabad',
    VIDARBHA: 'Vidarbha',
    MAHARASHTRA: 'Maharashtra',
    OUTSIDE_MAHARASHTRA: 'Outside Maharashtra',
    INVALID: 'Invalid Pincode'
  };
  
  return names[region] || 'Unknown';
}

/**
 * Calculate delivery charge based on pincode region
 */
export function getDeliveryCharge(pincode: string): number {
  const region = getRegion(pincode);
  
  if (region === 'INVALID') {
    return 0;
  }
  
  // Explicit check for FREE_ZONE
  if (region === 'FREE_ZONE') {
    return 0;
  }
  
  const charge = DELIVERY_CHARGES[region as keyof typeof DELIVERY_CHARGES] || DELIVERY_CHARGES.OUTSIDE_MAHARASHTRA;
  return charge;
}

/**
 * Calculate distance (for backward compatibility)
 * Now returns a symbolic distance based on region
 */
export function calculateDistance(customerPincode: string): number {
  const region = getRegion(customerPincode);
  
  // Return symbolic distances for each region
  const distances: Record<string, number> = {
    FREE_ZONE: 0,
    MUMBAI: 5,
    PUNE: 50,
    NASHIK: 80,
    AURANGABAD: 150,
    VIDARBHA: 200,
    MAHARASHTRA: 100,
    OUTSIDE_MAHARASHTRA: 300,
    INVALID: -1
  };
  
  return distances[region] || 300;
}

/**
 * Check if pincode is within free delivery zone
 */
export function isWithinFreeDeliveryRange(customerPincode: string): boolean {
  return getRegion(customerPincode) === 'FREE_ZONE';
}

/**
 * Validate pincode format (basic 6-digit validation)
 */
export function isValidPincode(pincode: string): boolean {
  return /^\d{6}$/.test(pincode);
}

/**
 * Get delivery information for a pincode
 */
export function getDeliveryInfo(pincode: string): {
  region: string;
  regionName: string;
  charge: number;
  isFree: boolean;
} {
  const region = getRegion(pincode);
  const charge = getDeliveryCharge(pincode);
  
  return {
    region,
    regionName: getRegionDisplayName(region),
    charge,
    isFree: charge === 0
  };
}

