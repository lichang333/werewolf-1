#### apache cordova 学习

* android环境的安装

 * 前提

  Java环境具备

 * android sdk下载

  这个是从某个软件站下载的， 汗~

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
  