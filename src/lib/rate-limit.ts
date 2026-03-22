interface RateTracker {
  count: number;
  timestamp: number;
}

const rateMap = new Map<string, RateTracker>();
const LIMIT = 5; // Maximum 5 requests per window
const WINDOW_MS = 60 * 1000; // 1 minute window

/**
 * Checks if the given IP has exceeded the allowed rate limit.
 * @param ip The IP address string
 * @returns true if allowed, false if rate limited (blocked)
 */
export function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const tracker = rateMap.get(ip);
  
  if (!tracker) {
    rateMap.set(ip, { count: 1, timestamp: now });
    return true; // Allowed
  }
  
  // If the previous tracker window has expired, start a new one
  if (now - tracker.timestamp > WINDOW_MS) {
    rateMap.set(ip, { count: 1, timestamp: now });
    return true; // Allowed
  }
  
  // We are inside the time window. Check count.
  if (tracker.count >= LIMIT) {
    return false; // Rate limited
  }
  
  tracker.count += 1;
  return true; // Allowed
}
