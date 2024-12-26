export interface IRegisterUser {
  email: string;
  password: string;
  username: string;
  birthDate: Date;
  gender: string;
}

export interface ILoginUser {
  email: string;
  password: string;
}

export interface IUser {
  id: number;
  email: string;
  password: string;
  username: string;
  birthDate: Date;
  gender: string;
}
