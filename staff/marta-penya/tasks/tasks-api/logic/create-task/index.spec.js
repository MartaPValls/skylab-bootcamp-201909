const { expect } = require('chai')
const tasks = require('../../data/tasks')('test')
const users = require('../../data/users')('test')
const createTask = require('.')
const { ContentError } = require('../../utils/errors')
const { random } = Math
const uuid = require('uuid/v4')

describe.only('logic - create task', () => {
    before(() => tasks.load())

    let id, title, description, status

    beforeEach(() => { 
        id = uuid()
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        username = `username-${random()}`
        password = `password-${random()}`

        users.data.push({ id, name, surname, email, username, password })

        title = `title-${random()}`
        description = `description-${random()}` 

    })

    it('should succeed on creating a task', () =>
        createTask(token, title, description, status)
            .then(response => {
                expect(response).to.be.undefined

                expect(task).to.exist

                expect(task.title).to.equal(title)
                expect(task.description).to.equal(description)
                expect(task.status).to.equal(status)
                expect(task.user).to.equal(user)

                expect(task.id).to.exist
                expect(task.id).to.be.a('string')
                expect(task.id).to.have.length.greaterThan(0)
            })
    )

    
    // TODO other cases
})