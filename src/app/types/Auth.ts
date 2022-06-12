export type TypeLogin = {
    email: string,
    password: string
  };
  
  export type TypeLoginResponse = {
    accessToken: string,
    user: {
      email: string
    }
  }
  export type TypeSignUp = {
    email: string,
    password: string,
  }
  export type TypeSignupResponse = {
      email: string,
      password: string,
  }