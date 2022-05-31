const isASCII=(str)=>/^[\x00-\x7F]*$/.test(str);
function consoleMessage(message, color) {

    switch(color) {

        case 'red':
            return console.log('\x1b[1m\x1b[31m%s\x1b[0m',`${message}`);

        case 'cyan':
            return console.log('\x1b[1m\x1b[36m%s\x1b[0m',`${message}`);

        case 'blue':
            return console.log('\x1b[1m\x1b[34m%s\x1b[0m',`${message}`);

        case 'green':
            return console.log('\x1b[1m\x1b[32m%s\x1b[0m',`${message}`);

        case 'magenta':
            return console.log('\x1b[1m\x1b[35m%s\x1b[0m',`${message}`);

        case 'white':
            return console.log('\x1b[1m\x1b[37m%s\x1b[0m',`${message}`);

        default:
            return console.log('\x1b[1m\x1b[33m%s\x1b[0m','!- Failed error log -!');

    }

}

module.exports = {isASCII,consoleMessage}