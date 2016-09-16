#### 狼人杀游戏（werewolf）游戏记录，胜率统计App

* 技术选型

    * 采用apache cordova, 使用html5,css, js制作 android,ios 手机APP
    * 前端 bootstrap v3 + jquery
    * 后端 nodejs (koa, mongoose)
    * 数据库 mongodb

* android环境的安装

 * 前提

    Java环境具备

 * android sdk下载

    官方推荐的是studio下载，纯SDK没有找到，这个是非官方的  
    [http://www.techspot.com/downloads/5425-android-sdk.html](http://www.techspot.com/downloads/5425-android-sdk.html)

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
        * 浏览器切换为手机模式，进行调试

    * android

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

        * android 真机运行

        手机连接电脑，打开usb调试模式  
        window cmd运行 `adb devices`，如果能显示出设备来，表示设备连接成功  
        回到工程执行 cordova run android  
        这时候手机上会提示你是否安装，安装运行。 
        真机 华为荣耀7i通过，   
        乐视1 pro不通过（不提示安装，估计是安全设定的问题， 可以通过生成的apk文件手动安装）

