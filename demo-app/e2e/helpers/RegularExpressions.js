const verifiedTokensSessionRegEx = /https:\/\/preprod\.access\.worldpay\.com\/verifiedTokens\/sessions\/[a-zA-Z0-9\-]+/;
const cvcSessionRegEx = /https:\/\/preprod\.access\.worldpay\.com\/sessions\/[a-zA-Z0-9\-]+/;

module.exports = { verifiedTokensSessionRegEx, cvcSessionRegEx };
