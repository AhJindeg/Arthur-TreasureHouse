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
          id="huabu"
          :style="`
          background: url(${this.pic}) no-repeat;
          background-size: 100%;`"
        >
          <div
            class="huaChild"
            v-for="(item, index) in docMapList"
            :key="index"
            :style="`position: absolute;top: ${item.top}px; left: ${item.left}px;cursor:pointer;`"
            @mousedown="move($event, item, index)"
            @click="deviceInfo(item)"
          >
            <!-- 图标 -->
            <Poptip trigger="hover" width="80" :content="`${item.name}`" word-wrap>
              <Icon :custom="item.deviceIcon" size="26" :class="item.id == equipmentUid ? 'glowA' : 'glowB'" style="position: relative">
              </Icon>
            </Poptip>
          </div>
        </div>
        <div class="formRigth">
          <!-- 属性表单 -->
          <Form :model="formRigth" label-position="rigth" :label-width="80">
            <FormItem label="设备名称">
              <Input v-model="formRigth.name" readonly="true"></Input>
            </FormItem>
            <FormItem label="设备状态">
              <Input v-model="formRigth.title" readonly="true"></Input>
            </FormItem>
            <FormItem label="关联空间">
              <Input v-model="formRigth.spaceIdd" readonly="true"></Input>
            </FormItem>
            <FormItem label="空间属性">
              <Input v-model="formRigth.spacePropp"></Input>
            </FormItem>
            <FormItem label="地图角度">
              <Input v-model="formRigth.angle" readonly="true"></Input>
            </FormItem>
            <FormItem label="空间图片">
              <Input v-model="formRigth.pic" readonly="true"></Input>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="upDate(formRigth.id, formRigth.spacePropp)">保存修改</Button>
            </FormItem>
          </Form>
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
import { getEquipmentList, updateSelect, deviceSpaceGetTree, getDictDataByType } from "@/api/biz"
export default {
  name: "docMapArr",
  props: ["uid", "equipmentUid", "pic"],
  data() {
    return {
      // 表单数据
      formRigth: {},
      // 数据
      docMapList: [],
      // 角度
      angle: 0,
      // 初始位置
      initialPosition: ["0,0", "0,1000", "1000,0", "1000,1000"],
      // 空间分组
      spaceList: [],
      // 转换空间树形结构的值
      treeSpace: [],
    }
  },
  mounted() {
    this.getList()
    setTimeout(() => {
      if (typeof this.equipmentUid !== "undefined") {
        this.docMapList.forEach((data, index) => {
          if (data.id == this.equipmentUid) {
            let v = this.docMapList[index]
            v.angle = this.angle
            v.pic = this.pic
            this.formRigth = v
          }
        })
      }
    }, 233)
  },
  methods: {
    getTree(params = [], result = [], key = "", id = "") {
      if (Array.isArray(params) && params.length) {
        params.forEach(item => {
          let cur = key
          let cid = id
          cur += item.title + "/"
          cid += item.id + "/"
          if (item.isParent) {
            this.getTree(item.children, result, cur, cid)
          } else {
            result.push({
              [cur]: item.id,
              ids: cid.substring(0, cid.length - 1),
            })
          }
        })
        this.treeSpace.forEach(item => {
          this.docMapList.forEach((data, index) => {
            this.docMapList[index].ids = item.ids
            Object.keys(item).forEach(ele => {
              if (item[ele] == data.spaceId) {
                this.docMapList[index].spaceIdd = ele.substring(0, ele.length - 1)
              }
            })
          })
        })
      }
    },
    docMapObtain() {
      const leftTop1 = parseFloat(this.initialPosition[0].split(",")[0])
      const rightTop1 = parseFloat(this.initialPosition[1].split(",")[1])
      const leftTop2 = parseFloat(this.initialPosition[0].split(",")[1])
      const leftbottom1 = parseFloat(this.initialPosition[3].split(",")[0])
      let leftHeight = Math.abs(leftTop1 - leftbottom1)
      let topWidth = Math.abs(leftTop2 - rightTop1)
      let hua = document.getElementById("huabu")
      this.docMapList.forEach((item, index) => {
        let y = Math.abs(item.spaceProp.y - leftTop1) * (hua.clientHeight / leftHeight)
        let x = Math.abs(item.spaceProp.x - leftTop2) * (hua.clientWidth / topWidth)
        let angle = Math.abs(Math.cos((this.angle * Math.PI) / 180 || 0))
        let xleft = (x * angle).toFixed(2)
        let ytop = (y * angle).toFixed(2)
        this.docMapList[index].left = xleft
        this.docMapList[index].top = ytop
        this.docMapList[index].spacePropp = JSON.stringify(item.spaceProp)
      })
    },
    getList() {
      getEquipmentList(this.uid).then(res => {
        if (res.code === 200) {
          res.result.forEach(item => {
            if (item.spaceProp !== "" && item.deviceIcon !== "" && item.name !== "" && item.id !== "") {
              item.spaceProp = JSON.parse(item.spaceProp)
              this.docMapList.push(item)
            }
          })
          getDictDataByType("device_status").then(res => {
            if (res.code == 200) {
              res.result.forEach(item => {
                this.docMapList.forEach((data, index) => {
                  if (String(data.delFlag) == String(item.value)) {
                    this.docMapList[index].title = item.title
                  }
                })
              })
            }
          })
          deviceSpaceGetTree().then(res => {
            if (res.code === 200) {
              this.spaceList = res.result
              this.getTree(this.spaceList, this.treeSpace)
            }
          })
          // 调用定位方法
          this.docMapObtain()
        }
      })
    },
    upDate(id, spaceProp) {
      let params = { "id": id, "spaceProp": spaceProp }
      if (id !== "" && spaceProp !== "") {
        updateSelect(params).then(res => {
          if (res.code === 200) {
            setTimeout(() => {
              this.docMapList = []
              this.getList()
            }, 233)
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
      let hua = document.getElementById("huabu")
      // 选中蓝字
      document.onselectstart = function () {
        return false
      }
      document.onmousemove = e => {
        let left = e.clientX - disX
        let top = e.clientY - disY
        this.positionX = left
        this.positionY = top
        odiv.style.left = left + "px"
        odiv.style.top = top + "px"
      }
      document.onmouseup = e => {
        let left = item.left * 1 + odiv.offsetLeft * 1
        let top = item.top * 1 + odiv.offsetTop * 1

        let angle = Math.abs(Math.cos((this.angle * Math.PI) / 180 || 0))
        let upMapL = (left / (hua.clientWidth / 1000) / angle).toFixed(2)
        let upMapT = (top / (hua.clientHeight / 1000) / angle).toFixed(2)

        let id = this.docMapList[index].id
        let spaceProp = { "x": upMapL, "y": upMapT }
        if (odiv.offsetTop != 0 && odiv.offsetLeft != 0) {
          if (left >= 0 && top >= 0 && left <= hua.clientWidth && top <= hua.clientHeight) {
            this.formRigth = {}
            spaceProp = JSON.stringify(spaceProp)
            this.upDate(id, spaceProp)
          } else {
            this.docMapList = []
            this.getList()
          }
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
    min-width: 855px;
    height: 855px;
    position: relative;
    text-align: center;
    .ivu-poptip {
      .ivu-poptip-rel {
        width: 26px;
        height: 26px;
      }
      span {
        font-size: 12px;
      }
      .glowA,
      .glowB {
        box-shadow: 0 0 10px rgb(133, 127, 127);
        background: opacity;
        border-radius: 18%;
      }
      .glowA {
        border: 2px solid rgb(75, 184, 75);
      }
      .glowB {
        border: 1px solid rgb(184, 184, 184);
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
