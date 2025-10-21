/**
 * 目标1：信息渲染
 *  1.1 获取用户的数据
 *  1.2 回显数据到标签上
 * */

const creator = 'hsh'

axios({
  url: 'http://hmajax.itheima.net/api/settings',
  params: {
    creator,
  },
}).then((result) => {
  console.log(result)
  const userObj = result.data.data
  console.log(userObj)
  Object.keys(userObj).forEach((key) => {
    if (key === 'avatar') {
      // 赋值默认头像
      document.querySelector('.prew').src = userObj[key]
    } else if (key === 'gender') {
      // 赋予默认性别
      // 获取性别单选框
      const genderSelect = document.querySelectorAll('.gender')
      // 获取性别数字 0男1女
      const genderNumber = userObj[key]
      // 性别数字作为下标
      genderSelect[genderNumber].checked = true
    } else {
      // 赋予默认内容
      document.querySelector(`.${key}`).value = userObj[key]
    }
  })
})

// 更新头像
document.querySelector('.upload').addEventListener('change', (e) => {
  // 获取头像文件
  console.log(e.target.files[0])
  const fd = new FormData()
  fd.append('avatar', e.target.files[0])
  fd.append('creator', creator)
  // 提交服务器并更新头像
  axios({
    url: 'http://hmajax.itheima.net/api/avatar',
    method: 'put',
    data: fd,
  }).then((result) => {
    // console.log(result);
    const imageUrl = result.data.data.avatar
    // 把新的头像回显到页面
    document.querySelector('.prew').src = imageUrl
  })
})

// 提交表单
document.querySelector('.submit').addEventListener('click', () => {
  // 收集表单数据
  const userForm = document.querySelector('.user-form')
  const userObj = serialize(userForm, { hash: true, empty: true })
  userObj.creator = creator
  // 性别数字是字符串类型 要转成数字类型
  userObj.gender = +userObj.gender
  // console.log(userObj);
  axios({
    url: 'http://hmajax.itheima.net/api/settings',
    method: 'put',
    data: userObj
  }).then(result => {
    const toastDom = document.querySelector('.my-toast')
    const toast = new bootstrap.Toast(toastDom)

    toast.show()
  })
})


