# `数组` `去重`

- 使用 JavaScript 中的 `Set` 轻松删除重复

```
const removeDuplicates = (arr) => [...new Set(arr)];
console.log(removeDuplicates([1, 2, 3, 3, 4, 4, 5, 5, 6]));
```

# 校验 `数组` 是否为 `空`

```
const isNotEmpty = arr => Array.isArray(arr) && arr.length > 0;
isNotEmpty([1, 2, 3]);
```

# `打乱数组`

- 使用 `sort` 和 `random` 方法打乱数组

```
const shuffleArray = (arr) => arr.sort(() => 0.5 - Math.random());
console.log(shuffleArray([1, 2, 3, 4]));
```

# 英文字符串 `首字母` `大写`

```
const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1)
capitalize("follow for more")
```

# `翻转` 字符串

- 使用 `split` 、 `reverse` 和 `join` 方法轻松反转字符串。

```
const reverse = str => str.split('').reverse().join('');
reverse('hello world');
```

# `校验数字` 是奇数还是偶数

```
const isEven = num => num % 2 === 0;
console.log(isEven(2));
```

# 求数字的 `平均值`

- 使用 `reduce` 方法找到多个数字之间的平均值

```
const average = (...args) => args.reduce((a, b) => a + b) / args.length;
average(1, 2, 3, 4);
```

# `回到顶部`

- 可以使用 `window.scrollTo(0, 0)` 方法自动滚动到顶部。将 x 和 y 都设置为 0。

```
const goToTop = () => window.scrollTo(0, 0);
goToTop();
```

# `获取` 浏览器 `Cookie` 的值

- 通过 `document.cookie` 来 `查找` cookie 值

```
const cookie = name => `; ${document.cookie}`.split(`; ${name}=`).pop().split(';').shift();
cookie('_ga');
```

# `清除全部` `Cookie`

- 通过使用 `document.cookie` `访问` cookie 并将其 `清除` ，可以轻松清除网页中存储的所有 cookie。

```
const clearCookies = document.cookie.split(';').forEach(cookie => document.cookie = cookie.replace(/^ +/, '').replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`));
```

# 从 `URL` `获取` 查询参数

- 可以通过传递 `window.location` 或原始 URL `goole.com?search=easy&page=3` 轻松地从 url 检索查询参数

```
const getParameters = (URL) => {
  URL = JSON.parse(
    '{"' +
      decodeURI(URL.split("?")[1])
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
  );
  return JSON.stringify(URL);
};
getParameters(window.location);
```

```
Object.fromEntries(new URLSearchParams(window.location.search))
```

# `检查` 用户的设备是否 `处于` `暗模式`

```
const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
console.log(isDarkMode)
```

# `时间处理`

- 我们可以从给定日期以 `hour::minutes::seconds` 格式记录时间。

```
const timeFromDate = date => date.toTimeString().slice(0, 8);
console.log(timeFromDate(new Date(2021, 0, 10, 17, 30, 0)));
```

# `检查日期` 是否合法

- 使用以下代码段检查给定日期是否有效。

```
const isDateValid = (...val) => !Number.isNaN(new Date(...val).valueOf());
isDateValid("December 17, 1995 03:24:00");
```

# `查找` 日期 `位于`一年中的第几天

```
const dayOfYear = (date) => Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
dayOfYear(new Date());
```

# `计算` 2 个日期之间 `相差` 多少天

```
const dayDif = (date1, date2) => Math.ceil(Math.abs(date1.getTime() - date2.getTime()) / 86400000)
dayDif(new Date("2020-10-21"), new Date("2021-10-22"))
```

# 颜色 `RGB` 转 `十六进制`

```
const rgbToHex = (r, g, b) => "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
rgbToHex(0, 51, 255);
```

# 生成 `随机` `十六进制` 颜色

- 可以使用 `Math.random` 和 `padEnd` 属性生成随机的十六进制颜色。

```
const randomHex = () => `#${Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, "0")}`;
console.log(randomHex());
```

# `复制` 到 `剪贴板`

- 借助 `navigator.clipboard.writeText` 可以很容易的讲文本复制到剪贴板
  > 规范要求在写入剪贴板之前使用 Permissions API 获取“剪贴板写入”权限。但是，不同浏览器的具体要求不同，因为这是一个新的 API。有关详细信息，请查看 compatibility table and Clipboard availability in Clipboard。

```
const copyToClipboard = (text) => navigator.clipboard.writeText(text);
copyToClipboard("Hello World");
```

# `获取` 用户 `选择的文本`

- 使用内置的 `getSelection` 属性获取用户选择的文本。

```
const getSelectedText = () => window.getSelection().toString();
getSelectedText();
```
