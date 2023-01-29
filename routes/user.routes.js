const {Router} = require('express')

const {
    createUser,
    updateUser,
    deleteUser,
    findUsers,
    findUser
} = require ('../controllers/user.contoller')

const router = Router()

router.get('/', findUsers)

router.get('/:id', findUser)

router.post('/', createUser)

router.patch('/:id', updateUser)

router.delete('/:id', deleteUser)

module.exports = {
    usersRouter: router,
}