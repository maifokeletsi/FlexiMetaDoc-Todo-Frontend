export interface JwtPayload {
  sub: string;       // usually user ID
  email?: string;    // optional user email
  roles?: string[];  // multiple roles
  exp?: number;      // expiration timestamp (seconds since epoch)
  // add other claims if needed
}
