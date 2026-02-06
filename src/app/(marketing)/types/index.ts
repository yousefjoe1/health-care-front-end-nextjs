export interface RegisterPayload {
    full_name: string;
    email?: string;
    mobile: string;
    age?: string;
    password: string;
    doctor_id: string;
    sector_id: string;
    appointment_date: string;
}

export interface RegisterResponse {
    message: string;
    user: {
        id: string;
        full_name: string;
        email: string;
    };
    token: string;
}

export interface Doctor {
    id: string;
    full_name: string;
    specialization: string;
}

export interface Sector {
    id: string; // UUID
    name: string; //
    open_time: string; // 
    end_time: string; // 
    price: number; // 
    max_appointments: number; // 
    created_at: string; // 
}

export interface APIResponse<T> {
    success: boolean;
    data: T;
    statusCode?: number;
    message?: string
}