import { create } from 'zustand';
import { User, CreateEmployeeInput } from '../types';
import { getEmployees, createEmployee } from '../services/employeeService';

interface EmployeeState {
    employees: User[];
    isLoading: boolean;
    error: string | null;
    fetchEmployees: () => Promise<void>;
    addEmployee: (data: CreateEmployeeInput) => Promise<void>;
}

export const useEmployeeStore = create<EmployeeState>((set) => ({
    employees: [],
    isLoading: false,
    error: null,
    fetchEmployees: async () => {
        set({ isLoading: true, error: null });
        try {
            const employees = await getEmployees();
            set({ employees, isLoading: false });
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
        }
    },
    addEmployee: async (data) => {
        set({ isLoading: true, error: null });
        try {
            const newEmployee = await createEmployee(data);
            set((state) => ({
                employees: [...state.employees, newEmployee],
                isLoading: false
            }));
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
            throw error;
        }
    },
}));
