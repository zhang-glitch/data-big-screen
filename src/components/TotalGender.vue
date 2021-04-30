<template>
  <div class="total-gender">
    <div class="male">
      <div class="male-img">
          <img src="http://img.alicdn.com/tfs/TB1p9Luq8v0gK0jSZKbXXbK2FXa-500-500.png">
      </div>
      <div class="male-text">
        <div class="title">男性用户人数</div>
        <div class="sub-title">Number of male users</div>
        <div class="male-number">
          <vue-count-to 
            :startVal="0"
            :endVal="gender[0].value"
            :separator="','"
            :duration="1000"
          />
          <span class="wanren">万人</span>
        </div>
      </div>
    </div>
    <div class="female">
      <div class="female-img">
          <img src="http://img.alicdn.com/tfs/TB1p9Luq8v0gK0jSZKbXXbK2FXa-500-500.png">
      </div>
      <div class="female-text">
        <div class="title">女性用户人数</div>
        <div class="sub-title">Number of female users</div>
        <div class="female-number">
          <vue-count-to 
            :startVal="0"
            :endVal="gender[1].value"
            :separator="','"
            :duration="1000"
          />
          <span class="wanren">万人</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueCountTo from './vue-count-to/VueCountTo.vue'
export default {
  name: 'TotalGender',
  components: {
    VueCountTo
  },
  props: {
    gender: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss">
  .total-gender {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 100%;
    background: rgb(43, 44, 46);
    box-sizing: border-box;

    .female-number, .male-number {
      font-size: 49px;
      font-family: DIN;
      font-weight: bolder;
      margin-top: 10px;

      .wanren {
        font-size: 20px;
      }
    }
    .male {
      display: flex;

      .male-img {
        width: 75px;
        height: 75px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .male-text {
        flex: 1;
        margin-left: 40px;

        .title {
          font-size: 32px;
        }

        .sub-title {
          font-size: 16px;
          margin-top: 10px;
        }
      }
    }

    .female {
      display: flex;

      .female-img {
        width: 75px;
        height: 75px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .female-text {
        flex: 1;
        margin-left: 40px;

        .title {
          font-size: 32px;
        }

        .sub-title {
          font-size: 16px;
          margin-top: 10px;
        }


      }
    }
  }
</style>