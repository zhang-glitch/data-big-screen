<template>
  <div class="top-header">
    <div class="logo">
      <img src="https://datav.oss-cn-hangzhou.aliyuncs.com/uploads/images/54149aa06f26afcf26f42d66c999ee8b.png" alt="数据大屏">
    </div>
    <div class="center-text">
      <div class="title">臻尚业务数据大盘</div>
      <div class="sub-title">Zhenshang business data market</div>
    </div>
    <div class="right-text">
      <div class="left-img">
        <img src="https://img.alicdn.com/tfs/TB1Kbzuq.z1gK0jSZLeXXb9kVXa-600-500.png" alt="">
      </div>
      <div class="right-time">
        <span class="date">{{date}}</span>
        <span class="time">{{time}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import clock from '../util/clock'
export default {
  name: 'TopHeader',
  setup() {
    const {time, date} = clock();
    return {
      time,
      date
    }
  }
}
</script>

<style lang="scss" scoped>
  .top-header {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    background: #241f20;
    display: flex;
    align-items: center;
    padding: 0 60px;

    .logo {
      width: 395px;
      height: 99px;
      img {
        width: 100%;
        height: 100%;
      }
    }

    .center-text {
      color: #ffffff;
      margin-left: 40px;
      flex: 1;

      .title {
        font-size: 60px;
        font-weight: bold;
        font-size: 60px;
        letter-spacing: 2px;
      }

      .sub-title {
        font-size: 35px;
      }
    }

    .right-text {
      display: flex;
      align-items: center;
      justify-content: space-around;

      .left-img {
        width: 363px;
        height: 150px;
        img {
          width: 100%;
          height: 100%;
        }
      }

      .right-time {
        font-size: 52px;
        .date {
          color: #ffffff;
          margin-right: 20px;
        }
        .time {
          color: #c5fb79;
        }
      }
    }
  }
</style>