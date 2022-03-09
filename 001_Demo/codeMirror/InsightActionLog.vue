<template>
  <div class="search">
    <Card>
      <Row v-show="openSearch" @keydown.enter.native="handleSearch">
        <Form ref="searchForm" :model="searchForm" inline :label-width="80" label-colon=" :">
          <FormItem label="主键ID" prop="id">
            <Input type="text" v-model="searchForm.id" placeholder="请输入主键ID" clearable style="width: 200px" />
          </FormItem>
          <FormItem label="操作类型" prop="action">
            <Select v-model="searchForm.action" placeholder="请选择操作类型" clearable style="width: 200px">
              <Option v-for="item in actionTypeList" :key="item.id" :value="item.action">{{ item.action }}</Option>
            </Select>
          </FormItem>
          <FormItem label="成功标志" prop="stat">
            <!-- <Input type="text" v-model="searchForm.stat" placeholder="请输入成功标志" clearable style="width: 200px" /> -->
            <Select v-model="searchForm.stat" placeholder="请选择成功标志" clearable style="width: 200px">
              <Option value="0">失败</Option>
              <Option value="1">成功</Option>
            </Select>
          </FormItem>
          <FormItem style="margin-left: -55px" class="br">
            <Button @click="handleSearch" type="primary" icon="ios-search">搜索</Button>
            <Button @click="handleReset">重置</Button>
          </FormItem>
        </Form>
      </Row>
      <Row align="middle" justify="space-between" class="operation">
        <div>
          <!-- <Button @click="add" type="primary" icon="md-add">添加</Button> -->
          <Button @click="delAll" icon="md-trash">批量删除</Button>
        </div>
        <div class="icons">
          <Tooltip content="刷新" placement="top" transfer>
            <Icon type="md-refresh" size="18" class="item" @click="getDataList" />
          </Tooltip>
          <Tooltip :content="openSearch ? '关闭搜索' : '开启搜索'" placement="top" transfer>
            <Icon type="ios-search" size="18" class="item tip" @click="openSearch = !openSearch" />
          </Tooltip>
          <Tooltip :content="openTip ? '关闭提示' : '开启提示'" placement="top" transfer>
            <Icon type="md-bulb" size="18" class="item tip" @click="openTip = !openTip" />
          </Tooltip>
          <Tooltip content="表格密度" placement="top" transfer>
            <Dropdown @on-click="changeTableSize" trigger="click">
              <Icon type="md-list" size="18" class="item" />
              <DropdownMenu slot="list">
                <DropdownItem :selected="tableSize == 'default'" name="default">默认</DropdownItem>
                <DropdownItem :selected="tableSize == 'large'" name="large">宽松</DropdownItem>
                <DropdownItem :selected="tableSize == 'small'" name="small">紧密</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Tooltip>
          <Tooltip content="导出数据" placement="top" transfer>
            <Icon type="md-download" size="18" class="item" @click="exportData" />
          </Tooltip>
        </div>
      </Row>
      <Alert show-icon v-show="openTip">
        已选择 <span class="select-count">{{ selectList.length }}</span> 项
        <a class="select-clear" @click="clearSelectAll">清空</a>
      </Alert>
      <Table
        :loading="loading"
        border
        :columns="columns"
        :data="data"
        :size="tableSize"
        ref="table"
        sortable="custom"
        @on-sort-change="changeSort"
        @on-selection-change="changeSelect"
      ></Table>
      <Row type="flex" justify="end" class="page">
        <Page
          :current="searchForm.pageNumber"
          :total="total"
          :page-size="searchForm.pageSize"
          @on-change="changePage"
          @on-page-size-change="changePageSize"
          :page-size-opts="[10, 20, 50]"
          size="small"
          show-total
          show-elevator
          show-sizer
        ></Page>
      </Row>
      <Drawer title="当前计数器" closable="false" v-model="showInfo" width="60%" draggable mask-closable>
        <template v-if="typeof formDetail !== 'undefined' || formDetail !== ''">
          <div>
            <json-viewer :value="formDetail"></json-viewer>
          </div>
        </template>
      </Drawer>
    </Card>
    <Modal :title="modalTitle" v-model="modalVisible" :mask-closable="false" :width="800" footer-hide="true">
      <Form
        ref="form"
        :model="form"
        :rules="formValidate"
        :label-width="100"
        label-position="right"
        show-message="false"
        label-colon=" :"
        class="detail"
      >
        <FormItem label="主键ID" prop="id">
          <Input v-model="form.id" readonly />
        </FormItem>
        <FormItem label="操作类型" prop="action">
          <Input v-model="form.action" readonly />
        </FormItem>
        <FormItem label="成功标志" prop="stat">
          <Input v-model="form.statText" readonly />
        </FormItem>
        <FormItem label="处理耗时" prop="utime">
          <Input v-model="form.utime" readonly />
        </FormItem>
        <FormItem label="处理结果" prop="errmsg">
          <Input v-model="form.errmsg" type="textarea" :rows="3" readonly />
        </FormItem>
      </Form>
      <!-- <div slot="footer">
        <Button type="text" @click="modalVisible = false">取消</Button>
        <Button type="primary" :loading="submitLoading" @click="handleSubmit">提交</Button>
      </div> -->
    </Modal>
    <Modal title="故障信息" v-model="showFaultData" :mask-closable="false" :width="1111" footer-hide="true">
      <codemirror v-model="faultData" :options="cmOption" />
    </Modal>
  </div>
