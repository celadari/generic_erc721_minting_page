const { MerkleTreeProof } = require('../models');

const getMerkleProofsForReveal = async (tokenIds) => {
    const queryResults = await MerkleTreeProof.findAll({where: {tokenId: tokenIds}});
    return queryResults.map(queryResult => queryResult.dataValues);
};

module.exports = getMerkleProofsForReveal;