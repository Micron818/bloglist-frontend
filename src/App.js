import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState({});
  const [username, setUsername] = useState("hellas");
  const [password, setPassword] = useState("hellas");

  const initialUser = () => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      return user;
    }
  };

  const [user, setUser] = useState(() => initialUser());

  useEffect(() => {

    blogService.getAll().then((allBlogs) => {
      setBlogs(allBlogs);
      setMessage({ type: "note", message: "got all blogs" });
    });
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setMessage({ type: "note", message: "login and got all blogs" });
    } catch (exception) {
      setMessage({
        type: "error",
        message: exception.response.data.error || "wrong credentials",
      });
    }
  };

  const LoginForm = () => {
    return (
      <>
        <h2>log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>

          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </>
    );
  };

  const CreateBlogForm = () => {
    const [blog, setBlog] = useState({title:"",author:"",url:""});

    const handleNewBlog = async (event) => {
      event.preventDefault();
      try {
        const resultBlog = await blogService.create(blog);
        setBlogs([...blogs, resultBlog]);
        setMessage({ type: "note", message: "created a new blog!" });
      } catch (exception) {
        setMessage({ type: "error", message: exception.response.data.error || "wrong credentials",});
      }
    };

    const handleCancel=async(event)=>{
      console.log(event);
    }

    return (
      <form onSubmit={handleNewBlog}>
        <h2>create New</h2>
        <div>
          title:
          <input
            type="text"
            value={blog.title}
            onChange={({ target }) => setBlog({ ...blog, title: target.value })}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={blog.author}
            onChange={({ target }) =>
              setBlog({ ...blog, author: target.value })
            }
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={blog.url}
            onChange={({ target }) => setBlog({ ...blog, url: target.value })}
          />
        </div>
        <button type="submit">Create</button>
        <button type="button" onClick={handleCancel}>Cancel</button>
      </form>
    );
  };

  const BlogForm = () => {
    const handleLogout = async () => {
      window.localStorage.removeItem("loggedBlogappUser");
      setUser(null);
      setMessage({ type: "note", message: "login out" });
    };

    return (
      <div>
        <p>{user.name} logged in</p>
        <button onClick={handleLogout}>Logout</button>

        <CreateBlogForm />

        <h2>blogs</h2>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    );
  };

  return (
    <div>
      <Notification messageObj={message} />
      {user ? BlogForm() : LoginForm()}
    </div>
  );
};

export default App;
