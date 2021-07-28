export interface IApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

export interface IUser {
    id: number | string;
    email: string;
    fullName: string;
    password: string;
}

export interface IOffer{
    userID: number | string,
    title: string,
    description: string,
    offerTypeID: number | string,
    phoneNumber: string,
    email: string
    User: IUser,
    OfferType: IOfferType
}

export interface IOfferType{
    id: number | string
    name: string
}

export interface IOfferSearch{
    offerTypeID: number | string
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IMenuItem {
    path: string;
    icon: string;
    text: string;
    callBack? : Function;
}
