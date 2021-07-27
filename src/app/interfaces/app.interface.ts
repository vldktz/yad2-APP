export interface IApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

export interface IUser {
    id: number | string;
    email: string;
    fullName: string;
    phoneNumber: string;
}

export interface IOffer{
    userID: number | string,
    title: string,
    description: string,
    offerTypeID: number | string,
    phoneNumber: string,
    email: string
}

export interface IOfferSearch{
    offerTypeID: number | string
}

export interface IUserLogin {
  Email: string;
  Password: string;
}


