exports.handleInvalidUrlErrors = (err, req, res, next) => {
  if (err.code === 404) {
    res.status(404).render("404.njk");
  } else {
    next(err);
  }
};

exports.handleCustomErrors = (err, req, res, next) => {
  console.log(err);
  req.flash("error", err);
  return res.status(err.status).redirect("/questions");
};
