<template>
  <div id="docMap">
    <Card
      ref="card"
      :style="`
        width: 1200px;
        height: 1000px;
        margin-bottom: 40px;
        background: url(${docMapUrl}) no-repeat;
        background-size: 120%;
        background-position: 90px -133px;
      `"
    >
      <a @click="close" class="back-title" style="position: absolute; z-index: 99999"> <Icon type="ios-arrow-back" />返回 </a>
      <div class="huabu">
        <Poptip
          trigger="hover"
          :content="item.name"
          word-wrap
          v-for="(item, index) in docMapArr"
          :key="index"
          :style="`top: ${item.top}%; left: ${item.left}%;`"
        >
          <Icon :custom="item.deviceIcon" size="30" :class="item.id == equipmentUid ? 'glowA' : ''"></Icon>
        </Poptip>
      </div>
    </Card>
  </div>
</template>

<script>
import { getEquipmentList } from "@/api/biz"
export default {
  name: "topology",
  props: ["uid", "equipmentUid"],
  data() {
    return {
      docMapUrl: "http://www.tythin.cn:20201/device/3374530fe9f146138923f499d9f9a490.png",
      docMapArr: [],
      docMapList: [],
      angle: 0,
      initialPosition: ["0,0", "0,1000", "1000,0", "1000,1000"],
    }
  },
  mounted() {
    getEquipmentList(this.uid).then(res => {
      if (res.code === 200) {
        res.result.forEach(item => {
          if (item.spaceProp !== " " && item.deviceIcon !== " " && item.name !== " " && item.id !== " ") {
            item.spaceProp = JSON.parse(item.spaceProp)
            this.docMapList.push(item)
          }
        })
        this.docMapObtain()
      }
    })
  },
  methods: {
    close() {
      this.$emit("close", true)
    },
    docMapObtain() {
      const leftTop1 = parseFloat(this.initialPosition[0].split(",")[0])
      const rightTop1 = parseFloat(this.initialPosition[1].split(",")[1])
      const leftTop2 = parseFloat(this.initialPosition[0].split(",")[1])
      const leftbottom1 = parseFloat(this.initialPosition[3].split(",")[0])
      let leftHeight = Math.abs(leftTop1 - leftbottom1)
      let topWidth = Math.abs(leftTop2 - rightTop1)
      this.docMapList.forEach((item, index) => {
        let y = Math.abs(item.spaceProp.y - leftTop1) / leftHeight
        let x = Math.abs(item.spaceProp.x - leftTop2) / topWidth
        let angle = Math.abs(Math.cos((this.angle * Math.PI) / 180 || 0))
        let xleft = (x * angle * 100).toFixed(2)
        let ytop = (y * angle * 100).toFixed(2)
        if (xleft <= 100 && ytop <= 100) {
          this.docMapArr.push({
            id: this.docMapList[index].id,
            name: this.docMapList[index].name,
            deviceIcon: this.docMapList[index].deviceIcon,
            left: xleft,
            top: ytop,
          })
        }
      })
    },
  },
}
</script>

<style lang="less">
@import "@/styles/table-common.less";
#docMap {
  background: #fff;
}
.huabu {
  margin: 0 auto;
  width: 100%;
  height: 900px;
  position: relative;
}
.huabu > .ivu-poptip {
  position: absolute;
  font-size: 12px;
  text-align: center;
}
// .huabu > .ivu-poptip .ivu-icon {
// }
.huabu > .ivu-poptip .glowA {
  box-shadow: 0 0 10px #f00;
  border: 1px solid green;
  background: #fff;
}
.ivu-poptip-popper > .ivu-poptip-content > .ivu-poptip-inner .ivu-poptip-body-content-inner {
  text-align: center;
}
</style>
