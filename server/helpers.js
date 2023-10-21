import crypto from 'crypto';

export function createRandomId() {
  return crypto.randomUUID().slice(0, 6);
}
