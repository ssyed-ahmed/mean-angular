var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var Book = require('../models/Book')

// Get All books
router.get('/', (req, res, next) => {
	Book.find((err, books) =>{
		if (err) {
			return next(err)
		}
		res.json(books)
	})
})

// Get Single book by Id
router.get('/:id', (req, res, next) => {
	const id = req.params.id
	Book.findById(id, (err, book) => {
		if (err) {
			return next(err)
		}
		res.json(book)
	})
})

// Create/Save book
router.post('/', (req, res, next) => {
	const body = req.body
	Book.create(body, (err, book) => {
		if (err) {
			return next(err)
		}
		res.json(book)
	})
})

// Update book
router.post('/:id', (req, res, next) => {
	const id = req.params.id
	Book.findByIdAndUpdate(id, (err, book) => {
		if (err) {
			return next(err)
		}
		res.json(book)
	})
})

// Delete book
router.delete('/:id', (req, res, next) => {
	const id = req.params.id
	Book.findByIdAndRemove(id, (err, book) => {
		if (err) {
			return next(err)
		}
		res.json(book)
	})
})

module.exports = router