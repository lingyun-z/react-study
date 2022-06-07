export class IDB {
  db: IDBDatabase = null;
  dbName: string;

  constructor(dbName: string) {
    this.dbName = dbName;
  }

  openDB() {
    return new Promise<IDBDatabase>((resolve, reject) => {
      const request = indexedDB.open(this.dbName);

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        console.error("IDB error:", request.error);
        reject(request.error);
      };

      request.onblocked = () => {
        console.log("IDB blocked");
      };

      request.onupgradeneeded = () => {
        console.log("IDB upgrade needed");
        request.result.createObjectStore("messageSequence");
        request.result.createObjectStore("message");
      };
    });
  }

  async getDBConnection() {
    if (this.db) {
      return this.db;
    }

    return (this.db = await this.openDB());
  }

  async get({
    storeName,
    query,
    indexName,
    transaction,
  }: {
    storeName: string;
    query: IDBValidKey | IDBKeyRange;
    indexName?: string;
    transaction?: IDBTransaction;
  }) {
    const _transaction =
      transaction ?? (await this.getDBConnection()).transaction(storeName);

    return new Promise((resolve, reject) => {
      const store = _transaction.objectStore(storeName);
      const request = indexName
        ? store.index(indexName).get(query)
        : store.get(query);
      request.onsuccess = () => {
        resolve(request.result);
      };
      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  async add({
    storeName,
    value,
    key,
    transaction,
  }: {
    storeName: string;
    value: any;
    key?: IDBValidKey;
    transaction?: IDBTransaction;
  }) {
    const _transaction =
      transaction ??
      (await this.getDBConnection()).transaction(storeName, "readwrite");

    return new Promise((resolve, reject) => {
      const request = _transaction.objectStore(storeName).add(value, key);

      request.onsuccess = () => {
        resolve(request.result);
      };
      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  async put({
    storeName,
    value,
    key,
    transaction,
  }: {
    storeName: string;
    value: any;
    key?: IDBValidKey;
    transaction?: IDBTransaction;
  }) {
    const _transaction =
      transaction ??
      (await this.getDBConnection()).transaction(storeName, "readwrite");

    return new Promise((resolve, reject) => {
      const request = _transaction.objectStore(storeName).put(value, key);

      request.onsuccess = () => {
        resolve(request.result);
      };
      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  async getMany({
    storeName,
    query,
    transaction,
  }: {
    storeName: string;
    query: IDBValidKey[];
    transaction?: IDBTransaction;
  }) {
    const _transaction =
      transaction ?? (await this.getDBConnection()).transaction(storeName);

    return new Promise((resolve, reject) => {
      const store = _transaction.objectStore(storeName);
      const resultPromises = query.map(
        (key) =>
          new Promise((resolve, reject) => {
            const request = store.get(key);
            request.onsuccess = () => {
              resolve(request.result);
            };
            request.onerror = () => {
              reject(request.error);
            };
          })
      );
      resolve(Promise.all(resultPromises));
    });
  }
}
