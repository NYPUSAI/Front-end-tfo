import { create } from "zustand";

const useWebSocketStore = create((set, get) => ({
  ws: null,
  currentMessages: [],
  fetchedMessages: [],
  isConnected: false,

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

    const ws = new WebSocket(`wss://v5dmsmd1-8000.inc1.devtunnels.ms/ws/messages/${chatId}/`);

    ws.onopen = () => {
      console.log("✅ WebSocket Connected");
      set({ isConnected: true });
      get().fetchChatMessages(); // Fetch chat history when connected
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("📩 Message received:", data);
    
        if (data.action === "show_messages" && Array.isArray(data.messages)) {
          // Set fetchedMessages to the received messages array
          set({ fetchedMessages: data.messages });
        } else {
          // If it's another type of message, append it to the messages state
          set((state) => ({ currentMessages: [...state.message, data] }));
        }
      } catch (error) {
        console.error("❌ Error parsing WebSocket message:", error);
      }
    };
    

    ws.onerror = (error) => console.error("❌ WebSocket Error:", error);

    ws.onclose = (closeEvent) => {
      console.log("🔴 WebSocket Disconnected", closeEvent.code, closeEvent.reason);
      set({ isConnected: false });

      // Attempt reconnection for non-normal closures
      if (![1000, 1006].includes(closeEvent.code)) {
        setTimeout(() => get().connect(chatId), 3000);
      }
    };

    set({ ws });
  },

  sendMessage: (message) => {
    const ws = get().ws;
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(message));
      console.log("📤 Message sent:", message);
    } else {
      console.error("❌ WebSocket is not open.");
    }
  },

  fetchChatMessages: () => {
    const ws = get().ws;
    if (ws && ws.readyState === WebSocket.OPEN) {
      // Clear fetchedMessages before sending the request
      set({ fetchedMessages: [] });
  
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
