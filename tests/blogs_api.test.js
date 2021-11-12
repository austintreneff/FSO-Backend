const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const blogsApi = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  await blogsApi
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await blogsApi.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Adding a blog test',
    author: 'Austin T',
    url: 'someurl.html',
    likes: 100,
  }

  await blogsApi
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(n => n.title)
  expect(titles).toContain(
    'Adding a blog test'
  )
})

test('blog object is returned with `id` property instead of default `_id`', async () => {
  const response = await blogsApi.get('/api/blogs')
  const blogs = response.body

  expect(blogs[0].id).toBeDefined()
})

test('a blog added with no likes property defaults to zero likes', async () => {
  const newBlog = {
    title: 'Adding a blog test with no likes prop',
    author: 'Austin T',
    url: 'someurl.html'
  }

  const response = await blogsApi
    .post('/api/blogs')
    .send(newBlog)
  
  expect(response.body.likes).toBe(0)
})

test('400 error when trying to create blog without title', async () => {
  const newBlog = {
    author: 'Austin T',
    url: 'someurl.html',
    likes: 5
  }

  await blogsApi
    .post('/api/blogs')
    .send(newBlog)
    .expect(400, {
      error: 'Must give Title and URL properties'
    })
})



afterAll(() => {
  mongoose.connection.close()
}) 