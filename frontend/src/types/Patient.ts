import { Address } from "./Address";

export interface Patient {
    id: number,
    name: string,
    dateOfBirth: Date,
    phoneNumber: string,
    insuraneProvider: string,
    policyNumber: string,

    address: Address,
}