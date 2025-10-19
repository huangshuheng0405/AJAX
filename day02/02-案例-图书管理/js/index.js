/**
 * 目标1：渲染图书列表
 *  1.1 获取数据
 *  1.2 渲染数据
 */

const creator = '老张'
// 获取数据并渲染图书列表
function getBooksList() {
  axios({
    url: 'http://hmajax.itheima.net/api/books',
    params: {
      creator,
    },
  }).then((result) => {
    console.log(result)
    const bookList = result.data.data
    console.log(bookList)
    // 渲染数据
    const htmlStr = bookList
      .map((item, index) => {
        const { bookname, author, publisher, id } = item
        return ` <tr>
          <td>${index + 1}</td>
          <td>${bookname}</td>
          <td>${author}</td>
          <td>${publisher}</td>
          <td data-id=${id}>
            <span class="del">删除</span>
            <span class="edit">编辑</span>
          </td>
        </tr>`
      })
      .join('')
    console.log(htmlStr)

    document.querySelector('.list').innerHTML = htmlStr
  })
}

// 网页加载运行 获取并渲染一次
getBooksList()

// 新增图书
const addModalDom = document.querySelector('.add-modal')
const addModal = new bootstrap.Modal(addModalDom)

document.querySelector('.add-btn').addEventListener('click', () => {
  // 收集表单数据 并提交到服务器保存
  const addForm = document.querySelector('.add-form')
  const bookObj = serialize(addForm, { hash: true, empty: true })
  // console.log(bookObj)
  // 提交到服务器
  axios({
    url: 'http://hmajax.itheima.net/api/books',
    method: 'post',
    data: {
      ...bookObj,
      creator,
    },
  }).then((result) => {
    console.log(result)
    getBooksList()
    //重置表单
    addForm.reset()
  })

  // 点击保存隐藏弹窗
  addModal.hide()
})

// 删除图书
document.querySelector('.table .list').addEventListener('click', (e) => {
  // 获取触发事件的目标元素
  // console.log(e.target);
  // 判断点击的是否是删除元素
  if (e.target.classList.contains('del')) {
    // console.log('del');
    // 获取图书id  parentNode是父元素节点
    const bookId = e.target.parentNode.dataset.id
    // console.log(bookId);
    axios({
      url: `http://hmajax.itheima.net/api/books/${bookId}`,
      method: 'delete',
    }).then((result) => {
      // 重新渲染界面
      getBooksList()
    })
  }
})

// 编辑图书
const editDom = document.querySelector('.edit-modal')
const editModal = new bootstrap.Modal(editDom)

// 点击编辑 显示弹窗
document.querySelector('.table .list').addEventListener('click', (e) => {
  // 判断点击的是否是编辑元素
  if (e.target.classList.contains('edit')) {
    // console.log('edit');
    // 获取当前编辑图书的数据 回显到编辑表单中
    const bookId = e.target.parentNode.dataset.id
    // console.log(bookId);
    axios({
      url: `http://hmajax.itheima.net/api/books/${bookId}`,
    }).then((result) => {
      // console.log(result);
      const bookObj = result.data.data
      // document.querySelector('.edit-form .bookname').value = bookObj.bookname
      // document.querySelector('.edit-form .author').value = bookObj.author
      // document.querySelector('.edit-form .publisher').value = bookObj.publisher
      // 数据对象 属性 和 标签类名 一样
      // 遍历数据对象 使用属性区获取对应标签 快速赋值
      const keys = Object.keys(bookObj)
      console.log(keys) //['id', 'bookname', 'author', 'publisher']
      keys.forEach((item) => {
        document.querySelector(`.edit-form .${item}`).value = bookObj[item]
      })
    })

    editModal.show()
  }
})

// 点击修改按钮 隐藏弹窗
document.querySelector('.edit-btn').addEventListener('click', () => {
  const editForm = document.querySelector('.edit-form')
  const { id, bookname, author, publisher } = serialize(editForm, { hash: true, empty: true })
  // id隐藏起来是为了不让用户修改 id用于保存正在编辑的图书
  axios({
    url: `http://hmajax.itheima.net/api/books/${id}`,
    method: 'put',
    data: {
      bookname,
      author,
      publisher,
      creator
    }
  }).then(() => {
    // 修改后 重新渲染界面
    getBooksList()
    editModal.hide()
  })

})
