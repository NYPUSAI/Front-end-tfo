import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useResourcesStore = create((set) => ({

    isResourcesDataLoading: false,
    // isResourcesDataEditing: false,
    ResourcesData: {},

    FetchResourcesData: async () => {
        try {
            // console.log('Inside FetchResourcesData Function')
            set({ isResourcesDataLoading: true })
            const accessToken = localStorage.getItem("access_token");
            // console.log("Access Token:", accessToken);

            const res = await axiosInstance.get("/organization/org-setup/", {
                headers: { Authorization: `Bearer ${accessToken}` },
            });

            console.log("Fetched Resources Data:", res.data);
            set({ ResourcesData: res.data });

        } catch (error) {
            // toast.error(`Error In FetchSettingsData: ${error.message}`);
            console.error("Error In FetchResourcesData:", error);
        } finally {
            console.log('FetchResourcesData Function Over')
            set({ isResourcesDataLoading: false })
        }
    },

    EditResourcesData: async (data) => {
        try {
            // for (let pair of data.entries()) {
            //     console.log(pair[0], pair[1]);
            //   }
            // console.log(data, "body")
            // console.log('Inside EditResourcesData Function')
            set({ isResourcesDataLoading: true })
            const accessToken = localStorage.getItem("access_token");
            // console.log("Access Token:", accessToken);

            const res = await axiosInstance.put("/organization/org-setup/", data, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });

            console.log("Updated Resources Data:", res.data);
            set({ ResourcesData: res.data });

        } catch (error) {
            // toast.error(`Error In EditResourcesData: ${error.message}`);
            console.error("Error In EditResourcesData:", error);
        } finally {
            console.log('EditResourcesData Function Over')
            set({ isResourcesDataLoading: false })
        }
    },

}));
