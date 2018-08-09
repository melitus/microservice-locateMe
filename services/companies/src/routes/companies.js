
import { Router } from 'express';

// import halson from 'halson';
import dbConnect from '../../../persistence/mysql';
import schema from '../models/companies';
import errorMessages from '../utils/error.messages';

const db = schema(dbConnect())();

// get an instance of the express Router, allowing us to add
// middleware and register our API routes as needed
const companyrouter = new Router();

companyrouter.post('/companies', async (req, res) => {
  let result;
  let responseResult;
  try {
    result = await db.companies.create(req.params.query);
    if (result) {
      responseResult = {
        status: 'Success',
        data: result,
        message: 'Successfully inserted one company',
      };
      res.status(201).send(responseResult);
    } else {
      res.status(401).send('Unable to add record. Please try again');
    }
  } catch (e) {
    res.status(404).send(errorMessages.USER_NOT_FOUND);
  }
});

companyrouter.get('/companies', async (req, res) => {
  let result;
  try {
    result = await db.companies.findAll();
  } catch (e) {
    res.status(404).send(errorMessages.USER_NOT_FOUND);
  }
  res.status(200).json({
    status: 'success',
    data: result,
    message: 'Retrieved ALL companies'
  });
});


companyrouter.get('/companies/:id', async (req, res) => {
  let result;
  try {
    result = await db.companies.find({ id: req.params.id });
    if (result) {
      res.status(200)
              .json({
                status: 'success',
                data: result,
                message: 'Retrieved ONE company'
              });
    } else {
      res.status(404).send('ID does not exist');
    }
  } catch (e) {
    // catches error in result
    res.status(404).send(errorMessages.USER_NOT_FOUND);
  }
});

companyrouter.put('/companies/:id', async (req, res) => {
  let result;
  try {
    result = await db.companies.upsert(req.query, { id: req.params.id });
    if (result) {
      res.status(200).send('succesfully updated');
    } else { res.status(404).send('ID does not exist'); }
  } catch (e) {
    res.status(404).send(errorMessages.USER_NOT_FOUND);
  }
  res.status(200).json(result);
});

companyrouter.delete('/companies', async (req, res) => {
  let result;
  try {
    result = await db.companies.removeAll();
  } catch (e) {
    res.status(404).send(errorMessages.USER_NOT_FOUND);
  }
  res.status(200)
        .json({
          status: 'success',
          data: result,
          message: 'Removed  companies'
        });
});

companyrouter.delete('/companies/:id', async (req, res) => {
  let result;
  try {
    result = await db.companies.remove({ id: req.params.id });
  } catch (e) {
    res.status(404).send(errorMessages.USER_NOT_FOUND);
  }
  res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} company`
        });
});

export default companyrouter;
