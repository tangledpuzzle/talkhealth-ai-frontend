export function bytesToMegabytes(bytes: number) {
    if (isNaN(bytes) || bytes < 0) {
      return "Invalid input";
    }
  
    const megabytes = bytes / (1024 * 1024);
    return megabytes.toFixed(2) + " MB";
}
export const LOCAL_STORAGE_TOKEN_KEY = "token";
export const LOCAL_STORAGE_USER_KEY = "user";