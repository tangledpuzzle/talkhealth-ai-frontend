import { jwtDecode } from 'jwt-decode';
import {decryptObj, decryptText, encryptObj, encryptText} from '../utils/encrypt-decrypt';
import {LOCAL_STORAGE_TOKEN_KEY, LOCAL_STORAGE_USER_KEY} from '../utils/index';
import {MD5} from 'crypto-js';

class AuthService {
    getEncToken() {
        if (typeof window !== "undefined") 
            return localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
        
        return;
    }
    getDecToken() {
        if (typeof window !== "undefined") 
            return decryptText(localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY), LOCAL_STORAGE_TOKEN_KEY);
        
        return;
    }
    setUserInfo(userInfo : any) {
        const encryptedUserInfo = encryptObj(userInfo);
        if (typeof window !== "undefined") 
            return localStorage.setItem(LOCAL_STORAGE_USER_KEY, encryptedUserInfo);
        return;
    };
    getUserInfo() {
        let encryptedUserInfo: string | null = null;
      
        if (typeof window !== "undefined") {
          encryptedUserInfo = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
      
          if (encryptedUserInfo !== null && encryptedUserInfo !== undefined) {
            return decryptObj(encryptedUserInfo, LOCAL_STORAGE_USER_KEY);
          }
        }
      
        return null;
      }
      
    setToken(token : string) {
        if (typeof window !== "undefined") 
            return localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, encryptText(token));
        return;
    }

    hashPassword(password : string) {
        return MD5(password).toString();
    }
    isLoggedIn() {
        const token = this.getDecToken();
        if (token) {
            try {
                return jwtDecode(token);
            } catch (error) {
                return false;
            }
        } else {
            return false;
        }
    }

    getExp() {
        const token: any = this.isLoggedIn();
        if (! token) 
            return null;
        

        const date = new Date(0);
        date.setUTCSeconds(token.exp);

        return date;
    }

    tokenExpired() {
        const exp = this.getExp();
        if (! exp) 
            return null;
        
        const expired = !(exp.valueOf() > new Date().valueOf());
        if (expired) 
            this.logout();
        
        return expired;
    }

    logout() {
        if (typeof window !== "undefined") 
            localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
        return window.location.href = '/main';
    }
    removeToken() {
        if (typeof window !== "undefined") 
            return localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
        return;
    }
}
const authServiceInstance = new AuthService();

// Export the instance as the default export
export default authServiceInstance;