const passwordValidator = require('password-validator');

const passwordSchema = new passwordValidator();

passwordSchema
.is().min(5)            // Minimum 5 caractères
.is().max(20)           // Maximum 10 caractères
.has().uppercase()      // Contient au moins une lettre majuscule
.has().lowercase()      // Contient au moins une lettre minuscule
.has().digits(1)        // Contient au moins 1 chiffre
.has().not().spaces()   // Ne contient pas d'espace

module.exports = (req, res, next) => {
    if(passwordSchema.validate(req.body.password)){
        next();
    } else {
        const passwordCheck = passwordSchema.validate(req.body.password, { list : true })

        const passwordErrors = passwordCheck.map(string => {
            if(string ==="min") return "minimum 5 caractères"
            if(string === "max") return "maximum 20 caractères"
            if(string === "uppercase") return "minimum une majuscule"
            if(string === "lowercase") return "minimum une minuscule"
            if(string === "digits") return "minimum un nombre"
            if(string === "spaces") return "ne doit pas contenir d'espaces"
        })

        return res.status(400).json({error: passwordErrors.join(", "), type:"password"})
    }
}