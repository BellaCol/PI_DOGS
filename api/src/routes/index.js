const { Router } = require('express');
const router = Router();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const getAllDogs= require('../controllers/getAllDogs.js')
const getDogByIdBreed= require('../controllers/getDogByIdBreed')
const getDogByNameBreed= require('../controllers/getDogByNameBreed')
const postDogDB= require('../controllers/postDogDB')
const getTemperamentsAPI= require('../controllers/getTemperamentsAPI')


router.get("/dogs/search",getDogByNameBreed)
router.get("/dogs",getAllDogs)
router.get("/dogs/:id",getDogByIdBreed)
router.post("/dogs", postDogDB)
router.get("/temperaments",getTemperamentsAPI)

module.exports = router;
