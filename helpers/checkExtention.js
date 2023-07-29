function checkExtenstion(fileName) { 
    const EXTENTIONS = ['txt', 'js', 'json', 'html', 'css'];
    const arrExtention = fileName.split(".");
    const extention = arrExtention[arrExtention.length - 1];
    const isPresent = EXTENTIONS.includes(extention);
    return { extention, isPresent };
}

module.exports = checkExtenstion;