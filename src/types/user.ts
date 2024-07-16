import type { CustomUserClaims, UserClaims } from '@okta/okta-auth-js';

export interface User {
  firstName?: string;
  lastName?: string;
  displayName?: string;
  emailAddress?: string;
  phoneNumber?: string;
}

export type OktaUserClaims<T extends CustomUserClaims = CustomUserClaims> =
  UserClaims<T> & {
    phone_number?: string;
  };
