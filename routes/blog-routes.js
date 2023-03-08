const express = require('express')

const blogRouter = express.Router()

const { getAllBlogs, postBlog, updateBlog, getBlog, deleteBlog, getBlogsOfUser } = require('../controllers/blog-controller')

blogRouter.route('/').get(getAllBlogs)
blogRouter.route('/post').post(postBlog)
blogRouter.route('/update/:id').patch(updateBlog)
blogRouter.route('/:id').get(getBlog).delete(deleteBlog)
blogRouter.route('/user/:id').get(getBlogsOfUser)

module.exports = blogRouter