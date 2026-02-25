export interface Patient {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    gender: string;
    fullAddress: string;
}

export interface PatientDB {
    id?: string;
    email: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    gender: string;
    fullAddress: string;
    userId?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface PatientAPIFetchResponse {
    success: boolean;
    data?: Patient[];
    message?: string;
}

export interface PatientAPIGetByIdResponse {
    success: boolean;
    data?: Patient;
    message?: string;
}

export interface PatientAPICreateResponse {
    success: boolean;
    data?: Patient;
    message?: string;
}

export class PatientModel implements Patient {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    gender: string;
    fullAddress: string;

    constructor(patient: Patient) {
        this.id = patient.id;
        this.email = patient.email;
        this.firstName = patient.firstName;
        this.lastName = patient.lastName;
        this.dateOfBirth = patient.dateOfBirth;
        this.gender = patient.gender;
        this.fullAddress = patient.fullAddress;
    }

    static fromDB(db: any): PatientModel {
        return new PatientModel({
            id: db.id,
            email: db.email,
            firstName: db.firstName || '',
            lastName: db.lastName || '',
            dateOfBirth: db.dateOfBirth || '',
            gender: db.gender || '',
            fullAddress: db.fullAddress || '',
        });
    }
}