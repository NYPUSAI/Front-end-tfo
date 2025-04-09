import { create } from 'zustand'
import { axiosInstance } from '../lib/axios'
import toast from 'react-hot-toast'

export const useGraphStore = create((set) => ({

    GraphData: [],
    // [
    //     {
    //         "date": "2025-03-19",
    //         "total_logins": 13,
    //         "total_chat_sessions": 57,
    //         "total_messages": 39,
    //         "total_agents_used": 3,
    //         "agent_usage": {
    //             "onboarding": 8,
    //             "recruitment": 20,
    //             "content_generation": 11
    //         }
    //     },
    //     {
    //         "date": "2025-03-18",
    //         "total_logins": 42,
    //         "total_chat_sessions": 5,
    //         "total_messages": 33,
    //         "total_agents_used": 5,
    //         "agent_usage": {
    //             "crm": 1,
    //             "seo": 2,
    //             "social": 2,
    //             "onboarding": 25,
    //             "recruitment": 3
    //         }
    //     },
    //     {
    //         "date": "2025-03-17",
    //         "total_logins": 19,
    //         "total_chat_sessions": 17,
    //         "total_messages": 21,
    //         "total_agents_used": 9,
    //         "agent_usage": {
    //             "crm": 5,
    //             "seo": 1,
    //             "sales": 1,
    //             "social": 1,
    //             "onboarding": 3,
    //             "recruitment": 1,
    //             "lead_generation": 1,
    //             "market_research": 4,
    //             "content_generation": 2
    //         }
    //     },
    //     {
    //         "date": "2025-03-16",
    //         "total_logins": 2,
    //         "total_chat_sessions": 0,
    //         "total_messages": 2,
    //         "total_agents_used": 0,
    //         "agent_usage": {}
    //     }
    // ],

    GraphDataLoading: false,
    CompanyName: null,

    GetGraphData: async () => {
        try {
            set({ GraphDataLoading: true })
            // console.log('inside GetGraphData Function');
            const accessToken = localStorage.getItem('access_token');
            const res = await axiosInstance.get("/organization/eod-report/", {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            // console.log('GetGraphData over', res.data);

            set({ GraphData: res.data.eod_reports || [] });
            set({ CompanyName: res.data.organization })
        } catch (error) {
            console.error("Error in GetGraphDta:", error);
        } finally {
            set({ GraphDataLoading: false })
        }
    },


}))