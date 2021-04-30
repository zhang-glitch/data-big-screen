<template>
  <div class="user-header">
    <div class="left">
      <div class="user-item" v-for="item in headerData" :key="item.title">
        <div class="item-img">
          <img :src="item.img" :alt="item.title">
        </div>
        <div class="item-text">
          <div class="title">{{item.title}}</div>
          <div class="sub-title">{{item.subTitle}}</div>
          <div class="total-num">
            <vue-count-to 
              :startVal="item.startVal"
              :endVal="item.endVal"
              :duration="1000"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="operate-item" v-for="item in operates" :key="item.title">
        <img :src="item.img" :alt="item.title">
        <div class="title">{{item.title}}</div>
        <div class="rate">{{item.value}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import {ref, watch} from 'vue'
import VueCountTo from './vue-count-to/VueCountTo.vue'
export default {
  components: { VueCountTo },
  name: 'UserHeader',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  setup(props) {
      const operates = ref([{
          title: '转化率',
          value: `${props.data.covertRate}%`,
          img: 'https://www.youbaobao.xyz/datav-res/success.png'
        }, {
          title: '退单率',
          value: `${props.data.returnRate}%`,
          img: 'https://www.youbaobao.xyz/datav-res/failed.png'
        }])
      const headerData = ref([{
          title: '今日销售额',
          subTitle: 'Today\'s Sales Amount',
          startVal: 0,
          endVal: props.data.salesToday,
          img: 'https://www.youbaobao.xyz/datav-res/money.png'
        }, {
          title: '今日订单量',
          subTitle: 'Today\'s Total Orders',
          startVal: 0,
          endVal: props.data.orderToday,
          img: 'https://www.youbaobao.xyz/datav-res/order.png'
        }, {
          title: '今日交易用户数',
          subTitle: 'Today\'s Payed Users',
          startVal: 0,
          endVal: props.data.orderUser,
          img: 'https://www.youbaobao.xyz/datav-res/member.png'
        }, {
          title: '今日新增用户数',
          subTitle: 'Today\'s New Users',
          startVal:  0,
          endVal: props.data.userToday,
          img: 'https://www.youbaobao.xyz/datav-res/follow.png'
        }])
      watch(() => props.data, (newProps, oldProps) => {
        operates.value = [{
          title: '转化率',
          value: `${props.data.covertRate}%`,
          img: 'https://www.youbaobao.xyz/datav-res/success.png'
        }, {
          title: '退单率',
          value: `${props.data.returnRate}%`,
          img: 'https://www.youbaobao.xyz/datav-res/failed.png'
        }]
        headerData.value = [{
          title: '今日销售额',
          subTitle: 'Today\'s Sales Amount',
          startVal: (oldProps && oldProps.salesToday) || 0,
          endVal: newProps.salesToday,
          img: 'https://www.youbaobao.xyz/datav-res/money.png'
        }, {
          title: '今日订单量',
          subTitle: 'Today\'s Total Orders',
          startVal: (oldProps && oldProps.orderToday) || 0,
          endVal: newProps.orderToday,
          img: 'https://www.youbaobao.xyz/datav-res/order.png'
        }, {
          title: '今日交易用户数',
          subTitle: 'Today\'s Payed Users',
          startVal: (oldProps && oldProps.orderUser) || 0,
          endVal: newProps.orderUser,
          img: 'https://www.youbaobao.xyz/datav-res/member.png'
        }, {
          title: '今日新增用户数',
          subTitle: 'Today\'s New Users',
          startVal: (oldProps && oldProps.userToday) || 0,
          endVal: newProps.userToday,
          img: 'https://www.youbaobao.xyz/datav-res/follow.png'
        }]
      })
      return {
        operates,
        headerData
      }
  }
}
</script>

<style lang="scss" scoped>
  .user-header {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    background: rgb(66, 68, 70);
    padding: 0 40px;
    box-sizing: border-box;

    .left {
      flex: 1;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .user-item {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .item-img {
          width: 185px;
          height: 185px;
          background-color: rgb(131, 167, 72);
          border-radius: 50%;
          position: relative;

          img {
            width: 60%;
            height: 60%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }

        .item-text {
          margin-left: 40px;

          .title {
            font-size: 36px;
          }

          .sub-title {
            font-size: 16px;
            margin-top: 10px;
          }

          .total-num {
            font-family: DIN;
            font-size: 56px;
            font-weight: bolder;
            letter-spacing: 2px;
            margin-top: 10px;
          }
        }
      }
    }

    .right {
      width: 15%;
      display: flex;
      justify-content: space-around;
      align-items: center;

      .operate-item {
        text-align: center;
        
        img {
          width: 90px;
          height: 90px;
        }

        .title {
          text-align: center;
          font-size: 18px;
          margin-top: 10px;
        }

        .rate {
          text-align: center;
          font-size: 28px;
          font-weight: 700;
          margin-top: 5px;
        }
      }
    }
  }
</style>