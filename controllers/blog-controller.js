const asyncWrapper = require('../middlewares/async')
const { StatusCodes } = require('http-status-codes')
const { NotFound, BadRequest, UnAuthorized } = require('../errors')

const Blogs = require('../models/Blogs')
const User = require('../models/User')
const { default: mongoose } = require('mongoose')

const getAllBlogs = asyncWrapper( async(req, res, next) => {
    const blogs = await Blogs.find()
    if(!blogs) {
        throw NotFound('No blogs found')
    }

    res.status(StatusCodes.OK).json(blogs)
})

const postBlog = asyncWrapper( async(req,res,next) => {
    const { title, description, image, user } = req.body
    const exsistingUser = await User.findById(user)
    if(!exsistingUser) {
        throw new UnAuthorized('User not athorized')
    }
    const blog = new Blogs({
        title,
        description,
        image,
        user,
    })
    const session = await mongoose.startSession()
    session.startTransaction()
    await blog.save({ session })
    exsistingUser.blogs.push(blog)
    await exsistingUser.save({ session })
    await session.commitTransaction()

    res.status(StatusCodes.CREATED).json({blog})
})

const getBlog = asyncWrapper(async (req,res,next)=> {
    const { id:blogId } = req.params
    const blog = await Blogs.findOne({
        _id:blogId
    })
    if(!blog) {
        throw new NotFound(`No job with id ${blogId}`)
    }
    res.status(StatusCodes.OK).json({blog})
})

const updateBlog = asyncWrapper(async (req,res,next) => {
    const { 
        body: {title, description}, 
        params:{id:blogID}
    } = req

    if(title === '' || description === '') {
        throw new BadRequest('title or description cannot be empty')
    }

    const blog = await Blogs.findByIdAndUpdate({_id:blogID}, req.body, {
        new: true,
        runValidators: true
    })

    if(!blog) {
        throw NotFound(`No blog found by id ${blogID}`)
    }

    res.status(StatusCodes.OK).json({blog})
})

const deleteBlog = asyncWrapper( async (req, res, next) => {
    const { id:blogId } = req.params

    const blog = await Blogs.findByIdAndRemove({
        _id:blogId
    }).populate('user')
    await blog.user.blogs.pull(blog)
    await blog.user.save()
    if(!blog) {
        throw new NotFound(`No job with id ${blogId}`)
    }
    res.status(StatusCodes.OK).send()
})

const getBlogsOfUser = asyncWrapper( async (req,res,next) => {
    const { id:userId } = req.params
    const userBlogs = await User.findById({_id:userId}).populate('blogs')
    if(!userBlogs) {
        throw new NotFound(`No blogs found of user id : ${userId}`)
    }

    res.status(StatusCodes.OK).json({blogs: userBlogs})
})

module.exports = { 
    getAllBlogs,
    postBlog,
    updateBlog,
    getBlog,
    deleteBlog,
    getBlogsOfUser,
}