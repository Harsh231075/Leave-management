import api from './api';
import { CreateEmployeeInput, User } from '../types';

export const getEmployees = async (): Promise<User[]> => {
    const response = await api.get<User[]>('/employees');
    return response.data;
};

export const getEmployeeById = async (id: string): Promise<User> => {
    const response = await api.get<User>(`/employees/${id}`);
    return response.data;
};

export const createEmployee = async (data: CreateEmployeeInput): Promise<User> => {
    const response = await api.post<User>('/employees', data);
    return response.data;
};
