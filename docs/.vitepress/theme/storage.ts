import localforage from 'localforage';
import CryptoJS from 'crypto-js';

const SECRET_KEY = '90RaCfV7vUeCotWI'; // 用于加密的密钥

const USER_KEY = 'vbcbpZC2cVGuDyxN'

const USER_INFO_DB = [ // 预定义的用户信息库
  { username: 'yxh', password: 'yxh' },
];

// 加密函数
export function encrypt(data) {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
}

// 解密函数
export function decrypt(ciphertext) {
  const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}

// 存储加密数据
export async function storeCredentials(username, password) {
  const credential = {
    username: encrypt(username),
    password: encrypt(password),
    expiry: new Date().getTime() + (1000 * 60 * 60 * 24), // 设置过期时间为 24 小时
  };

  await localforage.setItem(USER_KEY, encrypt(credential));
}

// 验证 storage 中的凭证
export async function verifyStorageCredentials() {
  const encryptedCredential = await localforage.getItem(USER_KEY);
  if (!encryptedCredential) {
    redirectToLogin();
    return false;
  }

  const credential = decrypt(encryptedCredential);
  const now = new Date().getTime();

  if (now > credential.expiry) {
    console.log('Credential expired');
    await localforage.removeItem(USER_KEY); // 清除过期的凭证
    redirectToLogin();
    return false;
  }

  const username = decrypt(credential.username);
  const password = decrypt(credential.password);

  return USER_INFO_DB.some(user => user.username === username && user.password === password);
}

// 验证用户输入的凭证
export async function verifyInputCredentials(inputUsername, inputPassword) {
  return USER_INFO_DB.some(user => user.username === inputUsername && user.password === inputPassword);
}

// 重定向到登录页面，附带当前页面地址
export function redirectToLogin() {
  const currentPath = window.location.pathname;
  window.location.href = `/login?redirect=${encodeURIComponent(currentPath)}`;
}

// 使用示例
// async function demo() {
//   await storeCredentials('yangxin', 'asdas'); // 存储凭证
//   const isValid = await verifyCredentials('yangxin', 'asdas'); // 验证凭证
//   console.log('Is valid:', isValid); // 输出验证结果
// }

// demo().catch(console.error);
