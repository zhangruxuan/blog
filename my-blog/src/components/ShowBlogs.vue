<template>
    <div v-theme:column="'narrow'" id='show-blogs'>
        <h1>博客总览</h1>
        <input type="text" v-model="search" placeholder="搜索">
        <div v-for="blog in filteredBlogs" class="single-blog" :key="blog.id">
            <router-link v-bind:to="'/blog/' + blog.id">
            <h2 v-rainbow>{{blog.title | to-uppercase}}</h2>
            </router-link>
            <article>
                {{blog.content | snippet}}
            </article>
        </div>
    </div>
</template>

<script>
export default {
  name: 'show-blogs',
  data () {
    return {
      blogs: [],
      search: ''
    }
  },
  //  请求数据
  created () {
    // this.$http.get('http://jsonplaceholder.typicode.com/posts')
    // this.$http.get('./../static/posts.json')
    this.$http.get('https://test-20530-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json')
      .then(function (data) {
        return data.json()
        // console.log(data.json())
        // this.blogs = data.body.slice(0, 10)
        // console.log(this.blogs)
      })
      .then(function (data) {
        var blogsArray = []
        for (let key in data) {
          // console.log(data[key])
          data[key].id = key
          blogsArray.push(data[key])
        }
        // console.log(blogsArray)
        this.blogs = blogsArray
        // console.log(this.blog['-Mi_qrumRuSWkcAEBYoG'].title)
      })
  },
  // 搜索
  computed: {
    filteredBlogs: function () {
      // 拿到所有数据
      return this.blogs.filter((blog) => {
        // 展示与search匹配的内容
        return blog.title.match(this.search)
      })
    }
  },
  filters: {
    'to-uppercase': function (value) {
      return value.toUpperCase()
    }
    // toUppercase方法
    // toUppercase (value) {
    //   return value.toUpperCae()
    // }
  },
  // 指令的全局变成本地的方法
  directives: {
    'rainbow': {
      bind (el, binging, vnode) {
        el.style.color = '#' + Math.random().toString(16).slice(2, 8)
      }
    }
  }
}
</script>

<style scoped>
#show-blogs{
    max-width: 800px;
    margin: 0 auto;
}
.single-blog{
    padding: 20px;
    margin: 20px 0;
    box-sizing: border-box;
    background: #eee;
    border: 1px dotted #aaa;
}

#show-blogs a{
color: #444;
text-decoration: none;
}

input[type="text"]{
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
}
</style>
