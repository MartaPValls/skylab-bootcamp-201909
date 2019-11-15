const { expect } = require('chai')
const users = require('../../data/users')('test')
const tasks = require('../../data/tasks')('test')
const modifyTask = require('.')
const { random } = Math
const uuid = require('uuid')

describe.only('logic - modify task', () => {
    before(() => Promise.all([users.load(), tasks.load()]))

    let id, name, surname, email, username, password, title, description, taskId

    beforeEach(() => {
        id = uuid()
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        username = `username-${random()}`
        password = `password-${random()}`

        users.data.push({ id, name, surname, email, username, password })

        const task = {
            id: uuid(),
            user: id,
            title: `title-${random()}`,
            description: `description-${random()}`,
            status: 'REVIEW',
            date: new Date,
            lastAcces: new Date
        }

        tasks.data.push(task)

        taskId = '12345'
        title = `title-${random()}`
        description = `description-${random()}`
    })

    it('should succeed on modify task', () =>
    
        modifyTask(id, taskId, title, description)
            .then(taskId => {
                expect(taskId).to.exist
                expect(taskId).to.be.a('string')
                expect(taskId).to.have.length.greaterThan(0)

                const task = tasks.data.find(({ id }) => id === taskId)

                expect(task).to.exist
                expect(task.user).to.equal(id)
                expect(task.title).to.equal(title)
                expect(task.description).to.equal(description)
                expect(task.status).to.equal('TODO')
                expect(task.date).to.exist
                expect(task.date).to.be.instanceOf(Date)
            })
    )

    // TODO other test cases
})