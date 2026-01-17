import { create } from 'zustand';
import { User, CreateEmployeeInput } from '../types';
import { getEmployees, createEmployee, updateEmployee, deleteEmployee } from '../services/employeeService';

interface EmployeeState {
    employees: User[];
    isLoading: boolean;
    error: string | null;
    fetchEmployees: () => Promise<void>;
    addEmployee: (data: CreateEmployeeInput) => Promise<void>;
    updateEmployee: (id: string, data: Partial<CreateEmployeeInput>) => Promise<void>;
    removeEmployee: (id: string) => Promise<void>;
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
    updateEmployee: async (id, data) => {
        set({ isLoading: true, error: null });
        try {
            const updated = await updateEmployee(id, data);
            set((state) => ({
                employees: state.employees.map((e) => (e._id === id ? updated : e)),
                isLoading: false
            }));
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
            throw error;
        }
    },
    removeEmployee: async (id) => {
        set({ isLoading: true, error: null });
        try {
            await deleteEmployee(id);
            set((state) => ({
                employees: state.employees.filter((e) => e._id !== id),
                isLoading: false
            }));
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
            throw error;
        }
    },
}));
