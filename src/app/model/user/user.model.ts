import { UserType } from "../enum/userType.enum";

export interface User {
    id: string;
    fullName:{
        firstName: string;
        lastName: string
    };
    address: {
        city: string;
        zipcode: string;
    };
    phone: string;
    birthday: string;
    profileImage: string;
    email: string;
    password: string;
    role : UserType;
}


  