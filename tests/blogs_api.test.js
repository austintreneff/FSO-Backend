const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')

const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 10000)

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
}, 10000)

test('blog object is returned with `id` property instead of default `_id`', async () => {
  const response = await api.get('/api/blogs')
  const blogs = response.body

  expect(blogs[0].id).toBeDefined()
})

test('200 when updating a note by id', async () => {
  const blogId = '5a422bc61b54a676234d17fc'
  const updatedBlog = {
    title: 'updating this blog',
    author: 'Austin T',
    url: 'someurl.html',
    likes: 58
  }

  await api
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

describe('Requires authentication', () => {
  let loginResponse
  let token

  beforeAll(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })
    await user.save()
  
    loginResponse = await api
      .post('/api/login')
      .send({ username: 'root', password: 'sekret' })
      .expect(200)
    
    token = loginResponse.body.token
  })
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'Adding a blog test',
      author: 'Test User',
      url: 'test.com',
      likes: 200,
    }
  
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`) 
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
  
  test('a blog added with no likes property defaults to zero likes', async () => {
    const newBlog = {
      title: 'Adding a blog test with no likes prop',
      author: 'Austin T',
      url: 'someurl.html'
    }
  
    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
    
    expect(response.body.likes).toBe(0)
  })

  test('204 when deleting a note by id', async () => {
    const newBlog = {
      title: 'Adding a blog remove',
      author: 'Test User for removal',
      url: 'test.com',
      likes: 200,
    }
  
    const blogResponse = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`) 
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    
    const blogId = blogResponse.body.id
  
    await api
      .delete(`/api/blogs/${blogId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)
  })  
  
  test('400 error when trying to create blog without title', async () => {
    const newBlog = {
      author: 'Austin T',
      url: 'someurl.html',
      likes: 5
    }
  
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400, {
        error: 'Must give Title and URL properties'
      })
  })
})

afterAll(() => {
  mongoose.connection.close()
}) 