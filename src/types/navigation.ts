interface NewUser {
  id?: string;
  name: string;
  email: string;
  password: string;
}

export type AuthStackParamList = {
  SignUp: undefined;
  SignIn: undefined;
  LostPassword: undefined;
  Verification: {userInfo: NewUser};
};
