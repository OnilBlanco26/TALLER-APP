const { Router } = require('express');

const {
  createRepair,
  updateRepair,
  deleteRepair,
  findRepairs,
  findRepair,
} = require('../controllers/repairs.controllers');

const router = Router();

router.get('/', findRepairs);

router.get('/:id', findRepair);

router.post('/', createRepair);

router.patch('/:id', updateRepair);

router.delete('/:id', deleteRepair);

module.exports = {
  repairsRouter: router,
};
