import dbConnect from '../../../persistence/mysql';
import schema from '../models/companies';
import errorMessages from '../utils/error.messages';

const db = schema(dbConnect())();

createCompany: async (req, res) => {
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
};

getAllCompanies: async (req, res) => {
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
};


getCompanyById: async (req, res) => {
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
};

updateCompanyById:  async (req, res) => {
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
};

deleteAllCompany:  async (req, res) => {
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
};

deleteCompanyById:  async (req, res) => {
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
};

