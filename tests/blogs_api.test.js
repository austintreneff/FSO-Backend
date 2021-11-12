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

test.only('200 when updating a note by id', async () => {
  const blogId = '5a422bc61b54a676234d17fc'
  const updatedBlog = {
    title: 'updating this blog',
    author: 'Austin T',
    url: 'someurl.html',
    likes: 58
  }

  await blogsApi
    .put(`/api/blogs/${blogId}`, )
    .send(updatedBlog)
    .expect(200, {
      title: 'updating this blog',
      author: 'Austin T',
      url: 'someurl.html',
      likes: 58,
      id: '5a422bc61b54a676234d17fc'
    })
})

test('204 when deleting a note by id', async () => {
  const blogId = '5a422bc61b54a676234d17fc'

  await blogsApi
    .delete(`/api/blogs/${blogId}`)
    .expect(204)
})


afterAll(() => {
  mongoose.connection.close()
}) 