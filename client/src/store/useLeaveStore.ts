import { create } from 'zustand';
import { LeaveRequest, CreateLeaveRequestInput } from '../types';
import { getLeaveRequests, getMyLeaveRequests, createLeaveRequest } from '../services/leaveService';

interface LeaveState {
    leaves: LeaveRequest[];
    myLeaves: LeaveRequest[];
    isLoading: boolean;
    error: string | null;
    fetchAllLeaves: () => Promise<void>;
    fetchMyLeaves: () => Promise<void>;
    requestLeave: (data: CreateLeaveRequestInput) => Promise<void>;
    updateLeaveStatus: (id: string, status: string) => Promise<void>;
}

export const useLeaveStore = create<LeaveState>((set) => ({
    leaves: [],
    myLeaves: [],
    isLoading: false,
    error: null,
    fetchAllLeaves: async () => {
        set({ isLoading: true, error: null });
        try {
            const leaves = await getLeaveRequests();
            set({ leaves, isLoading: false });
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
        }
    },
    fetchMyLeaves: async () => {
        set({ isLoading: true, error: null });
        try {
            const myLeaves = await getMyLeaveRequests();
            set({ myLeaves, isLoading: false });
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
        }
    },
    requestLeave: async (data) => {
        set({ isLoading: true, error: null });
        try {
            const newLeave = await createLeaveRequest(data);
            set((state) => ({
                leaves: [...state.leaves, newLeave], // Optimistically add to all list? Or maybe just myLeaves?
                myLeaves: [...state.myLeaves, newLeave],
                isLoading: false
            }));
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
            throw error;
        }
    },
    updateLeaveStatus: async (id, status) => {
        // Optimistic update?
        // set((state) => ({
        //   leaves: state.leaves.map(l => l._id === id ? { ...l, status } : l)
        // }));
        // Actually let's just wait for API
        try {
            const { updateLeaveRequestStatus } = await import('../services/leaveService');
            const updated = await updateLeaveRequestStatus(id, status);
            set((state) => ({
                leaves: state.leaves.map(l => l._id === id ? updated : l)
            }));
        } catch (error: any) {
            set({ error: error.message });
            throw error;
        }
    }
}));
