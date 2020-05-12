const Joi = require('@hapi/joi')

module.exports = {
  validationMiddleware(req, res, next) {
    const schema = Joi.object({
      userName: Joi.string().alphanum().min(3).max(30),

      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ['com', 'net'] },
        })
        .required(),

      password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{8,30}$'))
        .required(),

      repeat_password: Joi.ref('password'),
    })
    const { error } = schema.validate(req.body)

    if (error) {
      switch (error.details[0].context.key) {
        case 'userName':
          res.status(400).send({
            error: `The Username provided failed to match the following rules:
            <br>
            1. It must contain ONLY characters that are either a letters or numbers.
            <br>
            2. Should not contain special characters.
            <br>
            3. It must be at least 3 characters in length and not greater than 30 characters in length.
          `,
          })
          break
        case 'email':
          res.status(400).send({
            error: `You must provide a valid email address with the following requirements:
            <br>
            1. It must contain ONLY characters that are either a letters or numbers.
            <br>
            2. Should match example@domain.extension.
            <br>
            3. Allowed extensions are ".com" and ".net".
          `,
          })
          break
        case 'password':
          res.status(400).send({
            error: `The password provided failed to match the following rules:
              <br>
              1. It must contain ONLY the following characters: lower case, upper case, numerics.
              <br>
              2. It must be at least 8 characters in length and not greater than 32 characters in length.
            `,
          })
          break
        case 'repeat_password':
          res.status(400).send({
            error: `The repeated password does not match the password.`,
          })
          break
        default:
          res.status(400).send({
            error: 'Invalid registration information!',
          })
      }
    } else {
      next()
    }
  },
}
