import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useSettingsStore = create((set) => ({

    isSettingsDataLoading: false,
    isSettingsDataEditing: false,
    SettingsData: {},
    // {
    //     "linkedin_api": {
    //         "id": "90731f13-edc4-4fe1-aed0-667748bec3a3",
    //         "access_token": "new_updated_token", -
    //         "created_at": "2025-03-16T06:23:12.399243Z", 
    //         "updated_at": "2025-03-16T06:44:28.472764Z" -
    //     },
    //     "smtp_config": {
    //         "id": "27f417e9-bb4e-4afa-abae-e90d49b3d9f4",
    //         "smtp_host": "smtp.mailtrap.io", -
    //         "smtp_port": 2525, -
    //         "password": null, -
    //         "sender_email": "new@example.com", -
    //         "created_at": "2025-03-16T06:23:12.407272Z",
    //         "updated_at": "2025-03-16T06:44:28.472764Z" -
    //     },
    //     "eod_config": {
    //         "id": "ad2c18d5-1c07-433c-bdb4-5f6a212c29e3",
    //         "email_address": "new_reports@example.com", -
    //         "enable": false, -
    //         "created_at": "2025-03-16T06:23:12.415805Z",
    //         "updated_at": "2025-03-16T06:44:28.480776Z" -
    //     }
    // }
    isPostingTicket: false,

    FetchSettingsData: async () => {
        try {
            // console.log('Inside FetchSettingsData Function')
            set({ isSettingsDataLoading: true })
            const accessToken = localStorage.getItem("access_token");
            // console.log("Access Token:", accessToken);

            const res = await axiosInstance.get("/organization/settings/", {
                headers: { Authorization: `Bearer ${accessToken}` },
            });

            console.log("Fetched Settings Data:", res.data);
            set({ SettingsData: res.data });

        } catch (error) {
            // toast.error(`Error In FetchSettingsData: ${error.message}`);
            console.error("Error In FetchSettingsData:", error);
        } finally {
            // console.log('FetchSettingsData Function Over')
            set({ isSettingsDataLoading: false })
        }
    },

    EditSettingsData: async (data) => {
        try {
            // console.log('Inside EditSettingsData Function')
            set({ isSettingsDataLoading: true })
            const accessToken = localStorage.getItem("access_token");
            // console.log("Access Token:", accessToken);

            const res = await axiosInstance.put("/organization/settings/", data, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });

            // console.log("Updated Settings Data:", res.data);
            set({ SettingsData: res.data });

        } catch (error) {
            // toast.error(`Error In FetchSettingsData: ${error.message}`);
            console.error("Error In FetchSettingsData:", error);
        } finally {
            // console.log('FetchSettingsData Function Over')
            set({ isSettingsDataLoading: false })
        }
    },

    PostTicket: async (data) => {
        try {
            // console.log("Inside PostTicket function");
            set({ isPostingTicket: true });
    
            const accessToken = localStorage.getItem("access_token");
            // console.log("Access Token:", accessToken);
    // console.log(data, "data")
            const res = await axiosInstance.post("/organization/raise-ticket/", data, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
    
            // console.log("Response:", res.data);
            return res.data;  // Return response data to handle in modal
    
        } catch (error) {
            // toast.error(`Error In PostTicket: ${error.message}`);
            console.error("Error In PostTicket:", error);
        } finally {
            set({ isPostingTicket: false });
        }
    }
    
}));
