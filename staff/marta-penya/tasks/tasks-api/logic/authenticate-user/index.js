const validate = require('../../utils/validate')
const { CredentialsError } = require('../../utils/errors')
const { models: { User } } = require('../../data')

module.exports = function (username, password) {
    validate.string(username)
    validate.string.notVoid('username', username)
    validate.string(password)
    validate.string.notVoid('password', password)


    return User.findOne({ username, password })
        .then(user => {
            if (!user) throw new CredentialsError('wrong credentials')

            user.lastAccess = new Date
            
            return User.save().then(() => user.id)
        })
}

// return User.updateOne({ _id }, { $set: { lastAccess: new Date } })
// .then(result => {
//     if (!result.modifiedCount) throw Error('could not update user')

//     return _id.toString()
// })