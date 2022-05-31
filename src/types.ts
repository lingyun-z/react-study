export interface ChatRoom {
  id: string;
  name: string;
}

export interface ChatMessage {
  content: string;
  timestamp: number;
  from: string;
}

export enum WebSocketEvent {
  CHAT_MESSAGE = "chatMessage",
  USER_OFFLINE = "userOffline",
  USER_ONLINE = "userOnline",
}

export interface ClientToServerEvents {
  chatMessage: (message: { content: string; to: string }) => void;
}

export interface ServerToClientEvents {
  chatMessage: (message: ChatMessage) => void;
  userOnline: ({ userId: string }) => void;
  userOffline: ({ userId: string }) => void;
}
