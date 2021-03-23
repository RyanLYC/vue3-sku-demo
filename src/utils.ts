import { listData, skuList, selectI } from './data'

// 判断规格是否可以被选择  核心函数 key当前的规格的title   value规格值
export function isAble(key: string, value: string, selectSpec: selectI) {
  // 深拷贝 避免被影响
  const copySelectSpec: selectI = JSON.parse(JSON.stringify(selectSpec))
  // 用对象的好处就在这了 直接赋值当前验证项
  copySelectSpec[key] = value
  // 用数组的 some 方法 效率高 符合条件直接退出循环
  const flag = skuList.some((item) => {
    // 条件判断 核心逻辑判断
    // console.log(item)
    let i = 0
    // i 能 等于 3 证明 可以返回 true
    for (const k in copySelectSpec) {
      //  console.log(copySelectSpec[k])  // 注释的调试看逻辑代码
      if (copySelectSpec[k] != '' && item.specs.includes(copySelectSpec[k])) {
        // console.log(item)
        i++
      } else if (copySelectSpec[k] == '') {
        i++
      }
    }
    // 符合下面条件就退出了 不符合会一直循环知道循环结束没有符合的条件就 return false 了
    // console.log(i) // 注释的调试看逻辑代码
    return i == listData.length
  })
  console.log(flag)
  return flag
}
