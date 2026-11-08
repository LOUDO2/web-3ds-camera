const DB_NAME = "web-3ds-camera";
const STORE = "medias";

function open(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, 1);
        request.onupgradeneeded = () => request.result.createObjectStore(STORE, { autoIncrement: true });
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

export async function saveFiles(files: File[]) {
    const db = await open();
    const tx = db.transaction(STORE, "readwrite");
    const store = tx.objectStore(STORE);
    files.forEach((file) => store.add(file));
    return new Promise<void>((resolve, reject) => {
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
    });
}

export async function loadFiles(): Promise<File[]> {
    const db = await open();
    const request = db.transaction(STORE).objectStore(STORE).getAll();
    return new Promise((resolve, reject) => {
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}
