import { create } from 'zustand';
import { Attendance, CreateAttendanceInput } from '../types';
import { getAttendanceRecords, getMyAttendanceRecords, createAttendanceRecord } from '../services/attendanceService';

interface AttendanceState {
    attendanceRecords: Attendance[];
    myAttendance: Attendance[];
    isLoading: boolean;
    error: string | null;
    fetchAllAttendance: () => Promise<void>;
    fetchMyAttendance: () => Promise<void>;
    markAttendance: (data: CreateAttendanceInput) => Promise<void>;
}

export const useAttendanceStore = create<AttendanceState>((set) => ({
    attendanceRecords: [],
    myAttendance: [],
    isLoading: false,
    error: null,
    fetchAllAttendance: async () => {
        set({ isLoading: true, error: null });
        try {
            const attendanceRecords = await getAttendanceRecords();
            set({ attendanceRecords, isLoading: false });
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
        }
    },
    fetchMyAttendance: async () => {
        set({ isLoading: true, error: null });
        try {
            const myAttendance = await getMyAttendanceRecords();
            set({ myAttendance, isLoading: false });
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
        }
    },
    markAttendance: async (data) => {
        set({ isLoading: true, error: null });
        try {
            const newRecord = await createAttendanceRecord(data);
            set((state) => ({
                attendanceRecords: [...state.attendanceRecords, newRecord],
                myAttendance: [...state.myAttendance, newRecord],
                isLoading: false
            }));
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
            throw error;
        }
    },
}));
