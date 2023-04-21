import { Address } from "./Address";

export interface Patient {
    id: number,
    name: string,
    dateOfBirth: Date,
    phoneNumber: string,
    insuranceProvider: string,
    policyNumber: string,

    address: Address,
}