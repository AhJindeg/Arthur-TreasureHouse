<template>
  <basic-container>
    <avue-crud
      ref="crud"
      :data="data"
      :option="option"
      :page.sync="page"
      @on-load="onLoad"
      @refresh-change="refreshChange"
      @row-save="rowSave"
      @row-update="rowUpdate"
      @row-del="rowDel"
    >
      <template slot-scope="scope" slot="menuLeft">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="small"
          @click.stop="rowShowAdd(scope)"
          >新增</el-button
        >
      </template>
      <template slot-scope="scope" slot="menu">
        <el-button
          v-if="!scope.row.showStatus"
          type="text"
          size="small"
          icon="el-icon-view"
          @click.stop="rowShowUpdata(scope.row)"
          >编辑</el-button
        >
        <el-button
          type="text"
          size="small"
          icon="el-icon-delete"
          @click.stop="rowDelA(scope.row)"
          >删除</el-button
        >
      </template>
    </avue-crud>
    <!-- 弹出层 -->
    <el-dialog
      :title="titleDialog"
      :visible.sync="showDialog"
      width="810px"
      append-to-body="true"
      @close="dialogCancel"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="会议主题" prop="theme">
          <el-input v-model="ruleForm.theme"></el-input>
        </el-form-item>
        <el-form-item label="会议室名称" prop="room">
          <el-select
            v-model="ruleForm.room"
            filterable
            placeholder="请输入或选择会议室"
            @change="roomNameChange"
          >
            <el-option
              v-for="item in meetingRoomGetAll"
              :key="item.id"
              :label="item.floor + ' - ' + item.roomName"
              :value="item.floor + ' - ' + item.roomName"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="会议人数" prop="capacity">
          <el-input-number
            v-model="ruleForm.capacity"
            :min="1"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="预约时段" required="true">
          <el-checkbox-group v-model="checkboxGroup">
            <el-checkbox-button
              v-for="city in cities"
              :label="city.value"
              :key="city.id"
              :disabled="city.show"
              >{{ city.value }}</el-checkbox-button
            >
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogCancel()">取 消</el-button>
        <el-button type="primary" @click="ruleFormSave()">确 定</el-button>
      </span>
    </el-dialog>
  </basic-container>
</template>

