export async function generateUniqueID(): Promise<string> {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let uniqueID = '';
    for (let i = 0; i < 12; i++) {
        uniqueID += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return uniqueID;
}

