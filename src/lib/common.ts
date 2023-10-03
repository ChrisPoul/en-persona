export function getLocalStorageUsedMemory() {
	const sizeInBytes = new Blob(Object.values(localStorage)).size;

	return `${(sizeInBytes / 1024) * 2}kb`;
}

export function getFromLocalStorage(localKey: string) {
	const storedItemString = localStorage.getItem(localKey);
	let storedItem = null
	if (storedItemString) {
		storedItem = JSON.parse(storedItemString);
	}
	return storedItem
}
