## 前端性能监控工具
一个基于 perfomance API 的前端性能监控工具

## API

### 1. new perfomer()

#### description
实例化一个perfomer对象
#### Parameters
- opt {object} 还没想好需要有什么option
#### example
```javascript
var obj = new perfomer(opt)
```

### 2. perfomer.proptotype.getData()

#### description
返回一个包含所有性能数据格式化后的对象
#### Parameters
- isJson {boolean} 是否需要返回json对象
#### example
```javascript
perfomer.getData(true) 
```

### 3.perfomer.proptotype.send()
#### description
使用xhr对象将所有性能数据格式化后数据发送到服务端
#### Parameters
- url {string} 服务端接口的url
- opt {object} 包含method，data，callback的对象
#### example
```javascript
perfomer.send('www.baidu.com/api/perfomance')
perfomer.send('www.baidu.com/api/perfomance', {
    data: {whitetime: 500},
    cb: function (res) {
        console.log(res)
    }
})
```


## 写在最后
这只是一个小工具，暂时并不打算做太完善，毕竟功能太鸡肋，所以里面有些东西设计的不合理还请别在意，反正也没有人用