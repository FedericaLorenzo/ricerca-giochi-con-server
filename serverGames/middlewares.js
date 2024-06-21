// middlewares.cjs

module.exports = (req, res, next) => {
  const _send = res.send;

  res.send = function (data) {
    if (req.method === "GET") {
      data = JSON.stringify({
        result: JSON.parse(data),
        totalCount: this.getHeader("X-Total-Count") ?? null,
      });
    }

    _send.call(this, data);
  };

  next();
};