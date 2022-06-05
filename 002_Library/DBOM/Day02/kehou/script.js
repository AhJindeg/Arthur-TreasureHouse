// 帐号
let accText = document.getElementsByTagName("input")[0]
// 密码
let pasText = document.getElementsByTagName("input")[1]
// 帐号成功
let accOk = document.querySelector(".verify span")
// 帐号失败
let accOn = document.querySelector(".verify div")
// 密码成功
let pasOk = document.querySelector(".verifys span")
// 密码失败
let pasOn = document.querySelector(".verifys div")

// 帐号失去焦点
accText.onblur = function () {
  let reg_acc = /^\w{1,10}$/
  if (reg_acc.test(acc.value)) {
    accOk.style.display = "block"
    accOn.style.display = "none"
  } else {
    accOn.style.display = "block"
    accOk.style.display = "none"
  }
}
pasText.onblur = function () {
  let reg_pas = /^\d{6}$/
  if (reg_pas.test(pas.value)) {
    pasOk.style.display = "block"
    pasOn.style.display = "none"
  } else {
    pasOn.style.display = "block"
    pasOk.style.display = "none"
  }
}
