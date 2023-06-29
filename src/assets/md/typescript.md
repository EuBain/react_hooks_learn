# TypeScript
1. 当.d.ts文件中不包含export import 时文件内部声明的类型会被认为是全局定义的类型
当包含时，会被ES6解析为模块，使用类型时就需要导入类型

2. declare 声明，用来全局声明，和type、interface声明一样，如文件中不包含export、import就被当作全局声明
用于声明全局变量，全局方法，全局类，全局枚举类型， 全局对象（命名空间namespace），

3. declare global 不同，内部声明的都是全局的

4. 默认导出方式，设置默认导出后，其他未使用export导出的类型将不能被外部使用,没有默认导出时，文件会被作为一个模块，内部的类型可以被导出使用
export default ES6 默认导出
export = commonjs 导出模块
export as namespace UMD 库声明全局变量
