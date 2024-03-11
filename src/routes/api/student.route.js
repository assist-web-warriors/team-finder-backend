const { Router } = require('express');

const router = Router();

router.get('/', () => {} );
router.get('/:id', (req, res) => {
    console.log("Auth/get/id");
    return res.send("am returnat de exemplu da");
});
router.post('/', () => {});
router.put('/:id', () => {});
router.delete('/:id', () => {});

module.exports = router;