/**
 * 目标1：完成省市区下拉列表切换
 *  1.1 设置省份下拉菜单数据
 *  1.2 切换省份，设置城市下拉菜单数据，清空地区下拉菜单
 *  1.3 切换城市，设置地区下拉菜单数据
 */
axios({
  url: 'http://hmajax.itheima.net/api/province',
}).then((result) => {
  console.log(result)
  provinceOption = result.data.list.map((pname) => `<option value="${pname}">${pname}</option>`).join('')
  document.querySelector('.province').innerHTML = `<option value="">省份</option>` + provinceOption
})

document.querySelector('.province').addEventListener('change', async (e) => {
  console.log(e.target.value) // 选择的省份名字
  const result = await axios({
    url: 'http://hmajax.itheima.net/api/city',
    params: {
      pname: e.target.value,
    },
  })
  console.log(result)
  const cityOption = result.data.list.map((cname) => `<option value="${cname}">${cname}</option>`).join('')
  console.log(cityOption)
  document.querySelector('.city').innerHTML = `<option value="">城市</option>` + cityOption

  // 清空地区列表
  document.querySelector('.area').innerHTML = `<option value="">地区</option>`
})

document.querySelector('.city').addEventListener('change', async (e) => {
  console.log(e.target.value) // 选择的城市名字
  const result = await axios({
    url: 'http://hmajax.itheima.net/api/area',
    params: {
      pname: document.querySelector('.province').value,
      cname: e.target.value,
    },
  })
  console.log(result)
  const areaOption = result.data.list.map((area) => `<option value="${area}">${area}</option>`).join('')
  document.querySelector('.area').innerHTML = `<option value="">地区</option>` + areaOption
})

document.querySelector('.submit').addEventListener('click',async () => {
  const form = document.querySelector('.info-form')
  const data = serialize(form, { hash: true, empty: true })
  console.log(data);
  try {
    const result = await axios({
      url: 'http://hmajax.itheima.net/api/feedback',
      method: 'POST',
      data: data
    })
    console.log(result);
    alert(result.data.message)

  } catch (error) {
    console.dir(error)
    alert(error.response.data.message)
  }
})
