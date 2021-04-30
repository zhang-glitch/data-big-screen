import { onMounted, onUnmounted, ref } from "vue";


const clock = function () {
  function timeFormatter(val) {
    // console.log(val)
    let hour = val.getHours()
    hour = hour < 10 ? "0" + hour : hour
    let minute = val.getMinutes()
    minute = minute < 10 ? "0" + minute : minute
    let second = val.getSeconds()
    second = second < 10 ? "0" + second : second
    return `${hour}:${minute}:${second}`
  }

  function dateFormatter(val) {
    let year = val.getFullYear();
    let month = val.getMonth() + 1;
    month = month < 10 ? "0" + month : month
    let day = val.getDate()
    day = day < 10 ? "0" + day : day
    return `${year}-${month}-${day}`
  }
  const time = ref(null);
  const date = ref(null);
  const timer = null;
  onMounted(() => {
    setInterval(() => {
      const newDate = new Date()
      time.value = timeFormatter(newDate)
      date.value = dateFormatter(newDate)
    }, 1000)
  })

  onUnmounted(() => {
    timer && clearInterval(timer)
  })

  return {
    time,
    date
  }
}

export default clock