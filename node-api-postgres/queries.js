const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'api',
  password: 'password',
  port: 5432,
})

// GET all users
const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

//GET a single user by ID
const getUserById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

//POST a new user
const createUser = (request, response) => {
    const { firstname, email } = request.body
  
    pool.query('INSERT INTO users (firstname, email) VALUES ($1, $2)', [firstname, email], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with ID: ${results.insertId}`)
    })
  }

//PUT updated data in an existing user
const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const { firstname, email } = request.body
  
    pool.query('UPDATE users SET firstname = $1, email = $2 WHERE id = $3',
      [firstname, email, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`User modified with ID: ${id}`)
      }
    )
  }

//DELETE a user
const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User deleted with ID: ${id}`)
    })
  }

//Exporting CRUD functions in a REST API
  module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
  }