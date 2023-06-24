# WebWorker

## 使用方法
---
### 主线程

1. 使用`new`命令调用`Worker()`构造函数创建一个新的线程
   
    ```
    var worker = new Worker('work.js');
    ```

2. 主线程通过调用`postMessage()`来发送消息
   
   ```
    worker.postMessage('send message');
    ```

3. 主线程通过调用`onmessage`事件来接受消息
   
    ```
    worker.onmessage = function (event) {
        if(event.data) {  // worker线程发过来的内容保存在data中
            dosomething()          
        }
    }
    ```

4. Worker线程工作完成后，主线程调用`terminate()`来结束worker线程
   
    ```
    worker.terminate()
    ```

### worker线程

1. Worker线程内部同样使用`message`事件，需要有一个监听函数
  
    ```
    self.addEventListener('message', function (event) {})
    // 其中 self 指子线程自身 即全局对象，也可以使用this 或不写来代替
    // onmessage在此处同样可以使用，但是事件监听函数可以多次绑定事件，onmessage会发生事件覆盖
    ```

2. 同样使用`postMessage()`对主线程发送消息
 
    ```
    self.postMessage('message');
    ```

3. Worker调用`close()`来进行内部关闭
  
    ```
    self.close()
    ```

### Worker加载脚本

- 使用`importScript()`方法在内部加载脚本
   
    ```
    importScript('script1.js')

    importScript('script2.js','script3.js')
    ```

### 错误处理

- 主线程可以监听Worker是否发生错误

    ```
    // 主线程中
    worker.onerror = function (event) { }
    或
    worker.addEventListener('error', function (event) {})
    ```
    
    Worker内部也可以监听error

    
