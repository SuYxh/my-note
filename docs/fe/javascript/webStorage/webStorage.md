### **sessionStorage**

sessionStorage 对象只存储会话数据，这意味着数据只会存储到浏览器关闭。

### **localStorage**

### localStorage 封装

createLocalStorage.ts

```typescript
import { deCrypto, enCrypto } from "../crypto";

interface StorageData<T = any> {
  data: T;
  expire: number | null;
}

export function createLocalStorage(options?: {
  expire?: number | null;
  crypto?: boolean;
}) {
  const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7;

  const { expire, crypto } = Object.assign(
    {
      expire: DEFAULT_CACHE_TIME,
      crypto: true,
    },
    options
  );

  function set<T = any>(key: string, data: T) {
    const storageData: StorageData<T> = {
      data,
      expire: expire !== null ? new Date().getTime() + expire * 1000 : null,
    };

    const json = crypto ? enCrypto(storageData) : JSON.stringify(storageData);
    window.localStorage.setItem(key, json);
  }

  function get(key: string) {
    const json = window.localStorage.getItem(key);
    if (json) {
      let storageData: StorageData | null = null;

      try {
        storageData = crypto ? deCrypto(json) : JSON.parse(json);
      } catch {
        // Prevent failure
      }

      if (storageData) {
        const { data, expire } = storageData;
        if (expire === null || expire >= Date.now()) return data;
      }

      remove(key);
      return null;
    }
  }

  function remove(key: string) {
    window.localStorage.removeItem(key);
  }

  function clear() {
    window.localStorage.clear();
  }

  return {
    set,
    get,
    remove,
    clear,
  };
}

export const ls = createLocalStorage();

export const ss = createLocalStorage({ expire: null, crypto: false });

export const cs = createLocalStorage({ expire: null, crypto: true });
```

#### crypto.ts

```typescript
import CryptoJS from "crypto-js";

const CryptoSecret = "__CRYPTO_SECRET__";

export function enCrypto(data: any) {
  const str = JSON.stringify(data);
  return CryptoJS.AES.encrypt(str, CryptoSecret).toString();
}

export function deCrypto(data: string) {
  const bytes = CryptoJS.AES.decrypt(data, CryptoSecret);
  const str = bytes.toString(CryptoJS.enc.Utf8);

  if (str) return JSON.parse(str);

  return null;
}
```
