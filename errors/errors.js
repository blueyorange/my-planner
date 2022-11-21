exports.handleInvalidUrlErrors = (err, req, res, next) => {
  if (err.code === 404) {
    res.status(404).render("404.njk");
  } else {
    next(err);
  }
};

exports.handleCustomErrors = (err, req, res, next) => {
  if (err.name === "CastError") {
    return res.status(404).render("404.njk");
  } else {
    next(err);
  }
};

exports.handleServerErrors = (err, req, res, next) => {
  console.log(err);
  const error = { code: "500 Server error", message: err };
  res.status(500).render("error.njk", { error });
};
