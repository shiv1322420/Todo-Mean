const { Op } = require('sequelize');
const Note = require('../models/notes.model');


const getNoteById = (id) => {
    return new Promise((resolve, reject) => {
        Note.findByPk(id)
            .then(result => resolve(result))
            .catch(err => reject(err))
    });
};

const getAllNote = (title = '', status = '') => {
    let filter = {};
    if (title) {
        filter.where = {
            title: {
                [Op.like]: `%${title}%`
            }
        };
    }
    if (status) {
        filter.where = {
            ...filter.where,
            status: status
        };
    }
    return new Promise((resolve, reject) => {
        Note.findAll(filter).then(
            notes => {
                if (notes)
                    resolve(notes);
                else
                    reject(new Error('No Notes found'));
            }
        ).catch(err => {
            reject(err);
        });
    });
};

const createNote = (payload) => {
    return new Promise((resolve, reject) => {
        Note.create(payload)
            .then((result) => {
                resolve(result);
            }).catch(err => {
                reject(err)
            })
    })
};

const updateNote = (id, payload) => {
    return new Promise((resolve, reject) => {
        Note.update(payload, { where: { id } })
            .then(result => {
                    resolve(result);
            })
            .catch(err => {
                reject(err)
            })
    })
};


const deleteNote = (id) => {
    return new Promise((resolve, reject) => {
        Note.destroy({ where: { id } })
            .then(result => {
                    resolve(result);
            })
            .catch(err => reject(err))
    });
}

module.exports = {
    getNoteById,
    getAllNote,
    createNote,
    deleteNote,
    updateNote
}

