import axios from 'axios';
import fs from 'fs';
import path from 'path';

export const downloadImage = async (
  url: string,
  folder: string,
  name: string,
) => {
  const response = await axios.get(url, { responseType: 'arraybuffer' });
  const base64Data = Buffer.from(response.data, 'binary').toString('base64');

  let uploadPath = path.join(
    __dirname,
    `../../../database/${folder}/${name}.png`,
  );
  while (fs.existsSync(uploadPath)) {
    name = name + '-' + Date.now().toString();
    uploadPath = path.join(
      __dirname,
      `../../../database/${folder}/${name}.png`,
    );
  }
  await fs.writeFile(uploadPath, base64Data, 'base64', (err) => {
    if (err) {
      throw err;
    }
  });
  // return `uploads/${folder}/${name}.png`;
  return uploadPath;
};

/**
 * Asynchronously saves a base64 image to a specified folder with a specified name.
 *
 * @param image - The base64 string of the image.
 * @param folder - The folder to save the image in.
 * @param name - The name to save the image as.
 * @returns The relative path of the saved image.
 *
 * @example
 * // Usage with async/await
 * try {
 *   const imagePath = await saveImage(base64Image, 'images', 'myImage');
 *   console.log(imagePath);
 * } catch (err) {
 *   console.error(err);
 * }
 *
 * @example
 * // Usage with Promises
 * saveImage(base64Image, 'images', 'myImage')
 *   .then(imagePath => console.log(imagePath))
 *   .catch(err => console.error(err));
 */
export const saveImage = async (
  image: string,
  folder: string,
  name: string,
) => {
  const base64Data = image.replace(/^data:image\/png;base64,/, '');
  let uploadPath = path.join(
    __dirname,
    `../../../database/${folder}/${name}.png`,
  );
  while (fs.existsSync(uploadPath)) {
    name = name + '-' + Date.now().toString();
    uploadPath = path.join(
      __dirname,
      `../../../database/${folder}/${name}.png`,
    );
  }
  await fs.writeFile(uploadPath, base64Data, 'base64', (err) => {
    if (err) {
      throw err;
    }
  });
  // return `uploads/${folder}/${name}.png`;
  return uploadPath;
};

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

//rename image if exists

let _path = path.join(__dirname, `../../../database/`);
// // //using encode

// encodeImage(_path, async (base64Image, err) => {
//   if (err) {
//     console.log(err);
//   }
//   try {
//     const url = await saveImage(base64Image!, 'avatars', 'demo!');
//     console.log(url);
//     console.log(path.join(__dirname, `../../`) + url);
//   } catch (error) {
//     console.error(error);
//   }
// });

//from download change img to base64
export const imageToBase64 = async (url: string): Promise<string | null> => {
  try {
    const res = await axios.get(url, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(res.data, 'binary').toString('base64');
    return buffer;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const imgUrl =
  'https://th.bing.com/th/id/OIP.aey5rCg-QObGBLVK9fUtSAHaEK?rs=1&pid=ImgDetMain';
// const img = imageToBase64(imgUrl);
console.log(imageToBase64(imgUrl));
