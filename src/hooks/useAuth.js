import { useMutation } from '@tanstack/react-query';
import api from '../api/axios';

export const useSignup = () => {
    return useMutation({
        mutationFn: async (userData) => {
            const response = await api.post('/auth/signup', userData);
            return response.data;
        },
    });
};

export const useLogin = () => {
    return useMutation({
        mutationFn: async (credentials) => {
            const response = await api.post('/auth/login', credentials);
            return response.data;
        },
    });
};
