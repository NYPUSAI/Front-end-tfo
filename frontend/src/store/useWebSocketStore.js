import { create } from "zustand";

const useWebSocketStore = create((set, get) => ({
  ws: null,
  currentMessages: [],
  responseIsThinking: false,
  fetchedMessages: [],
  isFetchMessagesLoading: false,
  isConnected: false,
  formResponseIsLoading: false,
  ThinkingMessage: [],


  connect: (chatId) => {
    if (!chatId) {
      console.error("WebSocketStore: chatId is missing.");
      return;
    }

    // Close existing connection if any
    const existingWs = get().ws;
    if (existingWs) {
      existingWs.close();
    }

    // Clear messages before reconnecting
    set({ currentMessages: [], fetchedMessages: [] });

    // const ws = new WebSocket(`wss://v5dmsmd1-8000.inc1.devtunnels.ms/ws/messages/${chatId}/`);
    const ws = new WebSocket(`wss://13.61.220.76/ws/messages/${chatId}/`);


    ws.onopen = () => {
      console.log("✅ WebSocket Connected");
      set({ isConnected: true });
      get().fetchChatMessages(); // Fetch chat history when connected
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("📩 Message received:", data);

        if (data.action === 'task_queued') {
          set({ ThinkingMessage: [data] }); // Always replace the previous message
        }

        if (data.action === "show_messages" && Array.isArray(data.messages)) {
          set({ fetchedMessages: data.messages, isFetchMessagesLoading: false });
        } else if (data.action === "new_message") {
          set((state) => {
            // Prevent adding the first response message after a "form" action request
            if (state.formResponseIsLoading && !state.formResponseReceived) {
              return { formResponseReceived: true, formResponseIsLoading: false };
            }
            return {
              currentMessages: [...state.currentMessages, data],
              responseIsThinking: false,
              formResponseIsLoading: false,
            };
          });
        }
      } catch (error) {
        console.error("❌ Error parsing WebSocket message:", error);
      }
    },


      ws.onerror = (error) => console.error("❌ WebSocket Error:", error);

    ws.onclose = (closeEvent) => {
      console.log("🔴 WebSocket Disconnected", closeEvent.code, closeEvent.reason);
      set({ isConnected: false });

      if (![1000, 1006].includes(closeEvent.code)) {
        setTimeout(() => get().connect(chatId), 3000);
      }
    };

    set({ ws });
  },

  sendMessage: (message) => {
    const ws = get().ws;
    if (ws && ws.readyState === WebSocket.OPEN) {
      const messageWithTimestamp = {
        ...message,
        timestamp: new Date().toISOString(),
        ...(message.action === "form" && { Type: "form" }), // Add Type field if action is "form"
      };

      ws.send(JSON.stringify(messageWithTimestamp));
      console.log("📤 Message sent:", messageWithTimestamp);

      // Push sent message to currentMessages ONLY if it's NOT a "form" action
      if (message.action !== "form") {
        set((state) => ({
          currentMessages: [...state.currentMessages, messageWithTimestamp],
        }));
      }

      // Set responseIsThinking to true only for "chat_manually" or "form" actions
      if (message.action === "chat_manually" || message.action === "form") {
        set({ responseIsThinking: true });
      }

      // Set formResponseIsLoading to true for "form" action and track first form response
      if (message.action === "form") {
        set({ formResponseIsLoading: true, formResponseReceived: false });
      }

    } else {
      console.error("❌ WebSocket is not open.");
    }
  },

  fetchChatMessages: () => {
    const ws = get().ws;
    if (ws && ws.readyState === WebSocket.OPEN) {
      // Clear fetchedMessages before sending the request
      set({ fetchedMessages: [] });
      set({ isFetchMessagesLoading: true })
      const message = { action: "fetch_messages" };
      ws.send(JSON.stringify(message));
      console.log("📤 Sent request to fetch chat messages:", message);
    } else {
      console.error("❌ WebSocket is not open.");
    }
  },

  closeConnection: () => {
    const ws = get().ws;
    if (ws) {
      ws.close();
      set({ ws: null, isConnected: false });
    }
  },
}));

export default useWebSocketStore;