<script>
import {
  reserveGetList,
  reserveDel,
  reservGetTime,
  reserveUpData,
  meetingRoomGetListAll,
} from "@/api/assets/reserve";
export default {
  data() {
    return {
      // 是否是连续的时间段
      wode: true,
      // 所有的会议室数据
      meetingRoomGetAll: [],
      // 区别类型
      ruleFormType: "A",
      // 编辑初始id
      editRoomId: "",
      // 表单数据
      ruleForm: {
        theme: "",
        capacity: 1,
        roomName: "",
        roomId: "",
        startTime: "",
        endTime: "",
        room: "",
        meetingTime: "",
      },
      // 表单验证
      rules: {
        theme: [
          { required: true, message: "请输入会议主题!", trigger: "blur" },
        ],
        room: [{ required: true, message: "请选择会议室!", trigger: "change" }],
        capacity: [
          { required: true, message: "请选择会议人数!", trigger: "blur" },
        ],
      },
      // 选中的时间数据
      checkboxGroup: [],
      // 时间分段
      cities: [
        {
          id: "0",
          value: "08：30 - 09：00",
          show: 1,
          startTime: "08:30:00",
          endTime: "09:00:00",
        },
        {
          id: "1",
          value: "09：00 - 09：30",
          show: 1,
          startTime: "09:00:00",
          endTime: "09:30:00",
        },
        {
          id: "2",
          value: "09：30 - 10：00",
          show: 1,
          startTime: "09:30:00",
          endTime: "10:00:00",
        },
        {
          id: "3",
          value: "10：00 - 10：30",
          show: 1,
          startTime: "10:00:00",
          endTime: "10:30:00",
        },
        {
          id: "4",
          value: "10：30 - 11：00",
          show: 1,
          startTime: "10:30:00",
          endTime: "11:00:00",
        },
        {
          id: "5",
          value: "11：00 - 11：30",
          show: 1,
          startTime: "11:00:00",
          endTime: "11:30:00",
        },
        {
          id: "6",
          value: "11：30 - 12：00",
          show: 1,
          startTime: "11:30:00",
          endTime: "12:00:00",
        },
        {
          id: "7",
          value: "12：00 - 12：30",
          show: 1,
          startTime: "12:00:00",
          endTime: "12:30:00",
        },
        {
          id: "8",
          value: "12：30 - 13：00",
          show: 1,
          startTime: "12:30:00",
          endTime: "13:00:00",
        },
        {
          id: "9",
          value: "13：00 - 13：30",
          show: 1,
          startTime: "13:00:00",
          endTime: "13:30:00",
        },
        {
          id: "10",
          value: "13：30 - 14：00",
          show: 1,
          startTime: "13:30:00",
          endTime: "14:00:00",
        },
        {
          id: "11",
          value: "14：00 - 14：30",
          show: 1,
          startTime: "14:00:00",
          endTime: "14:30:00",
        },
        {
          id: "12",
          value: "14：30 - 15：00",
          show: 1,
          startTime: "14:30:00",
          endTime: "15:00:00",
        },
        {
          id: "13",
          value: "15：00 - 15：30",
          show: 1,
          startTime: "15:00:00",
          endTime: "15:30:00",
        },
        {
          id: "14",
          value: "15：30 - 16：00",
          show: 1,
          startTime: "15:30:00",
          endTime: "16:00:00",
        },
        {
          id: "15",
          value: "16：00 - 16：30",
          show: 1,
          startTime: "16:00:00",
          endTime: "16:30:00",
        },
        {
          id: "16",
          value: "16：30 - 17：00",
          show: 1,
          startTime: "16:30:00",
          endTime: "17:00:00",
        },
        {
          id: "17",
          value: "17：00 - 17：30",
          show: 1,
          startTime: "17:00:00",
          endTime: "17:30:00",
        },
      ],
      // 弹出层
      titleDialog: "",
      // 弹出层显示隐藏
      showDialog: false,
      // 分页配置
      page: {
        total: 0,
        pageSize: 10,
        currentPage: 1,
      },
      // 表格数据
      data: [],
      // 配置项
      option: {
        // 新增按钮
        addBtn: false,
        // 编辑按钮
        editBtn: false,
        // 删除按钮
        delBtn: false,
        labelWidth: 120,
        column: [
          {
            label: "会议主题",
            prop: "theme",
          },
          {
            label: "会议室名称",
            prop: "roomName",
          },
          {
            label: "开始时间",
            prop: "startTime",
          },
          {
            label: "结束时间",
            prop: "endTime",
          },
          {
            label: "预约日期",
            prop: "date",
          },
          {
            label: "会议人数",
            prop: "capacity",
          },
        ],
      },
    };
  },
  methods: {
    /**
     * 编辑或新增保存
     * @author Wangbp
     **/
    ruleFormSave() {
      // 验证
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          // 验证是否选择了时间段
          if (this.checkboxGroup.length < 1) {
            this.$message.success("请选择会议时间段！");
            return;
          }
          // 新增，删除id
          if (this.ruleFormType == "A") delete this.ruleForm.id;
          // 清除时间段
          this.ruleForm.meetingTime = "";
          // 初始时间段
          let meetingTime = [];
          // 将选择对应的id push进时间段
          this.checkboxGroup.forEach((el) => {
            this.cities.forEach((ele) => {
              if (el == ele.value) {
                meetingTime.push(ele.id);
              }
            });
          });
          meetingTime = meetingTime.sort(function (a, b) {
            return a - b;
          });
          let meetingTimeA = JSON.parse(JSON.stringify(meetingTime));
          this.ruleForm.meetingTime = meetingTimeA.toString();
          let meetingTimeB = JSON.parse(JSON.stringify(meetingTime));
          meetingTimeB = meetingTimeB.reverse();
          // 根据数组的第一个下标去找对应的开始时间
          this.ruleForm.startTime = this.cities[meetingTime[0]].startTime;
          // 根据倒序的数组第一个值取找到对应的结束时间
          this.ruleForm.endTime = this.cities[meetingTimeB[0]].endTime;
          // 判断选择的是否是连续时间段
          // meetingTime;
          let meetingTimeC = JSON.parse(JSON.stringify(meetingTime));
          this.wode = false;
          if (meetingTimeC.length > 1) {
            meetingTimeC.forEach((el, index) => {
              let AC = meetingTimeC[index + 1] - meetingTimeC[index];
              if (AC > 1) {
                this.wode = true;
                this.$message.success("请选择连续的会议时间段！");
              }
            });
          }
          if (this.wode) return;
          reserveUpData(this.ruleForm).then((res) => {
            if (res.data.success) {
              this.getListAll();
              this.checkboxGroup = [];
              // 清空表单
              if (this.$refs.ruleForm) {
                this.$refs.ruleForm.resetFields();
              }
              this.cities.forEach((el) => {
                el.show = 0;
              });
              this.showDialog = false;
              this.$message.success("操作成功！");
            }
          });
        }
      });
    },
    /**
     * 取消选择
     * @author Wangbp
     * @return<Boolean> this.showDialog(关闭弹窗)
     **/
    dialogCancel() {
      this.getListAll();
      this.showDialog = false;
    },
    /**
     * 会议室发生变化
     * @author Wangbp
     * @param<Array> this.meetingRoomGetAll(会议室数据)
     * @variable<String> room(拼接对比room)
     * @return<String> this.ruleForm.roomName(会议室名)
     * @return<String> this.ruleForm.roomId(会议室id)
     **/
    roomNameChange() {
      this.meetingRoomGetAll.forEach((el) => {
        let room = el.floor + " - " + el.roomName;
        if (room == this.ruleForm.room) {
          this.ruleForm.roomName = el.roomName;
          this.ruleForm.roomId = el.id;
          this.checkboxGroup = [];
          reservGetTime(el.id).then((res) => {
            if (res.data.success) {
              this.cities.forEach((ele, index) => {
                ele.show = res.data.data[index];
              });
              if (el.id == this.editRoomId) {
                let meetingTime = this.ruleForm.meetingTime;
                meetingTime = meetingTime.split(",");
                meetingTime.forEach((elel) => {
                  this.cities[elel].show = 0;
                  this.checkboxGroup.push(this.cities[elel].value);
                });
              }
            }
          });
        }
      });
    },
    /**
     * 会议室预约占用情况
     * @author Wangbp
     * @param<Object> id(单条数据的id值)
     * @return<Number(Boolean)> this.cities.show(是否占用)
     **/
    reserve(id) {
      this.checkboxGroup = [];
      reservGetTime(id).then((res) => {
        if (res.data.success) {
          this.cities.forEach((el, index) => {
            el.show = res.data.data[index];
          });
        }
      });
    },
    /**
     * 新增弹窗
     * @author Wangbp
     * @param<Object> row(单条数据对象)
     * @return<String> this.titleDialog(标题)
     * @return<Boolean> this.showDialog(显隐)
     * @return<Object> this.ruleForm(表单数据)
     **/
    rowShowAdd() {
      this.titleDialog = "新增预约信息";
      this.ruleFormType = "A";
      this.showDialog = true;
      this.ruleForm = {
        theme: "",
        capacity: 1,
        roomName: "",
        roomId: "",
        startTime: "",
        endTime: "",
        room: "",
        meetingTime: "",
      };
      this.checkboxGroup = [];
      this.cities.forEach((el) => {
        el.show = 0;
      });
      // 清空表单
      if (this.$refs.ruleForm) {
        this.$refs.ruleForm.resetFields();
      }
    },
    /**
     * 编辑弹窗
     * @author Wangbp
     * @param<Object> row(单条数据对象)
     * @return<String> this.titleDialog(标题)
     * @return<Boolean> this.showDialog(显隐)
     * @return<Object> this.form(表单数据)
     * @return<Number(Boolean)> this.cities.show(是否占用)
     * @return<Array> this.checkboxGroup(选择的时间段)
     **/
    rowShowUpdata(row) {
      // 清空表单
      if (this.$refs.ruleForm) {
        this.$refs.ruleForm.resetFields();
      }
      this.titleDialog = "编辑预约信息";
      this.ruleFormType = "B";
      this.showDialog = true;
      this.editRoomId = row.roomId;
      this.ruleForm = row;
      this.checkboxGroup = [];
      reservGetTime(row.roomId).then((res) => {
        if (res.data.success) {
          this.cities.forEach((el, index) => {
            el.show = res.data.data[index];
          });
          let meetingTime = row.meetingTime;
          meetingTime = meetingTime.split(",");
          meetingTime.forEach((el) => {
            this.cities[el].show = 0;
            this.checkboxGroup.push(this.cities[el].value);
          });
        }
      });
    },
    /**
     * 获取会议室预约数据
     * @author Wangbp
     * @param<Object> page(请求参数)
     * @return<Array> this.data(表格数据)
     * @return<Object> this.page.total(分页数据)
     **/
    getListAll() {
      let page = {
        total: this.page.total,
        size: this.page.pageSize,
        current: this.page.currentPage,
      };
      reserveGetList(page).then((res) => {
        if (res.data.success) {
          res.data.data.records.forEach((el) => {
            el.room = el.floor + " - " + el.roomName;
          });
          this.data = res.data.data.records;
          this.page.total = res.data.data.total;
        }
      });
    },
    /**
     * 刷新数据
     * @author Wangbp
     * @return<Object> this.page(初始化赋值)
     * @return<Array> this.data(清空)
     * @description 清除数据 重新请求数据
     **/
    refreshChange() {
      this.getListAll();
      this.$message.success("刷新成功！");
    },
    /**
     * 删除会议室预约数据
     * @author Wangbp
     * @param<Object> from(删除的对象值)
     **/
    rowDelA(form) {
      this.$confirm("此操作将永久删除该预约信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        reserveDel(form.id).then((res) => {
          if (res.data.success) {
            this.getListAll();
            this.$message.success("删除成功！");
          }
        });
      });
    },
    /**
     * 分页查询
     * @author Wangbp
     * @param<Object> page(改变分页的字段)
     **/
    onLoad(page) {
      this.page = page;
      this.getListAll();
    },
    /**
     * 获取会议室数据
     * @author Wangbp
     * @return<Array> this.meetingRoomGetAll(所有会议室数据)
     **/
    getListAllRoom() {
      meetingRoomGetListAll().then((res) => {
        if (res.data.success) this.meetingRoomGetAll = res.data.data;
      });
    },
    /**
     * 初始化加载数据
     * @author Wangbp
     * @description 调用需要初始加载的方法获取数据
     **/
    init() {
      this.getListAll();
      this.getListAllRoom();
    },
  },
  /**
   * 调用初始化方法
   * @author Wangbp
   * @description 调用init内的方法进行初始化加载数据
   **/
  mounted() {
    this.init();
  },
};
</script>
<style lang="less" scoped>
/deep/ .avue-crud__pagination > .el-pagination {
  left: 0;
}
/deep/ .avue-crud .el-table th {
  color: #909399;
}
/deep/ .el-form-item__content > .el-checkbox-group {
  .el-checkbox-button {
    margin: 3px;
    width: 145px;
    .el-checkbox-button__inner {
      border: 1px solid #dcdfe6;
      border-radius: 4px;
    }
  }
}
</style>
