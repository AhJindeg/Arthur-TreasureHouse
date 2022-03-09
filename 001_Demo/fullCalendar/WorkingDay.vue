<template>
  <div class="search">
    <Card>
      <p style="font-size: 18px" slot="title">&nbsp;&nbsp;&nbsp;效能工作日</p>
      <full-calendar
        style="margin-bottom: 80px"
        :events="monthData"
        class="test-fc"
        first-day="0"
        locale="fr"
        lang="zh"
        @changeMonth="changeMonth"
        @eventClick="eventClick"
        @dayClick="dayClick"
        @moreClick="moreClick"
      >
      </full-calendar>
    </Card>
  </div>
</template>

<script>
import {
  getWorkingDayListAll,
  getWorkingDayList,
  addWorkingDay,
  editWorkingDay,
  deleteWorkingDay,
  userInfo,
} from "@/api/interface"
// import fullCalendar from "../../../assets/vue-fullcalendar/fullCalendar.vue"
import fullCalendar from "vue-fullcalendar"
export default {
  components: {
    fullCalendar,
  },
  data() {
    return {
      monthData: [],
      userInfoData: {},
    }
  },
  methods: {
    // 选择月份
    // changeMonth(start, end, current) {
    //   console.log("changeMonth", start.format(), end.format(), current.format())
    // },
    // 点击事件
    eventClick(event, jsEvent, pos) {
      if (jsEvent.path[0].innerHTML.includes("工作日") && !!this.userInfoData.type) {
        this.$Modal.confirm({
          title: "删除工作日",
          // 记得确认修改此处
          content: "您确认要删除该工作日吗?",
          // loading: true,
          onOk: () => {
            deleteWorkingDay({ ids: event.YOUR_DATA.id }).then(res => {
              if (res.success) {
                this.getDataList()
                this.$Message.success("操作成功")
              }
            })
          },
        })
      }
    },
    // 点击当天
    dayClick(day, jsEvent) {
      if (!jsEvent.path[0].innerHTML.includes("工作日") && !!this.userInfoData.type) {
        this.$Modal.confirm({
          title: "添加工作日",
          // 记得确认修改此处
          content: "您确认要将该日期设为工作日吗?",
          // loading: true,
          onOk: () => {
            let day1 = new Date(day)
            let date1 = day1.getFullYear() + "-" + (day1.getMonth() + 1) + "-" + day1.getDate()
            let Date1 = new Date(Date.parse(date1)).toLocaleString()
            let form = {
              workDate: Date1,
              workdate: date1,
            }
            addWorkingDay(form).then(res => {
              if (res.success) {
                this.getDataList()
                this.$Message.success("操作成功")
              }
            })
          },
        })
      }
    },
    // 查看更多
    // moreClick(day, events, jsEvent) {
    //   console.log("moreCLick", day, events, jsEvent)
    // },
    // 初始化
    init() {
      this.getDataList()
      this.gitUserInfo()
    },
    gitUserInfo() {
      userInfo().then(res => {
        if (res.success) {
          this.userInfoData = res.result
          // console.log(this.userInfoData.type, "12356")
        }
      })
    },
    getDataList() {
      // this.loading = true
      getWorkingDayListAll().then(res => {
        if (res.success) {
          this.monthData = []
          res.result.forEach(item => {
            this.monthData.push({
              title: "工作日",
              start: item.workdate,
              // "end": item.workdate,
              YOUR_DATA: {
                id: item.id,
              },
              // "cssClass": "red",
            })
          })
        }
      })
    },
  },
  mounted() {
    this.init()
  },
}
</script>
<style lang="less" scoped>
@import "@/styles/table-common.less";
/deep/.test-fc {
  max-width: 80%;
  // flex
  .events-day {
    min-height: 99px !important;
  }
  // 日期大小
  .day-number {
    padding-right: 10px;
    font-size: 18px;
  }
  // 2022
  .header-center {
    font-size: 24px;
  }
  // 1234567
  .weeks {
    height: 70px;
    font-size: 20px;
    line-height: 70px;
  }
  .is-start {
    // display: block;
    height: 30px !important;
    line-height: 30px !important;
    font-size: 16px !important;
    text-align: right;
    padding-right: 20px !important;
  }
  // .red {
  //   background: red !important;
  // }
}
</style>
