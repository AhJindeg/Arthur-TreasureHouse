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
      <div style="width: 100%; height: 700px; display: flex">
        <div
          id="mainaaa"
          :style="`width: 80%; heigth: 100%;background: url('${this.pic}') no-repeat center !important;background-size: 100% 100% !important;`"
        ></div>
        <div style="width: 20%">
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
              <Input v-model="formRigth.spaceProp"></Input>
            </FormItem>
            <FormItem label="地图角度">
              <Input v-model="formRigth.angle"></Input>
            </FormItem>
            <FormItem label="空间图片">
              <Input v-model="formRigth.pic"></Input>
            </FormItem>
          </Form>
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
import { getEquipmentList } from "@/api/biz"
import * as echarts from "echarts"
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
      mapData: [],
      // 角度
      angle: 30,
      // 地图初始位置
      initialPosition: ["0,0", "0,1000", "1000,0", "1000,1000"],
    }
  },
  mounted() {
    // 获取初始列表
    getEquipmentList(this.uid).then(res => {
      if (res.code === 200) {
        res.result.forEach(item => {
          if (item.spaceProp !== " " && item.deviceIcon !== " " && item.name !== " " && item.id !== " ") {
            item.spaceProp = JSON.parse(item.spaceProp)
            this.docMapList.push(item)
          }
        })
        this.docMapObtain()
        this.echMap()
      }
    })
  },
  methods: {
    close() {
      this.$emit("close", true)
    },
    echMap() {
      var chartDom = document.getElementById("mainaaa")
      var myChart = echarts.init(chartDom)
      var option

      const symbolSize = 20
      const data = this.mapData
      const docMapList = this.docMapList

      option = {
        tooltip: {
          triggerOn: "none",
          formatter: function (params) {
            params.Map = docMapList[params.dataIndex]
            // console.log(params, "par")
            // params.data[0].toFixed(2)
            // params.data[1].toFixed(2)
            return params.Map.name
          },
        },

        grid: {
          top: "-1px",
          bottom: "-1px",
          left: "-1px",
          right: "-1px",
          show: "true",
        },
        xAxis: {
          min: 0,
          max: 1000,
          type: "value",
          splitLine: {
            show: false,
          },
        },
        yAxis: {
          min: 0,
          max: 1000,
          type: "value",
          splitLine: {
            show: false,
          },
        },
        dataZoom: [
          {
            type: "inside",
            xAxisIndex: 0,
            filterMode: "none",
          },
          {
            type: "inside",
            yAxisIndex: 0,
            filterMode: "none",
          },
        ],
        series: [
          {
            id: "a",
            type: "scatter",
            smooth: true,
            symbolSize: symbolSize,
            data: data,
          },
        ],
      }
      setTimeout(function () {
        // Add shadow circles (which is not visible) to enable drag.
        myChart.setOption({
          graphic: data.map(function (item, dataIndex) {
            item.Map = docMapList[dataIndex]
            return {
              type: "circle",
              position: myChart.convertToPixel("grid", item),
              shape: {
                cx: 0,
                cy: 0,
                r: symbolSize / 2,
              },
              invisible: true,
              draggable: true,
              ondrag: function (dx, dy) {
                onPointDragging(dataIndex, [this.x, this.y])
              },
              onmousemove: function () {
                showTooltip(dataIndex)
              },
              onmouseout: function () {
                hideTooltip(dataIndex)
              },
              z: 100,
            }
          }),
        })
        console.log(data, "4544254")
      }, 0)

      window.addEventListener("resize", updatePosition)
      myChart.on("dataZoom", updatePosition)
      myChart.on("click", function (params) {
        console.log(params, "aprams")
        // myChart.setOption({
        //   graphic: data.map(function (item, dataIndex) {
        //     console.log(item, "8756")
        //     console.log(dataIndex, "1231111")
        //     // return {
        //     //   position: myChart.convertToPixel("grid", item),
        //     // }
        //   }),
        // })
      })
      // myChart.on("click", updatePosition)
      function updatePosition() {
        myChart.setOption({
          graphic: data.map(function (item, dataIndex) {
            // console.log(item, "8756")
            return {
              position: myChart.convertToPixel("grid", item),
            }
          }),
        })
      }
      // 悬浮显示
      function showTooltip(dataIndex) {
        myChart.dispatchAction({
          type: "showTip",
          seriesIndex: 0,
          dataIndex: dataIndex,
        })
      }
      function hideTooltip(dataIndex) {
        myChart.dispatchAction({
          type: "hideTip",
        })
      }
      // 拖拽
      function onPointDragging(dataIndex, pos) {
        data[dataIndex] = myChart.convertFromPixel("grid", pos)
        // Update data
        myChart.setOption({
          series: [
            {
              id: "a",
              data: data,
            },
          ],
        })
      }

      option && myChart.setOption(option)
    },
    // 定位方法
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
        let xleft = (x * angle * 1000).toFixed(2)
        let ytop = (y * angle * 1000).toFixed(2)
        if (xleft <= 1000 && ytop <= 1000) {
          // this.docMapList[index].dataEch = [xleft, ytop]
          this.mapData.push([xleft, ytop])
        }
        this.docMapList[index].spaceProp = JSON.stringify(item.spaceProp)
      })
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
}
</style>
