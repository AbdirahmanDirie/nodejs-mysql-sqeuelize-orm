const express = require('express')
const router = express.Router()
const {
    signUp,
    signIn,
    getAllUser,
    updateUser,
    delteUser
} = require('../controllers/users')


const { userAuth, } = require('../middlewares/authMiddleware')

// POST
router.post('/login', signIn)
router.post('/register', signUp)

// GET
router.get('/', userAuth, getAllUser)


//PUT
router.put('/user/:id', userAuth, updateUser)


//DELETE
router.delete('/user/:email', delteUser)


module.exports = router
