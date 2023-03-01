const { defineNonFungibleToken, NonFungibleToken } = require('./non_fungible_token');
const { definePreSelectedNonFungibleToken, PreSelectedNonFungibleToken } = require('./pre_selected_non_fungible_token');
const { definePreSelectedUser, PreSelectedUser } = require('./pre_selected_user');
const { defineMerkleTreeProof, MerkleTreeProof } = require('./merkle_tree_proof');
const { defineVoucher, Voucher } = require('./voucher');
const sequelize = require('./sequelize_instance');

(async () => {
    try {
        // create tables
        await defineNonFungibleToken();
        await definePreSelectedUser();
        await definePreSelectedNonFungibleToken();
        await defineMerkleTreeProof();
        await defineVoucher();
    } catch (e) {
        console.error('Something went wrong when trying to define a table in Database', e);
    }
})();


module.exports = {
    NonFungibleToken,
    PreSelectedUser,
    PreSelectedNonFungibleToken,
    MerkleTreeProof,
    Voucher,
    sequelize,
};