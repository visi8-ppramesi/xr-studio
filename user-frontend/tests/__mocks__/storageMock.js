export const getStorage = jest.fn();
export const getBlob = jest.fn(() => {
    return new Blob(['R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='], { type: 'image/jpeg' });
});
export const ref = jest.fn();
export const getDownloadURL = jest.fn(() => 'https://example.com/image.jpg');
export const getDataUrlResult = () => {
    return 'data:image/jpeg;base64,UjBsR09EbGhBUUFCQUFBQUFDSDVCQUVLQUFFQUxBQUFBQUFCQUFFQUFBSUNUQUVBT3c9PQ=='
}