import passport from "passport"

// This middleware ensures that the request has a valid JWT
export const authMiddleware = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) {
      console.error("Authentication error:", err)
      return res
        .status(500)
        .json({ message: "An internal error occurred during authentication" })
    }

    if (!user) {
      return res
        .status(401)
        .json({ message: "Authentication failed", reason: info })
    }

    req.user = user
    next()
  })(req, res, next)
}


// This middleware ensures that the request has a valid JWT and the user has the required role
export const authMiddlewareWithRole = (requiredRole) => {
  return (req, res, next) => {
    passport.authenticate("jwt", { session: false }, (err, user, info) => {
      if (err) {
        console.error("Authentication error:", err)
        return res
          .status(500)
          .json({ message: "An internal error occurred during authentication" })
      }

      if (!user) {
        return res
          .status(401)
          .json({ message: "Authentication failed", reason: info })
      }

      if (typeof user.role !== "string" || user.role !== requiredRole) {
        return res
          .status(403)
          .json({ message: "Access denied", reason: "Insufficient role" })
      }

      req.user = user
      next()
    })(req, res, next)
  }
}
