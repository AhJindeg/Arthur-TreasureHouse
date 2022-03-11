<template>
  <div id="docMap">
    <Card ref="card">
      <div slot="title">
        <div class="edit-head">
          <a @click="close" class="back-title"> <Icon type="ios-arrow-back" />返回</a>
          <div class="head-name">设备地图</div>
          <a @click="close" class="window-close">
            <Icon type="ios-close" size="31" class="ivu-icon-ios-close" />
          </a>
        </div>
      </div>
      <!-- 地图 -->
      <div style="display: flex; overflow-y: hidden">
        <Row>
          <Col span="18">
            <!-- 地图父容器 -->
            <div class="roller">
              <!-- 地图 -->
              <!-- <div class="huabu" id="huabu" :style="`background: red;background-size: 100%;`"> -->
              <div class="huabu" id="huabu" :style="`background: url(${pic}) no-repeat;background-size: 100%;`">
                <!-- 设备 -->
                <div
                  class="huaChild"
                  v-for="(item, index) in docMapList"
                  :key="index"
                  :style="`position: absolute;top: ${item.top}px; left: ${item.left}px;cursor:pointer;`"
                  @mousedown.stop="move($event, item, index)"
                  @click="deviceInfo(item)"
                >
                  <!-- 图标 -->
                  <Poptip trigger="hover" width="80" :content="`${item.name}`" word-wrap>
                    <Icon
                      :custom="item.deviceIcon"
                      size="26"
                      :class="item.id == equipmentUid ? 'glowA' : 'glowB'"
                      style="position: relative"
                    >
                    </Icon>
                  </Poptip>
                </div>
              </div>
            </div>
          </Col>
          <Col span="6" class="formRigth">
            <!-- <div class="formRigth"> -->
            <!-- 属性表单 -->
            <h2 style="text-align: center; margin-bottom: 20px">设备地图信息</h2>
            <Form style="width: 500px" :model="formRigth" label-position="rigth" :label-width="90" label-colon="：">
              <FormItem label="设备名称">
                <Input v-model="formRigth.name" readonly></Input>
              </FormItem>
              <FormItem label="设备状态">
                <Input v-model="formRigth.title" readonly></Input>
              </FormItem>
              <FormItem label="关联空间">
                <Input v-model="formRigth.spaceIdd" readonly></Input>
              </FormItem>
              <FormItem label="空间属性">
                <Input v-model="formRigth.spacePropp"></Input>
              </FormItem>
              <FormItem label="地图角度">
                <InputNumber :max="90" :min="0" v-model="angle"></InputNumber>
              </FormItem>
              <FormItem label="空间图片">
                <Input v-model="pic" type="textarea" readonly></Input>
              </FormItem>
              <FormItem>
                <Button type="primary" @click="upDate(formRigth.id, formRigth.spacePropp)">保存修改</Button>
              </FormItem>
            </Form>
            <!-- </div> -->
          </Col>
        </Row>
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
      // 初始数据
      docMapList: [],
      // 角度
      angle: 0,
      // 鼠标放大
      mouseSize: 1,
      initialPosition: ["0,0", "0,1000", "1000,0", "1000,1000"],
      // 空间分组
      spaceList: [],
      // 转换空间树形结构的值
      treeSpace: [],
    }
  },
  mounted() {
    // 初始加载
    this.getList()
    // 设备表初始信息
    setTimeout(() => {
      if (typeof this.equipmentUid !== "undefined") {
        this.docMapList.forEach((data, index) => {
          if (data.id == this.equipmentUid) {
            this.formRigth = this.docMapList[index]
          }
        })
      }
    }, 233)
    // 缩放 拖拽地图
    let huabu = document.getElementById("huabu")
    this.mouseEvent(huabu)
  },
  watch: {
    // 角度改变 调用定位
    angle(newValue, oldValue) {
      this.docMapObtain()
    },
  },
  methods: {
    // 拖拽 缩放 方法
    mouseEvent(target) {
      // 参数是否为html
      let isElement = obj => {
        return typeof HTMLElement === "object"
          ? obj instanceof HTMLElement
          : !!(
              obj &&
              typeof obj === "object" &&
              (obj.nodeType === 1 || obj.nodeType === 9) &&
              typeof obj.nodeName === "string"
            )
      }
      // 拖拽缩放的元素
      let drawEl = target
      // 参数不是HTML 查找目标元素
      if (!isElement(target)) {
        drawEl = document.querySelector(target)
      }
      // 父元素容器
      const parent = drawEl.parentElement
      // 父元素大小及相对视口位置
      const parentRect = parent.getBoundingClientRect()
      // 鼠标相对目标缩放点距离
      let diffX = 0,
        diffY = 0
      // 是否正在拖拽
      let isDrawing = false
      // 鼠标当前相对父容器的坐标
      let mouseX = 0,
        mouseY = 0
      // 偏移坐标，缩放比例
      let translateX = 0,
        translateY = 0
      // 初始缩放比例
      let scale = 1
      // 缩放比例
      const diff = 0.08
      // 判断滚轮方向 向上缩小 向下放大
      let isUpward = false
      // 鼠标移入移出
      let mouseEnterOrLeave = false
      // 刷新鼠标距离目标元素缩放点的距离
      let refreshMousePositionDiffValue = () => {
        diffX = mouseX - translateX
        // console.log(diffX, "diffX")
        diffY = mouseY - translateY
      }
      // 更新样式
      let refreshTargetStyle = () => {
        drawEl.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`
        parent.style.cursor = isDrawing ? "move" : "default"
      }

      // 鼠标移动事件
      parent.addEventListener("mousemove", e => {
        mouseX = e.x - parentRect.left
        mouseY = e.y - parentRect.top

        if (isDrawing) {
          translateX = mouseX - diffX
          translateY = mouseY - diffY

          refreshTargetStyle()
        }
      })

      // 鼠标移出事件
      parent.addEventListener("mouseout", e => {
        mouseEnterOrLeave = true
      })
      // 鼠标移入事件
      parent.addEventListener("mouseover", e => {
        mouseEnterOrLeave = false
      })

      // 鼠标按下事件
      parent.addEventListener("mousedown", () => {
        refreshMousePositionDiffValue()
        isDrawing = true
        refreshTargetStyle()
      })

      // 鼠标抬起事件
      window.addEventListener("mouseup", () => {
        isDrawing = false
        refreshTargetStyle()
      })

      // 鼠标滚动事件
      let mouseZoom = e => {
        // 阻止默认事件 滚动条
        e.preventDefault()
        // 阻止冒泡
        e.stopPropagation()

        if (!mouseEnterOrLeave) {
          e = e || window.event

          if (e.wheelDelta) {
            isUpward = e.wheelDelta > 0
          } else if (e.detail) {
            isUpward = e.detail < 0
          }

          let oldWidth = scale * drawEl.clientWidth
          let oldHeight = scale * drawEl.clientHeight

          if (isUpward) {
            if (scale < 5) {
              scale += diff
            }
          } else if (!isUpward && scale > 0.05) {
            if (!(scale < 1)) {
              scale -= diff
            }
          }

          // 将当前的鼠标值传到外层
          this.mouseSize = scale
          // console.log(scale, "13456")

          let newWidth = scale * drawEl.clientWidth
          let newHeight = scale * drawEl.clientHeight

          // 刷新鼠标距离目标元素缩放点坐标
          refreshMousePositionDiffValue()

          // 重新计算缩放偏移量
          translateX -= (newWidth - oldWidth) * (diffX / oldWidth)
          // console.log(translateX, "translateX")
          translateY -= (newHeight - oldHeight) * (diffY / oldHeight)

          refreshTargetStyle()
        }
      }

      // 鼠标滚轮兼容
      /*IE、Opera注册事件*/
      if (document.attachEvent) {
        parent.attachEvent("onmousewheel", mouseZoom)
      }
      //Firefox使用addEventListener添加滚轮事件
      if (document.addEventListener) {
        parent.addEventListener("DOMMouseScroll", mouseZoom, false)
      }
      // Safari与Chrome属于同一类型
      parent.onmousewheel = mouseZoom

      // 页面初始化
      // 判断缩放元素的高度是否高于容器高度 大于容器高度缩放容器高度
      if (drawEl.clientHeight > parent.clientHeight) {
        scale = 1 - (drawEl.clientHeight - parent.clientHeight) / drawEl.clientHeight
      }

      // 让目标元素居中显示
      translateX = (parent.clientWidth - scale * drawEl.clientWidth) / 2
      translateY = (parent.clientHeight - scale * drawEl.clientHeight) / 2

      //设置初始样式
      drawEl.style.transformOrigin = "0 0"

      // 当目标元素 是img时，需要禁用元素鼠标可拖拽
      // div user-drag 默认是none 可以不设置
      drawEl.style.userDrag = "none"
      drawEl.style.webkitUserDrag = "none"

      //禁用选则，防止拖拽时出现先择元素内部元素的情况
      drawEl.style.userSelect = "none"

      refreshTargetStyle()
    },
    // 空间树形结构拼接
    getTree(params = [], result = [], key = "", id = "") {
      if (Array.isArray(params) && params.length) {
        params.forEach(item => {
          let cur = key
          let cid = id
          cur += item.label + "/"
          cid += item.value + "/"
          if (item.isParent) {
            this.getTree(item.children, result, cur, cid)
          } else {
            result.push({
              [cur]: item.value,
              ids: cid.substring(0, cid.length - 1),
            })
          }
        })
        // 添加空间地址
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
    // 计算定位
    docMapObtain() {
      const leftTop1 = parseFloat(this.initialPosition[0].split(",")[0])
      const rightTop1 = parseFloat(this.initialPosition[1].split(",")[1])
      const leftTop2 = parseFloat(this.initialPosition[0].split(",")[1])
      const leftbottom1 = parseFloat(this.initialPosition[3].split(",")[0])
      let leftHeight = Math.abs(leftTop1 - leftbottom1)
      let topWidth = Math.abs(leftTop2 - rightTop1)
      let hua = document.getElementById("huabu")
      // 计算
      this.docMapList.forEach((item, index) => {
        let y = Math.abs(item.spaceProp.y - leftTop1) * (hua.clientHeight / leftHeight)
        let x = Math.abs(item.spaceProp.x - leftTop2) * (hua.clientWidth / topWidth)
        let xleft = (x * Math.abs(Math.cos((this.angle * Math.PI) / 180 || 0))).toFixed(2)
        let ytop = (y * Math.abs(Math.cos((this.angle * Math.PI) / 180 || 0))).toFixed(2)
        // 位置
        this.docMapList[index].left = xleft
        this.docMapList[index].top = ytop
        this.docMapList[index].spacePropp = JSON.stringify(item.spaceProp)
      })
    },
    // 请求数据 整合存储在docMapList
    getList() {
      getEquipmentList(this.uid).then(res => {
        if (res.success) {
          // console.log(res)
          res.result.forEach(item => {
            if (item.spaceProp !== "" && item.deviceIcon !== "" && item.name !== "" && item.id !== "") {
              item.spaceProp = JSON.parse(item.spaceProp)
              this.docMapList.push(item)
            }
          })
          getDictDataByType("device_status").then(res => {
            if (res.success) {
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
            if (res.success) {
              this.spaceList = res.result
              this.getTree(this.spaceList, this.treeSpace)
            }
          })
          // 调用定位方法
          this.docMapObtain()
        }
      })
    },
    // 更新定位空间
    upDate(id, spaceProp) {
      let params = { "id": id, "spaceProp": spaceProp }
      if (id !== "" && spaceProp !== "") {
        updateSelect(params).then(res => {
          if (res.success) {
            // 更新
            setTimeout(() => {
              this.docMapList = []
              this.getList()
            }, 121)
            if (res.success) {
              this.$Message.success("操作成功")
            }
          }
        })
      }
    },
    // 点击获取数据
    deviceInfo(v) {
      this.formRigth = v
    },
    // 返回
    close() {
      this.$emit("close", true)
    },
    // 拖拽改变定位
    move(e, item, index) {
      let odiv = e.target
      // 鼠标 元素 相对的位置 e.clientX
      let disX = e.clientX - odiv.offsetLeft
      let disY = e.clientY - odiv.offsetTop
      let hua = document.getElementById("huabu")
      // 禁止选中
      document.onselectstart = function () {
        return false
      }
      document.onmousemove = e => {
        // odiv.style.cursor = "12"
        // console.log(odiv.style.cursor)
        let left = (e.clientX - disX) / this.mouseSize
        let top = (e.clientY - disY) / this.mouseSize
        // console.log(e.clientX, disX)
        // console.log(left, top)
        this.positionX = left
        this.positionY = top
        odiv.style.left = left + "px"
        odiv.style.top = top + "px"
      }
      document.onmouseup = e => {
        let left = item.left * 1 + odiv.offsetLeft * 1
        let top = item.top * 1 + odiv.offsetTop * 1

        let upMapL = (left / (hua.clientWidth / 1000) / Math.abs(Math.cos((this.angle * Math.PI) / 180 || 0))).toFixed(2)
        let upMapT = (top / (hua.clientHeight / 1000) / Math.abs(Math.cos((this.angle * Math.PI) / 180 || 0))).toFixed(2)

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
  .roller {
    overflow: hidden;
    width: 1000px;
    min-width: 855px;
    height: 855px;
    .huabu {
      width: 100%;
      height: 100%;
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
  }
  .formRigth {
    width: 100%;
    min-width: 150px;
    margin-top: 10%;
  }
}
</style>
