const Joi = require('joi');
const { Note_STATUS } = require("../constants");

console.log("Validator loaded");

// ID validation schema
const idParamSchema = Joi.object({
    id: Joi.number().integer().positive().required(),
});

// Validator for creating a note
const validateCreateNote = (req, res, next) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        status: Joi.string().valid(...Object.values(Note_STATUS)).default(Note_STATUS.PENDING),
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

// Validator for updating a note
const validateUpdateNote = (req, res, next) => {
    const schema = Joi.object({
        title: Joi.string(),
        description: Joi.string(),
        status: Joi.string().valid(...Object.values(Note_STATUS))
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    const { error: idError } = idParamSchema.validate({ id: req.params.id });
    if (idError) {
        return res.status(400).json({ error: idError.details[0].message });
    }
    next();
};

// Validator for getting a note by Id
const validateNoteById = (req, res, next) => {
    const { error } = idParamSchema.validate({ id: req.params.id });

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

// Validator for getting a note by title
const validateGetNoteByTitle = (req, res, next) => {
    const schema = Joi.object({
        title: Joi.string().optional(),
        status: Joi.string().optional()
    });

    const { error } = schema.validate(req.query);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

module.exports = {
    validateCreateNote,
    validateUpdateNote,
    validateNoteById,
    validateGetNoteByTitle
};
