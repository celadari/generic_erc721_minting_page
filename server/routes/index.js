const express = require('express');
const router = express.Router();
const { getUserIfSelected, getNonceAuthentication, verifyAuthentication, getMerkleProofsForReveal, getVouchersForPreSelectedUsers } = require('../controllers');

// authentication
router.get('/nonce', (req, res) => {
    const resJson = getNonceAuthentication(req.query.address);
    res.json(resJson);
});

// SQL client setup
router.post('/is-selected', verifyAuthentication, async (req, res) => {
    const jsonIsSelected = await getUserIfSelected(req.addressFromSignature);
    res.json(jsonIsSelected);
});

router.post('/get-vouchers', verifyAuthentication, async (req, res) => {
    const vouchers = await getVouchersForPreSelectedUsers(req.addressFromSignature);
    res.json(vouchers);
});

if (process.env.SMART_CONTRACT_IS_REVEALED) {
    router.get('/reveal-merkle-proofs', async (req, res) => {
        const tokenIds = req.query['tokenIds'].split(',');
        const merkleProofs = await getMerkleProofsForReveal(tokenIds);
        res.json(merkleProofs);
    });
}

module.exports = router;
