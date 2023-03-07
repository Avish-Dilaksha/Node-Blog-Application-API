const express = require('express')

const blogRouter = express.Router()

const { getAllBlogs, postBlog, updateBlog, getBlog, deleteBlog } = require('../controllers/blog-controller')

blogRouter.route('/').get(getAllBlogs)
blogRouter.route('/post').post(postBlog)
blogRouter.route('/update/:id').patch(updateBlog)
blogRouter.route('/:id').get(getBlog).delete(deleteBlog)

module.exports = blogRouter