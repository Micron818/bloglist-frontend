const BlogContent = ({ blog, removeBlog, user, handleAddLike }) => {
  return (
    <div className="blogContent">
      <p>{blog.url} </p>
      <div>
        likes: {blog.likes}{' '}
        <button onClick={handleAddLike}>
          like
        </button>
      </div>
      <p>{blog.user && blog.user.name} </p>
      {user && user.id === blog.user.id && (
        <button onClick={removeBlog}>remove</button>
      )}
    </div>
  )
}

export default BlogContent
