# nvm   node管理工具

macOS可以直接使用npm装n模块进行node版本管理
npm i n -g 全局安装 
安装成功后就可以直接使用n来管理 node版本

windows系统稍微复杂一点，目前只有nvm-windows能够在windows上支持node版本管理
GitHub的源码地址及安装包下载地址：[nvm-windows下载地址](https://github.com/coreybutler/nvm-windows/releases)

**安装过程：**

1. 由于已安装的node会和nvm产生冲突，需要先将已经装好的node及相关的npm卸载干净后，再安装nvm模块。

涉及文件会包含：
	• D:\Application\nodejs
	• C:\Users\testAppData\Roaming\npm

2. 删除nodejs和npm相关的环境变量

在我的电脑->属性->高级系统设置->环境变量中删除所有相关的环境变量

3. win+R，输入CMD，打开终端输入命令node -v 和npm -v检查是否卸载完毕
4. 安装nvm

下载好安装包后进行安装，注意父级不能是中文路径

5. 使用nvm   简写指令无法识别

查看已安装的node版本  nvm list 或者nvm ls

安装新node版本       nvm install [版本号]

切换node版本         nvm use [版本号]

卸载node版本         nvm uninstall [版本号]

1.1.11版本不需要另外安装对应的npm包，在安装node版本时会自动装好对应的npm包



# SSH密钥

1. 查看已有的密钥文件
在Git Bash中输入
ls -al ~/.ssh

2. 生成新的SSH密钥
ssh-keygen -t ed25519 -C "email@xxx.com"
-t生成密钥的算法  -C邮箱标签

Enter a file in which to save the key (/c/users/user/.ssh/id_ALGORITHM): [保存的路径及文件重命名]
这个过程中如果已有默认文件确定会进行覆盖，重新生成新的密钥，原来的密钥也就失效了
后续过程可以设置使用密钥的安全密码，如果设置了每次使用时需要输入
添加或修改安全密码
ssh-keygen -p -f ~/.ssh/id_ed25519

3. 将SSH密钥添加到ssh-agent中
windows系统
eval "$(ssh-agent -s)" 运行ssh-agent
ssh-add ~/.ssh/私钥文件   //如果不是默认路径创建的的文件需要修改文件路径

4. 再将SSH公钥添加到仓库中
复制公钥文件内的内容
clip < ~/.ssh/id_ed25519.pub
也可以使用cat直接查看内容
也可以使用vim或者vi打开编辑后复制出来

5. 测试SSH连接
ssh -T git@github.com
响应Hi USERNAME! You've successfully ....表示连接成功

在上述添加过程中，ssh-agent可能不会自动运行，每次使用密钥都需要手动启动密钥
可以通过如下方法解决：
1）设置~/.ssh/config文件

```
Host github.com  //对于的代码仓库，*表示所有仓库
        IgnoreUnknown UseKeychain  //可能会报错，就添加这一段
        AddKeysToAgent yes
        UseKeychain yes
        IdentityFile ~/.ssh/id_pcgithubkey  //启动的密钥文件
```

2）windows的服务中 OpenSSH Authentication Agent设置为自动启动

3）git bash 工具：
\# 在.profile 或  .bashrc 添加
\# Git for windows 提供的方式

```
# ssh-agent auto-launch (0 = agent running with key; 1 = w/o key; 2 = not run.)
agent_run_state=$(ssh-add -l >| /dev/null 2>&1; echo $?)
if   [ $agent_run_state = 2 ]; then
  eval $(ssh-agent -s)
  ssh-add ~/.ssh/one_rsa
  ssh-add ~/.ssh/two_rsa
elif [ $agent_run_state = 1 ]; then
  ssh-add ~/.ssh/one_rsa
  ssh-add ~/.ssh/two_rsa
fi
# 记得还要在 ~/.bash_logout 中添加，来关闭 ssh-agent
# ssh-agent -k
新建 ~/.bash_logout 文件，添加：
# 记得还要在 ~/.bash_logout 中添加，来关闭 ssh-agent
ssh-agent -k

```

4）github 提供的方式

可以在打开 bash 或 Git shell 时自动运行 ssh-agent。 复制以下行并将其粘贴到 Git shell 中的 ~/.profile 或 ~/.bashrc 文件中：

```
env=~/.ssh/agent.env
agent_load_env() { test-f "$env"&& . "$env">| /dev/null ; }
agent_start() {
    (umask077; ssh-agent >| "$env")
    . "$env">| /dev/null ; }
agent_load_env
# agent_run_state: 0=agent running w/ key; 1=agent w/o key; 2=agent not running
agent_run_state=$(ssh-add -l >| /dev/null 2>&1; echo$?)

if[ ! "$SSH_AUTH_SOCK"] || [ $agent_run_state= 2 ]; then
    agent_start
    ssh-add
elif[ "$SSH_AUTH_SOCK"] && [ $agent_run_state= 1 ]; then
    ssh-add
fi

unset env
```

