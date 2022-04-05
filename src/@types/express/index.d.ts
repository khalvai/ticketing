declare global {
  namespace Express {
    interface Request {
      user: { email: string; isAdmin: Boolean };
    }
  }
}
