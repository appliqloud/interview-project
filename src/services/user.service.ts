import axiosInstance from "@/utils/axios"

export const loginService = async (username: string, password: string) => {
    try {
        const data = new URLSearchParams();
        data.append('username', username);
        data.append('password', password);
        const response = await axiosInstance.post('users/token', data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        localStorage.setItem('token', response.data.accessToken);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getUserService = async (token: string) => {
    try {
        const response = await axiosInstance.get('users/me', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
