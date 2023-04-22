import { Address } from "./Address";

export interface Patient {
    patientID: number,
    name: string,
    dateOfBirth: string,
    phoneNumber: string,
    insuranceProvider: string,
    policyNumber: string,
    address: Address,
}