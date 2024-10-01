import CryptoJS from 'crypto-js';

export const convertURL = (S3URL) => {
    let splitList = S3URL.split('/')
    let returnURL = ""
    if (splitList[splitList.length-1]){
        returnURL = "/api/file/"+splitList[splitList.length-1]
    }
    return returnURL
}

export const encrypToken = (threadId) => {
    var secretKey = process.env.NEXT_PUBLIC_FRONT_HASH_KEY;

    // Convert the secret key to a format suitable for encryption
    var derived_key = CryptoJS.enc.Base64.parse(secretKey);

    // Initialize the initialization vector (IV) and encryption mode
    var iv = CryptoJS.enc.Utf8.parse(process.env.NEXT_PUBLIC_FRONT_IV);
    var encryptionOptions = {
        iv: iv,
        mode: CryptoJS.mode.CBC
    };

    var value = CryptoJS.AES.encrypt(threadId, derived_key, encryptionOptions).toString();
    return value
}

export const splitURL = (content) => {
    let parts = content.split("\n");
    let imageUrl = parts[0].split(": ")[1];
    let question = parts[1].split(": ")[1];
    return [imageUrl, question]
}

export const autoResize = (element) => {
    element.style.height = 'auto'; // Remove the height before calculation.
    let newHeight = element.scrollHeight - 12; // Adjust for padding or other styles.
    element.style.height = `${newHeight}px`;
};

export function diff_time(timestamp) {
    const diff = Math.abs(new Date(Date.now()) - new Date(timestamp * 1000));
    // Conversion to various units
    let result;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    if (minutes == 0 && hours == 0 && days == 0) {
        if (seconds < 10) {
            result = 'just now'
        } else {
            result = `${seconds} seconds ago`;
        }
    } else if (minutes != 0 && hours == 0 && days == 0) {
        let minute_name = minutes == 1 ? "minute" : "minutes";
        result = `${minutes} ${minute_name} ago`;
    } else if (minutes != 0 && hours != 0 && days == 0) {
        let hour_name = hours == 1 ? "hour" : "hours";
        result = `${hours} ${hour_name} ago`;
    } else if (minutes != 0 && hours != 0 && days != 0) {
        let day_name = days == 1 ? "day" : "days";
        result = `${days} ${day_name} ago`;
    }
    return result
}

export const convertToChatType = (threadData) => {
    if (!Array.isArray(threadData)) {
        // Handle the error or return a default value
        return []; // or alternative handling
    }

    if (threadData[0].role === 'system') {
        threadData.shift()
    }
    return threadData.map((data) => {

        return {
            type: data.role === 'assistant' ? 'ai' : data.role, // assumes only 'system' and 'user' roles. Modify this as per your requirement.
            message: data.content,
            image: data.attach === 'image' ? convertURL(data.url) : null,
            file: data.attach === 'pdf' ? convertURL(data.url) : null,
        }
    });
};

export function scrollToElement(ID) {
    const element = document.getElementById(ID);
    if (element) {
        element.scrollIntoView();
    }
}

export function capitalizeFirstLetter(string) {
    return string.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
}