</template>

<script>
import dedent from "dedent"
import { codemirror } from "vue-codemirror"
// import base style
import "codemirror/lib/codemirror.css"
// language
import "codemirror/mode/python/python.js"
// import "codemirror/mode/javascript/javascript"
// theme css
// import "codemirror/theme/base16-light.css"
import "codemirror/theme/ambiance.css"
// require active-line.js
import "codemirror/addon/selection/active-line.js"
// closebrackets
import "codemirror/addon/edit/closebrackets.js"
// keyMap
import "codemirror/mode/clike/clike.js"
import "codemirror/addon/edit/matchbrackets.js"
import "codemirror/addon/comment/comment.js"
import "codemirror/addon/dialog/dialog.js"
import "codemirror/addon/dialog/dialog.css"
import "codemirror/addon/search/searchcursor.js"
import "codemirror/addon/search/search.js"
import "codemirror/keymap/emacs.js"

// 根据你的实际请求api.js位置路径修改
import {
  getInsightActionLogList,
  addInsightActionLog,
  editInsightActionLog,
  deleteInsightActionLog,
  getActionType,
} from "@/api/interface"
import { shortcuts } from "@/libs/shortcuts"
export default {
  name: "insightActionLog",
  components: {
    codemirror,
  },
  data() {
    return {
      cmOption: {
        autoCloseBrackets: true,
        tabSize: 4,
        styleActiveLine: true,
        lineNumbers: true,
        line: true,
        mode: "text/x-python",
        // mode: "text/javascript",
        theme: "ambiance",
        keyMap: "emacs",
      },
      // 显示故障信息
      showFaultData: false,
      // 故障信息
      faultData: "",
      // 操作类型
      actionTypeList: [],
      // 添加显示 info
      showInfo: false,
      // 详情数据
      formDetail: "",
      tableSize: "default",
      openSearch: true, // 显示搜索
      openTip: false, // 显示提示
      loading: true, // 表单加载状态
      modalType: 0, // 添加或编辑标识
      modalVisible: false, // 添加或编辑显示
      modalTitle: "", // 添加或编辑标题
      searchForm: {
        // 搜索框初始化对象
        pageNumber: 1, // 当前页数
        pageSize: 10, // 页面大小
        sort: "createTime", // 默认排序字段
        order: "desc", // 默认排序方式
      },
      form: {
        // 添加或编辑表单对象初始化数据
        id: "",
        action: "",
        stat: "",
        utime: "",
        errmsg: "",
        except: "",
        counter: "",
      },
      // 表单验证规则
      formValidate: {},
      submitLoading: false, // 添加或编辑提交状态
      selectList: [], // 多选数据
      columns: [
        // 表头
        {
          type: "selection",
          width: 60,
          align: "center",
        },
        // {
        //   type: "index",
        //   width: 60,
        //   align: "center",
        // },
        {
          title: "主键ID",
          key: "id",
          minWidth: 200,
          sortable: true,
        },
        {
          title: "操作类型",
          key: "action",
          minWidth: 150,
          sortable: false,
        },
        {
          title: "成功标志",
          key: "statText",
          minWidth: 150,
          sortable: false,
        },
        {
          title: "处理耗时 (ms)",
          key: "utime",
          minWidth: 120,
          sortable: true,
        },
        {
          title: "处理结果",
          key: "errmsg",
          minWidth: 220,
          sortable: false,
          tooltip: true,
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          width: 300,
          render: (h, params) => {
            return h("div", [
              h(
                "a",
                {
                  on: {
                    click: () => {
                      this.info(params.row)
                    },
                  },
                },
                "当前计数器"
              ),
              h("Divider", {
                props: {
                  type: "vertical",
                },
              }),
              h(
                "a",
                {
                  on: {
                    click: () => {
                      this.faultDatas(params.row)
                    },
                  },
                },
                "故障信息"
              ),
              h("Divider", {
                props: {
                  type: "vertical",
                },
              }),
              h(
                "a",
                {
                  on: {
                    click: () => {
                      this.edit(params.row)
                    },
                  },
                },
                "详情"
              ),
              h("Divider", {
                props: {
                  type: "vertical",
                },
              }),
              h(
                "a",
                {
                  on: {
                    click: () => {
                      this.remove(params.row)
                    },
                  },
                },
                "删除"
              ),
            ])
          },
        },
      ],
      data: [], // 表单数据
      total: 0, // 表单数据总数
    }
  },
  methods: {
    // 故障信息
    faultDatas(v) {
      this.faultData = !!v.except ? dedent`${v.except}` : dedent`暂无故障信息`
      this.showFaultData = true
    },
    // 获取全部操作类型
    getActionTypeList() {
      getActionType().then(res => {
        if (res.success) {
          this.actionTypeList = res.result
        }
      })
    },
    // 详情
    info(v) {
      this.formDetail = JSON.parse(v.counter)
      this.showInfo = true
    },
    init() {
      this.getDataList()
      this.getActionTypeList()
    },
    changePage(v) {
      this.searchForm.pageNumber = v
      this.getDataList()
      this.clearSelectAll()
    },
    changePageSize(v) {
      this.searchForm.pageSize = v
      this.getDataList()
    },
    handleSearch() {
      this.searchForm.pageNumber = 1
      this.searchForm.pageSize = 10
      this.getDataList()
    },
    handleReset() {
      this.$refs.searchForm.resetFields()
      this.searchForm.pageNumber = 1
      this.searchForm.pageSize = 10
      // 重新加载数据
      this.getDataList()
    },
    changeSort(e) {
      this.searchForm.sort = e.key
      this.searchForm.order = e.order
      if (e.order === "normal") {
        this.searchForm.order = ""
      }
      this.getDataList()
    },
    clearSelectAll() {
      this.$refs.table.selectAll(false)
    },
    changeSelect(e) {
      this.selectList = e
    },
    changeTableSize(v) {
      this.tableSize = v
    },
    exportData() {
      this.$refs.table.exportCsv({
        filename: "数据",
      })
    },
    getDataList() {
      this.loading = true
      getInsightActionLogList(this.searchForm).then(res => {
        this.loading = false
        if (res.success) {
          res.result.content.forEach(item => {
            item.statText = item.stat == 1 ? "成功" : "失败"
          })
          this.data = res.result.content
          this.total = res.result.totalElements
          if (this.data.length == 0 && this.searchForm.pageNumber > 1) {
            this.searchForm.pageNumber -= 1
            this.getDataList()
          }
        }
      })
    },
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.submitLoading = true
          if (this.modalType === 0) {
            // 添加 避免编辑后传入id等数据 记得删除
            delete this.form.id
            addInsightActionLog(this.form).then(res => {
              this.submitLoading = false
              if (res.success) {
                this.$Message.success("操作成功")
                this.getDataList()
                this.modalVisible = false
              }
            })
          } else {
            // 编辑
            editInsightActionLog(this.form).then(res => {
              this.submitLoading = false
              if (res.success) {
                this.$Message.success("操作成功")
                this.getDataList()
                this.modalVisible = false
              }
            })
          }
        }
      })
    },
    add() {
      this.modalType = 0
      this.modalTitle = "添加"
      this.$refs.form.resetFields()
      delete this.form.id
      this.modalVisible = true
    },
    edit(v) {
      this.modalType = 1
      this.modalTitle = "详情"
      this.$refs.form.resetFields()
      // 转换null为""
      for (let attr in v) {
        if (v[attr] === null) {
          v[attr] = ""
        }
      }
      let str = JSON.stringify(v)
      let data = JSON.parse(str)
      this.form = data
      this.modalVisible = true
    },
    remove(v) {
      this.$Modal.confirm({
        title: "确认删除",
        // 记得确认修改此处
        content: "您确认要删除该条数据?",
        loading: true,
        onOk: () => {
          // 删除
          deleteInsightActionLog({ ids: v.id }).then(res => {
            this.$Modal.remove()
            if (res.success) {
              this.$Message.success("操作成功")
              this.clearSelectAll()
              this.getDataList()
            }
          })
        },
      })
    },
    delAll() {
      if (this.selectList.length <= 0) {
        this.$Message.warning("您还未选择要删除的数据")
        return
      }
      this.$Modal.confirm({
        title: "确认删除",
        content: "您确认要删除所选的 " + this.selectList.length + " 条数据?",
        loading: true,
        onOk: () => {
          let ids = ""
          this.selectList.forEach(function (e) {
            ids += e.id + ","
          })
          ids = ids.substring(0, ids.length - 1)
          // 批量删除
          deleteInsightActionLog({ ids: ids }).then(res => {
            this.$Modal.remove()
            if (res.success) {
              this.$Message.success("操作成功")
              this.clearSelectAll()
              this.getDataList()
            }
          })
        },
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
/deep/ .cm-s-ambiance.CodeMirror,
.cm-s-ambiance .CodeMirror-gutters {
  height: 600px;
}
</style>
