const { sequelize } = require('../models');


const getVouchersForPreSelectedUsers = async (address) => {
    const res = await sequelize.query(`
        SELECT v.token_id, v.is_revealed, v.signature, v.json_uri, v.price
        FROM (
            SELECT
                token_id,
                is_revealed,
                signature,
                json_uri,
                price,
                ROW_NUMBER() OVER (PARTITION BY token_id ORDER BY (NOT is_revealed)) AS row_number
            FROM vouchers
            WHERE LOWER(address) = LOWER('${address}')
        ) v
        WHERE v.row_number = 1;
    `);

    return {
        address: address,
        vouchers: res[0],
    };
};

module.exports = getVouchersForPreSelectedUsers;
