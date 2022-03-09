<template>
  <div id="docMap">
    <Card ref="card">
      <div slot="title">
        <div class="edit-head">
          <a @click="close" class="back-title"> <Icon type="ios-arrow-back" />返回 </a>
          <div class="head-name">设备地图</div>
          <a @click="close" class="window-close">
            <Icon type="ios-close" size="31" class="ivu-icon-ios-close" />
          </a>
        </div>
      </div>
      <!-- 地图 -->
      <div style="display: flex; overflow-y: hidden">
        <div
          class="huabu"
          :style="`
          background: url(${this.pic}) no-repeat;
          background-size: 100%;`"
          id="huabu"
        >
          <div
            class="huaChild"
            v-for="(item, index) in docMapList"
            :key="index"
            @mousedown="move($event, item, index)"
            :style="`position: absolute;top: ${item.top}%; left: ${item.left}%;`"
          >
            <!-- 图标 -->
            <Poptip id="dragPoint" :content="item.name" word-wrap>
              <Icon :custom="item.deviceIcon" size="26" :class="item.id == equipmentUid ? 'glowA' : ''" @click="deviceInfo(item)"></Icon>
              <br />
              <span style="user-select: none">维修中···</span>
            </Poptip>
          </div>
        </div>
        <div class="formRigth">
          <!-- 属性表单 -->
          <Form :model="formRigth" label-position="left" :label-width="70">
            <FormItem label="设备名称">
              <Input v-model="formRigth.name"></Input>
            </FormItem>
            <FormItem label="设备状态">
              <Input v-model="formRigth.status"></Input>
            </FormItem>
            <FormItem label="关联空间">
              <Input v-model="formRigth.supportName"></Input>
            </FormItem>
            <FormItem label="空间属性">
              <Input v-model="formRigth.spacePropp"></Input>
            </FormItem>
            <FormItem label="地图角度">
              <Input v-model="formRigth.angle"></Input>
            </FormItem>
            <FormItem label="空间图片">
              <Input v-model="formRigth.pic"></Input>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="getList(formRigth.id, formRigth.spacePropp)">保存修改</Button>
            </FormItem>
          </Form>
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
import { getEquipmentList, updateSelect } from "@/api/biz"
export default {
  name: "docMapArr",
  props: ["uid", "equipmentUid", "pic"],
  data() {
    return {
      // 表单
      formRigth: {},
      // 设备列表
      docMapList: [],
      // 临时表
      mapTemporary: [],
      // 角度
      angle: 0,
      // 地图初始位置
      initialPosition: ["0,0", "0,1000", "1000,0", "1000,1000"],
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
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
          this.docMapList[index].left = xleft
          this.docMapList[index].top = ytop
        }
        this.docMapList[index].spacePropp = JSON.stringify(item.spaceProp)
      })
    },
    getList() {
      let uid = this.uid
      getEquipmentList(uid).then(res => {
        if (res.code === 200) {
          res.result.forEach(item => {
            if (item.spaceProp !== " " && item.deviceIcon !== " " && item.name !== " " && item.id !== " ") {
              item.spaceProp = JSON.parse(item.spaceProp)
              this.docMapList.push(item)
            }
          })
          // 调用定位方法
          this.docMapObtain()
        }
      })
    },
    upDate(id, spaceProp) {
      spaceProp = JSON.stringify(spaceProp)
      let params = { "id": id, "spaceProp": spaceProp }

      if (id !== "" && spaceProp !== "") {
        updateSelect(params).then(res => {
          if (res.code === 200) {
            this.docMapList = []
            this.getList()
            if (res.success) {
              this.$Message.success("操作成功")
            }
          }
        })
      }
    },
    // 点击获取数据
    deviceInfo(v) {
      v.angle = this.angle
      v.pic = this.pic
      this.formRigth = v
    },
    // 返回
    close() {
      this.$emit("close", true)
    },
    move(e, item, index) {
      let odiv = e.target
      // 鼠标 元素 相对的位置 e.clientX
      let disX = e.clientX - odiv.offsetLeft
      let disY = e.clientY - odiv.offsetTop
      //======
      let hua = document.getElementById("huabu")
      let hChild = document.getElementsByClassName("huaChild")[index]
      // console.log(hChild.style.clientWidth)
      console.log(hChild.clientHeight, "132")

      let topPx = (hua.clientHeight / 100) * item.top
      let leftPx = (hua.clientWidth / 100) * item.left
      // console.log(topPx, "topPx")
      let angle = Math.abs(Math.cos((this.angle * Math.PI) / 180 || 0))
      document.onmousemove = e => {
        let left = e.clientX - disX
        let top = e.clientY - disY
        this.positionX = left
        this.positionY = top
        odiv.style.left = left + "px"
        odiv.style.top = top + "px"
      }
      document.onmouseup = e => {
        // 更改后的位置
        let offsetLeftPx = leftPx + odiv.offsetLeft
        let offsetTopPx = topPx + odiv.offsetTop
        // 负数
        offsetTopPx = offsetTopPx - hChild.clientHeight / 2
        offsetLeftPx = offsetLeftPx - hChild.clientWidth / 2

        console.log(hChild.clientWidth, "123987")
        let left = offsetLeftPx / (hua.clientWidth / 1000)
        let top = offsetTopPx / (hua.clientHeight / 1000)

        let upMapL = (left / (hua.clientWidth / 1000) / angle).toFixed(2)
        let upMapT = (top / (hua.clientHeight / 1000) / angle).toFixed(2)
        let id = this.docMapList[index].id
        let spaceProp = { "x": upMapL, "y": upMapT }
        if (offsetLeftPx >= 0 && offsetTopPx >= 0 && offsetLeftPx <= hua.clientWidth && offsetTopPx <= hua.clientHeight) {
          this.upDate(id, spaceProp)
        }
        document.onmousemove = null
        document.onmouseup = null
      }
    },
  },
}
</script>

<style lang="less">
@import "@/styles/table-common.less";
#docMap {
  background: #fff;
  .edit-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .huabu {
    min-width: 888px;
    height: 855px;
    position: relative;
    text-align: center;
    .ivu-poptip {
      span {
        font-size: 12px;
      }
      .glowA {
        box-shadow: 0 0 10px rgb(170, 140, 140);
        border: 1px solid rgb(75, 184, 75);
        background: #fff;
        border-radius: 18%;
      }
      .ivu-poptip-popper {
        > .ivu-poptip-content {
          .ivu-poptip-body-content-inner {
            text-align: center;
          }
        }
      }
    }
  }
  .formRigth {
    width: 100%;
    margin: 0 auto;
    margin-top: 10%;
  }
}
</style>
