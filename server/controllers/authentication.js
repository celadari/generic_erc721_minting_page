const jwt = require('jsonwebtoken');
const EthSigUtils = require('@metamask/eth-sig-util');

const getMessage = (address, nonce) => {
    return `Please sign the following message for address '${address}': \n${nonce}`;
};

const getNonceAuthentication = address => {
    const nonce = new Date().getTime();
    const tmpToken = jwt.sign({nonce, address}, process.env.AUTHENTICATION_AUTH_SECRET, {expiresIn: '60s'});
    const message = getMessage(address, nonce);
    return {tmpToken, message};
};

const verifyAuthentication = async (req, res, next) => {
    const authJson = req.body['authentication'];
    const tmpToken = authJson['tmpToken'];
    const signature = authJson['signature'];

    if (tmpToken === null) res.sendStatus(403);

    const data = await jwt.verify(tmpToken, process.env.AUTHENTICATION_AUTH_SECRET);
    const message = getMessage(data.address, data.nonce);

    const addressFromSignature = EthSigUtils.recoverPersonalSignature({data: message, signature: signature});

    if (addressFromSignature.toLowerCase() === data.address.toLowerCase()) {
        req.addressFromSignature = addressFromSignature;
        return next();
    } else {
        res.sendStatus(403);
    }
};

module.exports = { getNonceAuthentication, verifyAuthentication };