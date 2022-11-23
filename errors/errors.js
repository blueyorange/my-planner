exports.handleInvalidUrlErrors = (err, req, res, next) => {
  if (err.code === 404) {
    res.status(404).render("404.njk");
  } else {
    next(err);
  }
};

exports.handleCustomErrors = (err, req, res, next) => {
  console.log(err.name);
  if (err.name === "CastError") {
    req.flash("error", "Resource could not be found.");
    return res.status(404).redirect("/questions");
  } else {
    next(err);
  }
};

exports.handleServerErrors = (err, req, res, next) => {
  console.log(err);
  const error = { code: "500 Server error", message: err };
  res.status(500).render("error.njk", { error });
};
