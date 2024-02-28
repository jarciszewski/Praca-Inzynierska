const router = require("express").Router()
const { getUser, getUserById, postUser, deleteUser, patchUser } = require('../controllers/userController')

router.route("/")
    .post(postUser)
    .patch(patchUser)

router.route('/:id')
    .get(getUser)
    .get(getUserById)
    .delete(deleteUser)

module.exports = router