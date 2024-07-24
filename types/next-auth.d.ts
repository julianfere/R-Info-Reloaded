import NextAuth, {
  DefaultSession,
  GetTokenParams as DefaultGetTokenParams,
  JWT as DefaultJWT,
  type User
} from 'next-auth';

declare module 'next-auth' {
  type UserSession = DefaultSession['user'] & {
    id: string;
  };
  interface Session {
    user: UserSession;
    error?: 'RefreshAccessTokenError';
  }

  interface CredentialsInputs {
    email: string;
    password: string;
  }
}

declare module 'next-auth/jwt' {
  interface GetTokenParams extends DefaultGetTokenParams {
    salt?: string | null;
  }

  interface JWT extends DefaultJWT {
    access_token: string;
    refresh_token: string;
    expires_at: number;
    sub: string;
    error?: 'RefreshAccessTokenError';
    user: User;
  }
}
