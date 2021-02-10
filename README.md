# movie-app vue + axios + vuex + mintui + nodeJs

## 前言
用vue写的一个练手小项目，用了vue + axios + vuex + mintui + nodeJs ，起初是用nodeJs写了一个电影网站爬虫，爬了一两万数据在数据库，后来突然就想自己可以写个电影网站，起初是这个样子的，但是由于视频的播放都是磁力链接，所以就写不下去了，突发奇想，可以写成购物的，可以购买这个电影，购买完成后，给用户展示链接，于是就有了这个项目。
由于还是小白，代码十分不规范，网络请求什么的也没封装，代码总之很烂，但是也是花费很久才写好的，所以还是上传上来啦。

## 地址

* 项目预览 ：[https://movie.songjintao.cn/](https://movie.songjintao.cn)
* API接口 ：[https://api.songjintao.cn/](https://api.songjintao.cn)
* 我的博客 ：[https://songjintao.cn](https://songjintao.cn)

## 功能


* 注册，注册时以邮箱发送验证码
* 登陆，登陆成功服务器返回token
* 搜索功能，只有几万个电影
* 购物车功能，根据token识别用户添加商品
* 支付功能
* 查看已购买商品

支付功能本地运行时可以支付但是上线后用hash模式不能支付，因为#号，history则可以，但是成功后不能跳转到支付处理界面，单页面应用不能刷新缘故，所以支付成功后不能处理商品信息，不能添加到已购买商品，能力十分有限，不知道仲么办

## 使用

### 安装依赖
```
npm install
```

### 执行
```
npm run serve
```

### 打包
```
npm run build
```


