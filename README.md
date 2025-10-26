# Formdata

## 什么是 FormData

- 浏览器提供的接口，用于构建用于 multipart/form-data 提交的键值对集合，常用于上传文件和提交表单数据。
- 可以包含字符串字段和 File/Blob 类型的数据（例如 input[type=file] 选择的文件）。

## 常用方法

- new FormData()：创建空的 FormData 实例。
- new FormData(formElement)：用表单元素初始化（会把表单控件的 name/value 一并加入）。
- append(name, value[, filename])：追加字段或文件。
- set(name, value)：设置字段（会覆盖同名项）。
- get(name)、getAll(name)、has(name)、delete(name)。
- entries()/keys()/values()/forEach()：遍历内容（可用于调试或转换）。

## 关键注意事项

- 当把 FormData 作为请求体（fetch、XHR、axios）发送时，浏览器会自动设置 Content-Type 为 multipart/form-data 并生成 boundary，不要手动把 Content-Type 设置为 'multipart/form-data'（否则 boundary 会丢失，服务器无法解析）。
- 要上传文件，请把 File 对象（来自 input.files） append 到 FormData。
- 如果需要显示上传进度，使用 XMLHttpRequest 的 upload.onprogress 或 axios 的 onUploadProgress。

```js
// 示例：把文件上传并设置 body 背景（与你的代码等价）
const input = document.querySelector('.bg-ipt')
input.addEventListener('change', e => {
  const file = e.target.files[0]
  if (!file) return

  const fd = new FormData()
  fd.append('img', file) // 将 File 加入 FormData

  // 注意：不要手动设置 Content-Type，axios 会让浏览器处理 boundary
  axios.post('http://hmajax.itheima.net/api/uploadimg', fd, {
    onUploadProgress(progressEvent) {
      // 可选：显示上传进度
      const percent = Math.round((progressEvent.loaded / progressEvent.total) * 100)
      console.log('上传进度', percent + '%')
    }
  }).then(res => {
    const imgUrl = res.data.data.url
    document.body.style.backgroundImage = `url(${imgUrl})`
    localStorage.setItem('bgImg', imgUrl)
  })
})
```

遍历`Formdata`（调试）

```js
const fd = new FormData()
fd.append('a', '1')
fd.append('file', someFile)

for (const [k, v] of fd.entries()) {
  console.log(k, v)
}
```

