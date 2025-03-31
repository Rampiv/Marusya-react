export interface AuthCredentials {
  email: string
  password: string
}

export interface RegisterCredentials extends AuthCredentials {
  name: string
  surname: string
  passwordAgain: string
}
