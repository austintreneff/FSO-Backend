// eslint-disable-next-line no-unused-vars
const totalLikes = (blogs) => {
  let likes = 0

  blogs.forEach(blog => {
    if (blog.likes) {
      likes += blog.likes
    }
  })

  return likes
}

const favoriteBlog = (blogs) => {
  if (blogs.length <= 0) {
    return 'empty blogs array'
  }
  const favBlog = blogs.reduce((prev, current) => {
    console.log(current)
    return (prev.likes > current.likes) ? prev : current
  })

  return {
    title: favBlog.title,
    author: favBlog.author,
    likes: favBlog.likes,
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length <= 0) {
    return 'empty blogs array'
  }

  let authors = new Map()

  blogs.forEach(blog => {
    authors.set(blog.author, (authors.get(blog.author) || 0) + 1)
  })

  const author = [...authors.entries()].reduce((prev, curr) => prev[1] > curr[1] ? prev : curr)


  return {
    author: author[0],
    blogs: author[1]
  }
}

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs
}