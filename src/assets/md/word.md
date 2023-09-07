物品图片支持批量导入
业务逻辑：

 存量物品导入属性的下边的存量物品导入图片按钮点击出现弹窗，

选择图片文件完成上传，

通过文件名来限制物品类别数量限制，同名的物品已存在的图片会被删除

每张图片大小做限制，每次上传数量小于100张

环境配置及项目启动

node版本下载16.x

开始版本下载错误，下载成为18.x版本。使用npm安装n管理node

npm i n -g  全局安装n管理器

n --version 查看n版本判断是否安装成功

n i 16   使用n下载node版本号

n use 16  切换版本

n  直接执行，查看并且切换版本

npm更换公司源mnpm

vim ~/.bashrc 或 .zshrc，写入一下内容
alias mnpm="npm --registry=http://r.npm.sankuai.com \
--cache=$HOME/.cache/mnpm \
--disturl=http://npm.sankuai.com/mirrors/node \
--userconfig=$HOME/.mnpmrc"
配置完成后执行
source ~/.bashrc
# 或
source ~/.zshrc

安装Xcode携带git

安装好git后遇到mac系统升级到13.x 导致git失效的问题，重新安装Xcode

设置git ssh  key

git config --global user.name " "
git config --global user.email " " 


git config --list 查看设置的内容

设置ssh
由于mac升级到了13，无法使用rsa,使用ed25519，方法类似

ssh-keygen -t ed25519

Generating pubilc/private ed25519 key pair.    回车

Enter file in which to save the key (/Users/user/.ssh/id_ed25519):  回车

Enter passpgrase (empty for no passphrase) : Enter same passphrase again  回车

cat ～/.ssh/id_ed25519.pub   获取ssh

全局安装@mtfe/builder-sjst-scm

sudo yarn add @mtfe/builder-sjst-scm -g

更改启动的变量

NODE_OPTIONS=--max_old_space_size=8192 VSCODE=1 pnpm dev

更换pnpm后使用原来安装的方法出现一些报错的情况

error:0308010C报错，由于node版本不是长期支持版本也就是LTS版本。我使用的是16.20版本，降到16.14也就是支持pnpm的最低版本，同时在命令行中输入：export NODE_OPTIONS=--openssl-legacy-provider，解决该问题

装APP项目时出现问题


初次使用APP项目

项目代码笔记

goodsmanage文件

 

tabs包含tab、key、sign三个字段通过遍历分别获取tab模块所需要的内容，key渲染对应的组件，sign用于判断用户是否有权限

 

tabs组件接受三个原tabs的数据，激活对应的key和change方法改变mobx的tabkey数据再跳转页面，显示相应的路由？？？？

在组件中，对应的页面table组件会根据key来判断渲染那个组件内容，并传入的props

 

相应的页面组件goodlist、googtemplate、goodsissuelist、 goodslist四个组件表示不同的tab页面，物品管理 、模块管理、 下发、 机构物品管理、但是物品管理和机构管理通过传入key值来区分所需要请求的数据


  

goodlist模块

表格控制模块按钮使用AUTHHOC加入鉴权功能，通过组件传入的AUTHKEY来鉴定使用者是否拥有权限，显示隐藏该按钮

下拉框选择器select 使用antd老版本的写法，将option解构出来作为select的子模块，新版中option是作为porps传入组件的，而不是作为children

获取用户角色

搜索模块  

render方法返回的是继承的BaseList组件的render，super指向，把组件里面定义的方法和属性给baseList使用，还有一个renderChildren方法返回的是各类弹窗组件，在BaseList中以插槽的形式使用，，传递一些方法属性都被baseList组件作为props传递给子组件使用

 

 搜索条件配置使用的位置在于组件继承baseList组件的声明方法用于baselist组件内部传递给Listpagecontauner组件的form属性的一个方法使用，而form包含查询区域的配置属性和方法，可以在goodlist组件中的getFormConfig和getColimns两个方法中就可以修改搜索栏和表格属性的设计定义 

 

 新增物品跳转跳转页面操作getTableOperationConfig方法，在进行按钮鉴权的同时，将需要渲染的按钮operations暴露给baselist组件中需要的属性tableOperation，物品新增点击路由跳转到详情增加路由，同时通过查询参数携带categoryId，分为集团物品和机构物品的添加，携带不同参数，产生不同的效果。

 

renderContentleft用于处理左侧类别导航栏的数据并返回接受数据的组件用于listpagecontainer组件的属性接受数据渲染

 

上方操作栏getBatchImportContent修改控制批量操作下拉栏内容，以modal弹框的形式展现内容

 

baseList组件内部主要由两个组件组成syncContent 和 listpagecontainer 

syncContent接受表单配置项，表格配置项，id，this？

ListPageContainer 暴露组件的ref 传入form配置项 展示table，内容底部顶部左侧等一些内容

 

 通过传入的Key表现出不同的搜索功能

lodash， compact 剔除能转化为false的值

搜索条件的配置，最终返回一个包含formprops及item的参数，

 

 删除先删后端根据后端返回的deletedcount值判断删除结果并将其message

 

使用Map缓存数据params

 

WrappedAntForm的Ref绑定了formRef

自定义方案设置plansettng。formRef传递到PlanSetting内

 

组件传值render props  context.consumer包裹的data
传递syncContent通过context的数据传递到自组件中去

 

listpagecontailner组件也是经过useSyncContent处理过的高阶组件接受context传递的数据