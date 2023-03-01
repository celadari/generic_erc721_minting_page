const { sequelize } = require('../models');

const getUserIfSelected = async address => {
    const res = await sequelize.query(`
        SELECT pre_nft.token_id, pre_nft.price, nft.json_uri
        FROM pre_selected_non_fungible_tokens AS pre_nft
        JOIN non_fungible_tokens AS nft ON pre_nft.token_id = nft.token_id
        JOIN pre_selected_users AS pre_users ON pre_nft.pre_selected_user_id = pre_users.id
        WHERE LOWER(pre_users.address) = LOWER('${address}');
    `);

    return {
        address: address,
        nonFungibleTokens: res[0],
    };
};


module.exports = getUserIfSelected;