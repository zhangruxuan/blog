import ShowBlogs from './components/ShowBlogs.vue'
import addBlog from './components/addBlog.vue'
import SingleBlog from './components/SingleBlog.vue'
export default[
  {path: '/', component: ShowBlogs},
  {path: '/add', component: addBlog},
  {path: '/blog/:id', component: SingleBlog}
]
