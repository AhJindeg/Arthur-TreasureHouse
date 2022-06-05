// 文本输入按钮事件
$("#nav>input").on("input", function () {
  $("#nav>input").val() == ""
    ? $(".btn").addClass("disabled")
    : $(".btn").removeClass("disabled")
})

// 按钮生成待办事项
$("#nav>div").click(function () {
  $("#tail").css("display", "none")
  let el = `<div>
    <div>${$("input").val()}</div>
    <button>DELETE</button>
  </div>`
  $("#content").prepend(el)
  $("input").val("")
  $(".btn").addClass("disabled")
})
// 回车生成待办事项
$("input").keyup(function (e) {
  if (e.keyCode == 13) {
    if ($(this).val().length != 0) {
      let el = `<div>
        <div>${$("input").val()}</div>
        <button>DELETE</button>
      </div>`

      $("#tail").css("display", "none")
      $("#content").prepend(el)
      $("input").val("")
      $(".btn").addClass("disabled")
    }
  }
})

// 删除待办
// 显示暂无待办事项

// 需要额外搭配一个del函数 实现绑定
// 冒泡：监听ul中 所有button触发的点击事件
$("#content").on("click", "button", function () {
  // this：代表按钮
  $(this).parent().remove() // 移除按钮的父节点
  // 判断无子元素 显示无待办事项
  if ($("#content").children().length == 0) {
    $("#tail").css("display", "block")
  }
})
