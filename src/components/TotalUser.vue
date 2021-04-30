<template>
  <div class="total-user">
    <div class="title">臻尚用户总数</div>
    <div class="sub-title">User Total Count</div>
    <div class="total">
      <vue-count-to 
        :start-val="startVal"
        :end-val="userTotal"
        :duration="1000"
      />
    </div>
    <div class="rate-text">
      <div class="day-rate">
        <span>每日增长率：</span>
        <span>
          <vue-count-to 
            :start-val="startPercent"
            :end-val="userGrowthLastDay"
            :duration="1000"
            :decimals="2"
            :suffix="'%'"
          />
        </span>
      </div>
      <div class="month-rate">
        <span>每月增长率：</span>
        <span>
          <vue-count-to 
            :start-val="startPercent2"
            :end-val="userGrowthLastMonth"
            :duration="1000"
            :decimals="2"
            :suffix="'%'"
          />
        </span>
      </div>
    </div>
    <div class="percent">
      <div class="precent-width" :style="{width: `${userGrowthLastDay}%`}"></div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import VueCountTo from './vue-count-to/VueCountTo.vue'
export default {
  components: { VueCountTo },
  name: 'TotalUser',
  props: {
    userTotal: {
      type: Number,
      required: true
    },
    userGrowthLastDay: {
      type: Number,
      required: true
    },
    userGrowthLastMonth: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    // const { userGrowthLastDay, userGrowthLastMonth} = toRefs(props)
      const startVal = ref(0)
      const startPercent = ref(0)
      const startPercent2 = ref(0)
      const updateStartVal = () => {
        startVal.value = props.userTotal
        startPercent.value = props.growthLastDay
        startPercent2.value = props.growthLastMonth
      }
      return {
        startVal,
        startPercent,
        startPercent2,
        updateStartVal
      }
  }
}
</script>

<style lang="scss" scoped>
  .total-user {
    width: 100%;
    height: 100%;
    background: rgb(66, 68, 70);
    box-shadow: 0 10px 10px rgba(0, 0, 0, .3);
    padding: 20px 40px;
    box-sizing: border-box;

    .title {
      font-size: 32px;
    }

    .sub-title {
      font-size: 16px;
      letter-spacing: 1px;
      margin-top: 10px;
    }

    .total {
      font-family: DIN;
      font-size: 68px;
      font-weight: bolder;
      letter-spacing: 2px;
      padding: 10px 0;
    }

    .rate-text {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 28px;
      font-family: DIN;
      letter-spacing: 2px;

      .day-rate {
        color: rgb(197, 251, 121);
      }

      .month-rate {
        color: rgb(99, 169, 0);
      }
    }

    .percent {
      height: 20px;
      width: 100%;
      border: 1px solid #ffffff;
      border-radius: 5px;
      margin-top: 10px;
      overflow: hidden;

      .precent-width {
        height: 100%;
        background:rgb(150, 150, 150);
      }
    }
  }

</style>