const express = require('express')
const router = express.Router()
const {
    createBudget,
    getAllBudgets
} = require('../controllers/budget')


const { userAuth, } = require('../middlewares/authMiddleware')

// POST
router.post('/', userAuth, createBudget)

// GET
router.get('/', userAuth, getAllBudgets)


//PUT
// router.put('/user/:id', userAuth, updateUser)


//DELETE


module.exports = router
