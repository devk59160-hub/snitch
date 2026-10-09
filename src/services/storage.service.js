import ImageKit from '@imagekit/nodejs';
import {Config} from "../config/config.js"

const client = new ImageKit({
  privateKey: Config.IMAGE_KIT // This is the default and can be omitted
});

export async function uploadFile({buffer,fileNane,folder="snitch"}){
    const result = await client.files.upload({
        file: await Imagekit.tofile(buffer),
        fileName,
        folder
    })
    return result 
}