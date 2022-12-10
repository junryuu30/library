const express = require('express')

const router = express.Router()

// Controller
// import controller function here 
const { addUsers, getUsers, getUser, updateUser, deleteUser } = require('../controllers/user')
const { addBook, getBooks, getBook, updateBook, deleteBook  } = require('../controllers/book')
const { getRents, addRent } = require("../controllers/rent")

const { register, login, checkAuth } = require("../controllers/auth");

// Middleware
// import middleware here
const {auth} = require('../middlewares/auth')
const {uploadFile} = require("../middlewares/uploadFile")

// Route
router.post('/user', addUsers)
router.get('/users', getUsers)
router.get('/user/:id', getUser)
router.patch('/user/:id', updateUser)
// add route here
router.delete('/user/:id', deleteUser)

router.get('/books', getBooks)
router.get("/book/:id", getBook);
router.post('/book', auth, uploadFile("image"), addBook)
router.patch('/book/:id', auth, uploadFile("image"), updateBook)
router.delete('/deletebook/:id', auth, deleteBook)

router.get('/rents', auth, getRents)
router.post("/rent", auth, addRent)

// add route here
router.post("/register", register);
router.post("/login", login);
router.get("/check-auth", auth, checkAuth);
module.exports = router