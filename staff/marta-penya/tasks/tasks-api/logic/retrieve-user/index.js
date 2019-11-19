 const validate = require('../../utils/validate')
const { NotFoundError } = require('../../utils/errors')
const { models: { User } } = require('../../data')
const { ObjectId } = database

module.exports = function (id) {
    validate.string(id)
    validate.string.notVoid('id', id)

    return User.findOne({ _id: ObjectId(id) })
        .then(user => {
            if (!user) throw new NotFoundError(`user with id ${id} not found`)

            return User.updateOne({ _id: ObjectId(id) }, { $set: { lastAccess: new Date } })
                .then(result => {
                    if (!result.modifiedCount) throw Error('could not update user')

                    user.id = user._id.toString()

                    delete user._id
                    delete user.password

                    const { name, surname, email, username } = user

                    return ({ id, name, surname, email, username })

                })
        })
}
