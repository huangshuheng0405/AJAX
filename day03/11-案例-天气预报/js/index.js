/**
 * 目标1：默认显示-北京市天气
 *  1.1 获取北京市天气数据
 *  1.2 数据展示到页面
 */

function getWeather(cityCode) {
  myAxios({
    url: 'http://hmajax.itheima.net/api/weather',
    params: {
      city: cityCode,
    },
  }).then((result) => {
    console.log(result)
    // 渲染日期
    const weatherObj = result.data
    const dateStr = `<span class="dateShort">${weatherObj.date}</span>
        <span class="calendar">农历&nbsp;
          <span class="dateLunar">${weatherObj.dateLunar}</span>
        </span>`
    document.querySelector('.title').innerHTML = dateStr
    // 城市名字
    document.querySelector('.area').innerHTML = weatherObj.area
    // 当天气温
    const nowWeatherStr = `   <div class="tem-box">
        <span class="temp">
          <span class="temperature">${weatherObj.temperature}</span>
          <span>°</span>
        </span>
      </div>
      <div class="climate-box">
        <div class="air">
          <span class="psPm25">${weatherObj.psPm25}</span>
          <span class="psPm25Level">${weatherObj.psPm25Level}</span>
        </div>
        <ul class="weather-list">
          <li>
            <img src="${weatherObj.weatherImg}" class="weatherImg" alt="">
            <span class="weather">${weatherObj.weather}</span>
          </li>
          <li class="windDirection">${weatherObj.windDirection}</li>
          <li class="windPower">${weatherObj.windPower}</li>
        </ul>
      </div>`
    document.querySelector('.weather-box').innerHTML = nowWeatherStr
    // 当天天气
    const todayWeather = weatherObj.todayWeather
    const todayWeatherStr = `<div class="range-box">
        <span>今天：</span>
        <span class="range">
          <span class="weather">${weatherObj.weather}</span>
          <span class="temNight">${todayWeather.temNight}</span>
          <span>-</span>
          <span class="temDay">${todayWeather.temDay}</span>
          <span>℃</span>
        </span>
      </div>
      <ul class="sun-list">
        <li>
          <span>紫外线</span>
          <span class="ultraviolet">${todayWeather.ultraviolet}</span>
        </li>
        <li>
          <span>湿度</span>
          <span class="humidity">${todayWeather.humidity}</span>%
        </li>
        <li>
          <span>日出</span>
          <span class="sunriseTime">${todayWeather.sunriseTime}</span>
        </li>
        <li>
          <span>日落</span>
          <span class="sunsetTime">${todayWeather.sunsetTime}{</span>
        </li>
      </ul>`
    document.querySelector('.today-weather').innerHTML = todayWeatherStr
    // 七日天气预报的展示
    const dayForecast = weatherObj.dayForecast
    const dayForecastStr = dayForecast
      .map((item) => {
        return `<li class="item">
          <div class="date-box">
            <span class="dateFormat">${item.dateFormat}</span>
            <span class="date">${item.date}</span>
          </div>
          <img src="${item.weatherImg}" alt="" class="weatherImg">
          <span class="weather">${item.weather}</span>
          <div class="temp">
            <span class="temNight">${item.temNight}</span>-
            <span class="temDay">${item.temDay}</span>
            <span>℃</span>
          </div>
          <div class="wind">
            <span class="windDirection">${item.windDirection}</span>
            <span class="windPower">${item.windPower}</span>
          </div>
        </li>`
      })
      .join('')
    document.querySelector('.week-weather-box .week-wrap').innerHTML = dayForecastStr
  })
}
// 默认进入网页 获取天气数据
getWeather('110100')

// 搜索城市列表
document.querySelector('.search-city').addEventListener('input', (e) => {
  // console.log(e.target.value);
  myAxios({
    url: 'http://hmajax.itheima.net/api/weather/city',
    params: {
      city: e.target.value,
    },
  }).then((result) => {
    console.log(result)
    const listStr = result.data
      .map((item) => {
        return `<li class="city-item" data-code="${item.code}">${item.name}</li>`
      })
      .join('')
    // console.log(listStr);
    document.querySelector('.search-list').innerHTML = listStr
  })
})

// 切换城市天气
document.querySelector('.search-list').addEventListener('click', (e) => {
  if (e.target.classList.contains('city-item')) {
    // 获取城市编码
    const cityCode = e.target.dataset.code
    // console.log(cityCode);
    // 渲染天气数据
    getWeather(cityCode)
  }
})
