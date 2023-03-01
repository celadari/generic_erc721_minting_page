const { Voucher } = require('../models');

const getVouchersForReveal = async (address, tokenIds) => {
    const queryResults = await Voucher.findAll(
        {
            where: {
                tokenId: tokenIds,
                isRevealed: true,
                address: address,
            },
            order: [
                ['token_id', 'ASC']
            ],
        }
    );
    return queryResults.map(queryResult => queryResult.dataValues);
};

module.exports = getVouchersForReveal;
