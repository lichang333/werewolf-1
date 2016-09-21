#### 狼人杀（werewolf）游戏数据记录，胜率统计App

* 技术选型

    * 采用apache cordova, 使用html5,css, js制作 android,ios 手机APP
    * 前端 bootstrap v3 + jquery
    * 后端 nodejs (koa, mongoose)
    * 数据库 mongodb

* Nodejs安装

 * 安装nodejs， 参照官网

* android环境的安装

 * 前提

    Java环境具备

 * android sdk下载

    官方下载地址（画面最下方SDK 工具包， 需要翻墙）：  
    感谢[cikai](https://github.com/cikai)友情提示。  
    [https://developer.android.com/studio/index.html](https://developer.android.com/studio/index.html)

 * 环境变量设定

    ```
    ANDROID_HOME C:\adt-bundle-windows-x86-20130917\sdk
    PATH %ANDROID_HOME%\tools;%ANDROID_HOME%\platform-tools
    ```

 * 更新sdk

    * 代理设定

        打开sdk manager， 设定代理 tools -> options   
        mirrors.neusoft.edu.cn / 80 / 勾选force的checkbox / 回到主界面  
        Packages -> Reload， 根据需要下载包 
  
    * 安装什么包？

        cordova requiremnts 会提示你缺少什么  
        例如，警告你缺少 Android target: android-23  
        意思就是说缺少android 23 的api， 那么需要安装android 6.0版本（6.0对应23的api）

* 代码调试

    * 浏览器调试

        * cordova platforms add browser
        * cordova run browser
        * chrome F12 + 切换为手机模式，进行调试

    * android调试

        * 安装好android环境
        * cordova platforms add android
        * cordova platforms list
        * cordova requirements
        * cordova build android
        * 如果以上都没有问题，这时候应该可以在android设备上运行了
        * 模拟器运行

            先创建模拟器 `"f:\adt-bundle-windows-x86-20130917\sdk\tools\android.bat" avd`  
            再从弹出的UI中创建一个android模拟器  
            回到工程执行 cordova run android  
            我没有成功，报错，未深究

        * android 真机运行（推荐）

            手机连接电脑，打开usb调试模式  
            window cmd运行 `adb devices`，如果能显示出设备来，表示设备连接成功  
            回到工程执行 cordova run android  
            这时候手机上会提示你是否安装，安装运行。 
            真机 华为荣耀7i通过，   
            乐视1 pro不通过（不提示安装，估计是安全设定的问题， 可以通过生成的apk文件手动安装）


* cordova plugin安装

    * camera  
 
        cordova plugin add cordova-plugin-camera

    * 代码热替换  
 
        * 安装  

            [https://www.npmjs.com/package/cordova-hot-code-push-local-dev-addon](https://www.npmjs.com/package/cordova-hot-code-push-local-dev-addon)

        * 实测  

           在android真机调试可用，修正代码后，等2秒钟，在手机APP中能直接反映  
           在browser不可用，报错，js加载的时候hot code的2个插件没有加载到，实际跟踪js觉得加载没问题啊。。。

* 开发

    * nodejs
    ```
    npm install -g nodemon
    npm install
    ```

    * mongodb启动
    mongod

    * 启动  
    nodemon server.js

    * 运行  
    http://localhost:3000/index.html

* 学习到的内容

    * CSP   
    
        * CSP是浏览器的安全策略

        * CSP是白名单策略，通过白名单来限制资源的加载，从而达到防范XSS目的

        * CSP设定的2种方法
        http头的`Content-Security-Policy`段  
        html的meta标签`<meta http-equiv="Content-Security-Policy" content="script-src 'self'; object-src 'none'; style-src cdn.example.org third-party.org; child-src https:">`

        * 看看阮一峰老师介绍 [http://www.ruanyifeng.com/blog/2016/09/csp.html](http://www.ruanyifeng.com/blog/2016/09/csp.html)

* 其他问题记录

    * 编译成android后，发现ajax请求不能跨域

        * 所有ajax的url都写绝对路径， http://10.12.23.22:3000/players
        * html头上设定CSP安全规则  
        `<meta http-equiv="Content-Security-Policy" content="default-src *; image-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' 'unsafe-eval'">`

    * 2处需要修改ip地址的地方

        * common.js
        * server.js


