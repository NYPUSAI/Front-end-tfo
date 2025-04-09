import { create } from 'zustand'
import { axiosInstance } from '../lib/axios'
import toast from 'react-hot-toast'

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,

    isCheckingAuth: true,

    accessToken: null,
    refreshToken: null,
    userRole: null,
    userId: null,

    userAuth: false,

    DepartmentsTeams: JSON.parse(localStorage.getItem('DepartmentsTeams')) || [],

    checkAuth: () => {
        try {
            const token = localStorage.getItem("token");

            if (token) {
                set({ userAuth: true });
            } else {
                set({ userAuth: false });
            }
        } catch (error) {
            toast.error("Error checking authentication");
            set({ userAuth: false });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    // function to check auth when reloading the page the page will be checking if the user is authenticated
    // checkAuth: async () => {
    //     try {
    //         const res = await axiosInstance.get("/auth/check") //baseUrl will fill the first
    //         set({ authUser: res.data })
    //     } catch (error) {
    //         console.log('error in checkAuth:', error);

    //         set({ authUser: null })
    //     } finally {
    //         set({ isCheckingAuth: false })
    //     }
    // },

    // logout: async () => {
    //     try {
    //         await axiosInstance.post("/auth/logout");
    //         set({ authUser: null });
    //         toast.success("Logged out successfully")
    //     } catch (error) {
    //         toast.error(error.response.data.message)
    //     }
    // },

    login: async (data) => {
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post('/organization/login/', data); 
            console.log('response:', res.data)
            const { access_token, refresh_token, user_id, role } = res.data;
            // Set auth-related details in the state
            
            set({
                authUser: data.email, 
                accessToken: access_token,
                refreshToken: refresh_token,
                userRole: role,
                userId: user_id,
            });
            console.log('accessToken:', access_token);
            console.log('refreshToken:', refresh_token);

            // Store tokens locally
            localStorage.setItem('access_token', access_token);
            localStorage.setItem('refresh_token', refresh_token);

            // Return the response tokens to be used in the login handler
            return {
                access_token,
                refresh_token
            };

        } catch (error) {
            const message = error.response?.data?.message || 'Login failed. Please check your credentials.';
            toast.error(message);
        } finally {
            set({ isLoggingIn: false });
        }
    },

    fetchHome: async (accessToken) => {
        try {
            console.log('inside fetchHome');
            const res = await axiosInstance.get("/organization/home/", {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            console.log('fetchHome over', res.data);

            const newDepartmentsTeams = res.data.package.features;
            set({ DepartmentsTeams: newDepartmentsTeams });

            // Store the new data in localStorage
            localStorage.setItem('DepartmentsTeams', JSON.stringify(newDepartmentsTeams));
        } catch (error) {
            console.error("Error fetching home data:", error);
        }
    },
}))