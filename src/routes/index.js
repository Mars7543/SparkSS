const router = require('express').Router()

router.get('/', (req, res) => {
    res.render('index')
})

router.get('/groups', (req, res) => {
    res.render('groups', { title: 'BCA Spark: GroupMaker' })
})

module.exports = router