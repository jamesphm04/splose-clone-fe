export interface Patient {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    gender: string;
    fullAddress: string;
    phoneNumber: string;
}

export interface PatientDB {
    id?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    dateOfBirth?: string;
    gender?: string;
    fullAddress?: string;
    phoneNumber?: string;
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

export interface PatientAPIUpdateResponse {
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
    phoneNumber: string;

    constructor(patient: Patient) {
        this.id = patient.id;
        this.email = patient.email;
        this.firstName = patient.firstName;
        this.lastName = patient.lastName;
        this.dateOfBirth = patient.dateOfBirth;
        this.gender = patient.gender;
        this.fullAddress = patient.fullAddress;
        this.phoneNumber = patient.phoneNumber;
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
            phoneNumber: db.phoneNumber || '',
        } as Patient);
    }
}