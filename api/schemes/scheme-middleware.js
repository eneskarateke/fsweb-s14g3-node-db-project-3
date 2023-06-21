const schemeModel = require("./scheme-model.js");

/*
  Eğer `scheme_id` veritabanında yoksa:

  durum 404
  {
    "message": "scheme_id <gerçek id> id li şema bulunamadı"
  }
*/
const checkSchemeId = async (req, res, next) => {
  try {
    const isExist = await schemeModel.findById(req.params.scheme_id);
    if (!isExist) {
      return res.status(404).json({
        message: `scheme_id ${req.params.scheme_id} id li şema bulunamadı`,
      });
    } else {
      req.scheme = isExist;
      next();
    }
  } catch (error) {
    next(error);
  }
};

/*
  Eğer `scheme_name` yoksa, boş string ya da string değil:

  durum 400
  {
    "message": "Geçersiz scheme_name"
  }
*/
const validateScheme = (req, res, next) => {
  try {
    const { scheme_name } = req.body;

    if (
      scheme_name === undefined ||
      scheme_name === "" ||
      typeof scheme_name != "string"
    ) {
      res.status(400).json({ message: `Geçersiz scheme_name` });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

/*
  Eğer `instructions` yoksa, boş string yada string değilse, ya da
  eğer `step_number` sayı değilse ya da birden küçükse:

  durum 400
  {
    "message": "Hatalı step"
  }
*/
const validateStep = (req, res, next) => {
  try {
    const { instructions, step_number } = req.body;

    if (
      instructions === undefined ||
      instructions === "" ||
      typeof instructions != "string" ||
      typeof step_number != "number" ||
      step_number < 1
    ) {
      res.status(400).json({ message: "Hatalı step" });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
};
