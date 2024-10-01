import { AES, enc } from 'crypto-js';

export const GLOBAL_KEY = "****TASKHEALTH&342FASfa$2384034&23#@$%34****"
const GLOBAL_KEY_SIMPLE = "****LINK_ADDRESS_ENCRYPTION####**123";

export const encryptText = (text: string) => {
    return AES.encrypt(text, GLOBAL_KEY).toString();
};

export const encryptTextV2 = (text: string) => {
    return AES.encrypt(text, GLOBAL_KEY_SIMPLE).toString();
};

export const decryptTextV2 = (encryptedText: string, KEY = GLOBAL_KEY_SIMPLE) => {
    let decryptedText = null;
    if (encryptedText) {
        const decrypted = AES.decrypt(encryptedText, KEY);
        decryptedText = decrypted.toString(enc.Utf8);
    }
    return decryptedText;
};

export const customizedDecryption = (encryptedText: string, KEY: string) => {
    let decryptedText = null;
    if (encryptedText) {
        try {
            const decrypted = AES.decrypt(encryptedText, KEY);
            decryptedText = decrypted.toString(enc.Utf8);
        } catch (e) {
            // console.log(e);
        }

    }

    return decryptedText;
};

export const decryptText = (encryptedText: string | any, LOCAL_STORAGE_VARIABLE: string) => {
    let decryptedText = null;
    if (encryptedText) {
        try {
            const decrypted = AES.decrypt(encryptedText, GLOBAL_KEY);
            decryptedText = decrypted.toString(enc.Utf8);
        } catch (e) {
            alert("Something unusual happened from The Storage")
            removeItem(LOCAL_STORAGE_VARIABLE);
            location.reload();
        }

    }

    return decryptedText;
};

export const encryptObj = (obj: Object) => {
    return AES.encrypt(JSON.stringify(obj), GLOBAL_KEY).toString();
};


export const decryptObj = (encryptedObj: string, LOCAL_STORAGE_VARIABLE: string) => {
    let decryptedObj = null
    if (encryptedObj) {
        try {
            const decrypted = AES.decrypt(encryptedObj, GLOBAL_KEY);
            decryptedObj = JSON.parse(decrypted.toString(enc.Utf8));
        } catch (e) {
            alert("Something unusual happened from The Storage")
            removeItem(LOCAL_STORAGE_VARIABLE)
            location.reload();
        }

    }

    return decryptedObj;
}


export const doubleEncryption = (text: string) => {
    return encodeURIComponent(encryptTextV2(text));
}

export const doubleDecryption = (encrypted: string, KEY: string) => {
    let decrypted;
    decrypted = decodeURIComponent(encrypted)
    return decryptTextV2(decrypted, KEY);
}


function removeItem(ELEMENT_KEY: string) {
    localStorage.removeItem(ELEMENT_KEY)
}

export const decryptTextSimple = (encoded: { match: (arg0: RegExp) => any[]; }) => {
    const textToChars = (text: string) => text.split("").map((c) => c.charCodeAt(0));
    const applySaltToChar = (code: any) => textToChars(GLOBAL_KEY_SIMPLE).reduce((a, b) => a ^ b, code);
    return encoded
        .match(/.{1,2}/g)
        .map((hex) => parseInt(hex, 16))
        .map(applySaltToChar)
        .map((charCode) => String.fromCharCode(charCode))
        .join("");

};


export const encryptTextSimple = (text: string) => {
    const textToChars = (text: string) => text.split("").map((c) => c.charCodeAt(0));
    const byteHex = (n: any) => ("0" + Number(n).toString(16)).substr(-2);
    const applySaltToChar = (code: any) => textToChars(GLOBAL_KEY_SIMPLE).reduce((a, b) => a ^ b, code);

    return text
        ?.split("")
        .map(textToChars)
        .map(applySaltToChar)
        .map(byteHex)
        .join("");
};