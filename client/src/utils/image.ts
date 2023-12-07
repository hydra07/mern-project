import fs from 'fs';

/**
 * Encodes an image file to base64.
 *
 * @param path - The path to the image file.
 * @param callback - The callback function that will be called with the base64 encoded image or an error.
 * @returns void
 *
 * @example
 * encodeImage('/path/to/image.jpg', (base64Image, error) => {
 *   if (error) {
 *     console.error(error);
 *     return;
 *   }
 *   console.log(base64Image);
 * });
 */
export const encodeImage = (
  path: string,
  callback: (base64Image: string | null, error: Error | null) => void,
) => {
  fs.readFile(path, (err, data) => {
    if (err) {
      callback(null, err);
      return;
    }
    const base64Image = Buffer.from(data).toString('base64');
    callback(base64Image, null);
  });
};

export const getBase64 = (file: any) => {
  return new Promise((resolve) => {
    let reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
      reader.readAsDataURL(file);
    };
  });
};
