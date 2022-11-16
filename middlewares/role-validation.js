export const isRoleAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(500).json({
      msg: "Trying role validation without jwt validation",
    });
  }
  const { name, role } = req.user;
  if (role !== "ADMIN_ROLE") {
    return res.status(401).json({
      msg: `User ${name} with role not allowed`,
    });
  }

  next();
};

export const hasRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(500).json({
        msg: "Trying role validation without jwt validation",
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(401).json({
        msg: `User ${req.user.name} has role ${req.user.role} unauthorized for action`,
      });
    }
    next();
  };
};
