export default function (username, password) {
    validate.string(username)
    validate.string.notVoid('username', username)
    validate.string(password)
    validate.string.notVoid('password', password)

	return fetch('http://192.168.0.41:8000/users', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ name, surname, email, username, password })
	})
		.then(res => res.status === 201 ? undefined : res.json().then(({ message }) => { throw Error(message) }))
}



/*
fetch('http://192.168.0.41:8000/auth', {
	method: 'POST',
	headers: { 'Content-Type': 'application/json' },
	body: JSON.stringify({ username: 'pepito-123', password: '123' })
})
	.then(res => res.json())
	.then(res => { debugger })
*/