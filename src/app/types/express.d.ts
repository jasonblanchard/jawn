declare namespace Express {
  export interface Request {
    accessTokenPayload: {
      id: string
    }
  }
}