import { IDB } from "./methods";

const store = new IDB("store");

// message
export interface MessageValue {
  from: string;
  to: string;
  content: string;
  timestamp: number;
}
// messageSequence
type MessageSequenceValue = string[];

export const useChatMessageIDB = () => {
  const saveMessage = async (
    key: IDBValidKey,
    value: MessageValue,
    room: string
  ) => {
    const transaction = store.db.transaction(
      ["message", "messageSequence"],
      "readwrite"
    );
    await store.add({ storeName: "message", value, key, transaction });
    const keys =
      ((await store.get({
        storeName: "messageSequence",
        query: room,
        transaction,
      })) as string[]) ?? [];
    await store.put({
      storeName: "messageSequence",
      value: [key, ...keys],
      key: room,
      transaction,
    });
  };

  const getRoomMessage = async (room: string) => {
    const keys =
      ((await store.get({
        storeName: "messageSequence",
        query: room,
      })) as string[]) ?? [];

    return store.getMany({ storeName: "message", query: keys });
  };

  return { saveMessage, getRoomMessage };
};
