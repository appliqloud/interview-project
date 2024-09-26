import axiosInstance from "@/utils/axios"

export const loginService = async (username: string, password: string) => {
    try {
        const data = new URLSearchParams();
        data.append('username', username);
        data.append('password', password);
        const response = await axiosInstance.post('users/token', data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',  // Header necesario
            },
        });
        localStorage.setItem('token', response.data.accessToken);
        return response.data;
    } catch (error) {
        throw error;
    }
};