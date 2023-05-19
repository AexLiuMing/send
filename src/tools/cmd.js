function SetENV() {
    const args = process.argv.slice(2);
    const options = {};

    args.forEach(arg => {
        const [key, value] = arg.split('=');
        if (key && value) {
            options[key.replace('--', '')] = value;
        }
    });
    const CHAIN_URL = options.CHAIN_URL;
    const PRIVATE_KEY = options.PRIVATE_KEY;
    const CHECK_TIME = options.CHECK_TIME;
    const TX_WAIT_TIME = options.TX_WAIT_TIME;
    const PRIORITY_FEE = options.PRIORITY_FEE;
    const TX_MAX_FEE_PRE_GASLIMIT = options.TX_MAX_FEE_PRE_GASLIMIT;
    const EXECUTE = options.EXECUTE;

    return {CHAIN_URL, PRIVATE_KEY, CHECK_TIME, TX_WAIT_TIME, PRIORITY_FEE, TX_MAX_FEE_PRE_GASLIMIT, EXECUTE}
}

module.exports = {
    SetENV
}