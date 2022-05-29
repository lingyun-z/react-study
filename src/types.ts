export interface ChatRoom {
  id: string;
  name: string;
}

export enum WebSocketEvent {
  CHAT_MESSAGE = "chatMessage",
  USER_OFFLINE = "userOffline",
  USER_ONLINE = "userOnline",
}
