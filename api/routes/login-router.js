const { Router } = require('express');

const router = new Router();

// Accept the feedback form
router.post('/login', (req, res) => {
    console.log(req.body);
    // Redirect the user back to the index.html, e.g.,
    // use status code 302
    res.redirect('/login.html');
});

module.exports = router;