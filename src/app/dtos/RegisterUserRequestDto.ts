export interface RegisterUserRequestDto  {
  email: string;
  password: string;
  roleIds?: number[]; // optional list of role IDs
}