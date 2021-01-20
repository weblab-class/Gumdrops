const link = require('link-preview-js');

async function tryLinkPreview(linkArray) {
    let result = [];
    try {
        for(var i=0; i <linkArray.length; i++){
          let processedLink =  await link.getLinkPreview(linkArray[i]);
          result.push(processedLink);
        }
        console.log(result);
        return result;
    } catch(e) {
        console.log(e);
    }
}

module.exports = {
    tryLinkPreview,
};