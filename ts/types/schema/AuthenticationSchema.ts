export type LoginFormValues = {
  username: string;
  password: string;
};

export type Tokens = {
  token_type: string;
  expires_in: number;
  access_token: string;
  refresh_token: string;
};
