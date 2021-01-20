const jimp = require('jimp');

async function tryImgCompress(inputImg) {
    try {
        let img = await jimp.read(inputImg);
        img.resize(512, jimp.AUTO);
        img.quality(60);
        img.write("./output.jpeg");
        let outBuffer = await img.getBufferAsync(jimp.AUTO);
        return outBuffer;
    } catch(e) {
        console.log("There was an error in compress-img");
        console.log(e);
    }
}

module.exports = {
    tryImgCompress,
};