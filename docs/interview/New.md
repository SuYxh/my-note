## 2024.09

### 工作经历

1、负责游戏账号售卖与租赁业务以及奢侈品回收相关业务的常规需求迭代工作 

2、针对游戏业务的首页进行优化，使用异步组件的策略来封装视频挂件，同时推动后端伙伴进行接口合并，由于 13 个接口合 并至 6 个，并采用了预渲染技术，将原本 1800 ms左右的首评时间减少到 204 ms左右，达到秒开的效果，提高用户体验。 

3、通过分析王者营地数据并设计了数据爬取服务，在用户同意使用其相关数据的协议下，获取到其在平台出售账号的资产信 息，为搜索提供了数据支持，同时提高了账号的真实性，具高斯平台统计，游戏账号支付率提升0.5%，每天增加100-150单 量，月收入增长超过30多万元 

4、重构奢侈品品牌选择页面的搜索逻辑，由于之前的全等匹配修改成使用正则表达式配合组合模式的方式进行匹配，提高了搜 索命中率，直接提升了 7% 的估价转化率，后续还新增了 AI 搜索。

5、基于 zz-cli 搭建了 React + Umi 技术栈的奢侈品管理后台项目， 封装了后台中常用的能力以及相关的模板，实现高效开 发，并接入了公司的 SSO 平台，以及RBAC 权限管理系统;以及与点控云平台合作，拓展打电话功能，提升用户服务体验。 

6、开发了团队的 vscode 插件，针对常用组件库 zzui 提供了配套的支持，支持自动导入组件、use 组件等一些基础能力，极 大的提高了团队的开发效率，并与基础支撑组的同学进行合作，为插件增加了 AI 的能力，包括代码智能生成、解读、优化、测 试等功能，极大地丰富了开发体验。

7、参与基础库 native-adapter、zzui、js-sdk 等基础的维护。







### 项目问题预设

#### 奢侈品回收C2P项目

奢侈品回收C2P项目是公司近年来重点投入的品类之一。业务的发展带来了回收单量的提升，由于客单价较高，也带来了较大的资金压力与风险。公司积极探索了一种新的业务模式，C2P 模式，简单的说就是将用户的奢侈品销售给商家，并通过竞拍机制确保最佳价格，同时公司提供兜底保障。同时也为了给用户带来更好的回收体验，支持上门回收和邮寄回收。


技术栈： vue + vue-router + pinia + native-adapter + js-sdk + zzui


1、通过预渲染技术，品牌选择页面的加载时间从1475ms大幅降低至177ms，显著提升了用户体验。
2、将预渲染的逻辑封装成了 zzPreRender hook，简化了原先复杂的接入步骤，方便在本业务中进行接入；后续升级为 NPM 包，方便其他业务进行使用，减少了对业务代码的侵入。
3、品牌选择页承载了 4 个端的品牌品类选择功能以及 AB 测功能，设计上采用了策略模式进行匹配，分发数据，确保代码结构清晰，易于维护。
4、在用户选择品类、系列、款式、参数等阶段，每个操作都可能有4种不同的结果。封装了useNextStep hook，并在这些阶段统一使用handleNextStep方法进行处理，确保不同阶段的处理逻辑清晰且易维护。
5 、使用 vue.extend() 实现函数调用方式的客服弹窗组件，避免在多个页面重复引入，提高了代码复用性和可维护性。
6、根据图片实际尺寸动态调整样式，确保图片在容器中垂直居中显示，并封装为奢侈品专用组件，支持查看原图和图片懒加载，并放入内部组件库 ZZUI， 方便中台等其他部门使用。
7、修改基础库 native-adapter 的 ZZAdapter 适配器，让其支持上门回收师、鉴定师和商家端APP调用 native 的能力
8、企业微信侧边栏开发，使用 getCurExternalContact API 获取当前联系人信息，并利用其userId获取用户偏好信息，增强私域服务能力；使用 paste 事件绕过企业微信的限制实现文件复制的问题，提升客服效率。

 

##### 难点

- 方案设计





##### vue 异步组件的使用以及原理

Vue 异步组件是一种按需加载组件的方式，允许在需要时才加载组件的代码，而不是在应用启动时一次性加载所有组件。这有助于减少初始加载时间，提高应用性能。

```js
// 使用
const AsyncComponent = () => ({
  // 要加载的组件（需要是一个 Promise）
  component: import('./MyComponent.vue'),
  // 加载中应当渲染的组件
  loading: LoadingComponent,
  // 出错时渲染的组件
  error: ErrorComponent,
  // 展示加载中组件前的延迟时间，默认 200ms
  delay: 200,
  // 最长等待时间，超出此时间则渲染错误组件，默认：Infinity
  timeout: 3000
});

// 实现
// defineAsyncComponent 函数用于定义一个异步组件，接收一个异步组件加载器作为参数
function defineAsyncComponent(loader) {
  // 一个变量，用来存储异步加载的组件
  let InnerComp = null;

  // 返回一个包装组件
  return {
    name: "AsyncComponentWrapper",
    setup() {
      // 异步组件是否加载成功
      const loaded = ref(false);

      // 执行加载器函数，返回一个 Promise 实例
      // 加载成功后，将加载成功的组件赋值给 InnerComp，并将 loaded 标记为 true，代表加载成功
      loader().then((c) => {
        InnerComp = c;
        loaded.value = true;
      });

      return () => {
        // 如果异步组件加载成功，则渲染该组件，否则渲染一个占位内容
        return loaded.value
          ? { type: InnerComp }
          : { type: Text, children: "" };
      };
    },
  };
}
```



##### webpack 代码分割

使用 `import()` 语法会告诉打包工具（如 webpack）对代码进行分割。每个异步组件的代码会被分割成一个单独的代码块（chunk），在需要时才会加载。

参考： [ES 模块与 webpack 代码分割.md](./ES 模块与 webpack 代码分割.md)



##### 预渲染

1、客户端通过内置或者接口下发来触发预渲染。接口会告诉客户端在a页面来帮助渲染b页面

2、当我们在a页面的时候，客户端会打开一个小webview来加载b页面

3、b页面通过url上的isPreRender =1来判断是否是渲染中，window.zzPreRender不准确不要使用

4、如果是预渲染就会在代码里面做一些特殊的处理。比如预渲染就不发送接口请求。只渲染骨架

5、页面完成渲染，通过sdk通知客户端b页面渲染完成，可以使用，同时注册一个页面被使用时的回调函数

6、当a页页面跳转到b页面时，客户端判断b页面存在可以使用的已完成预渲染的webview，就直接使用

7、当b页真正打开的时候，怎么去触发接口请求呢。是通过之前回调函数的触发后续的逻辑，同时修改本地location.href的值

8、这个预渲染就被使用了。同时这个webview就加到页面栈里面。如果下次在打开a页面。客户端判断已经不存在b页面可用完成预渲染的webview。a页面还是会进行b页面的渲染



###### 注意的问题

1、需要配置

2、命中率问题

3、url 上没有业务参数

4、app v9.11.0+ 版本

5、视频加载 解码之类的逻辑 放到 onViewWillAppear 时序之后进行，后台视频解析之类操作会消化大量内存 导致安卓崩溃率上升



##### 预请求

![image2022-6-30_21-26-27](https://qn.huat.xyz/mac/202409151442219.png)

首先，用户点击打开 Webview，App 请求 Ajax 列表的接口并且把本地的上次请求的数据删除，同时加载 WebView。

JS 在请求接口时，先通过 JSBridge 取数据，Key 支持多个值一起传。

如果数据在 JSBridge 请求之前返回，把数据写入本地对应 Key 的 Value，JSBridge 读取后返回数据。

如何没有返回，读取本地 Key 为空，直接返回空。

接口返回的数据 App 端不用做任何判断和处理。如果没有取到，页面再次通过 JS 发起请求，之后的超时重新请求等策略保持一致。



##### 企微侧边栏

![7874a960-61ec-4792-a9f3-256ebeebd72e](https://qn.huat.xyz/mac/202409151613763.png)

// agentConfig 返回值在 windows 和 mac 上格式不一样

```js
import zzfetch from '@zz/fetch'

export function initWorkWXConfig() {
  return new Promise((resolve, reject) => {
    zzfetch({
      url: `https://wxmsg.zhuanspirit.com/api/getJSApiSignature?url=${window.encodeURIComponent(location.href)}&enterpriseId=0&code=1009`
    }).then(res => {
      const { appId, noncestr, signature, timestamp } = res.resp
      if (wx.agentConfig) {
        wx.agentConfig({
          corpid: appId, // 必填，企业微信的corpid，必须与当前登录的企业一致
          agentid: '1000424', // 必填，企业微信的应用id 1000348
          timestamp, // 必填，生成签名的时间戳
          nonceStr: noncestr, // 必填，生成签名的随机串
          signature, // 必填，签名，见附录-JS-SDK使用权限签名算法
          jsApiList: ['getCurExternalContact', 'getContext'], //必填，传入需要使用的接口名称
          success: function(res) {
            console.log('===========wxconfig success', res)
            resolve(res)
          },
          fail: function(res) {
            console.log('===========wxconfig fail', res)
            reject(res)
          }
        });
      }
    })
  })
}

export async function getCurExternalUserId() {
  const wxConfigResult = await initWorkWXConfig()
  console.log('getCurExternalUserId========wxConfigResult', wxConfigResult);
  return new Promise((resolve, reject) => {
    // @ts-ignore
    wx?.invoke('getCurExternalContact', {}, function(res) {
      if (res.err_msg == 'getCurExternalContact:ok') {
        // 返回当前外部联系人userId
        const { userId } = res
        resolve(userId)
      } else {
        //错误处理
        reject(new Error('getCurExternalContact调用报错'))
      }
    });
  })
}
```



##### 前端搜索

如何解析用户输入：使用正则提取出用户输入的 汉字、字母、数字，然后合并成为一个数组

// 匹配汉字  const zhReg = /[\u4e00-\u9fa5]+/g

// 匹配数字 const numReg = /[\d]+/g

// 匹配字母  const letterReg = /[a-zA-Z]+/g



如何进行精确匹配：

- 单一字段匹配： 根据标题，然后去重 [...**new** *Set*(allSelect)]
- 多字段匹配： 根据标题和描述，然后去重 [...**new** *Set*(allSelect)]

以为brandName匹配为例，拿到数据源某一条的brandName 和 解析出的用户词组， 判断 brandName  中是否包含用户输入的keyword进行分词后的数据



如何进行结果高亮: 动态正则

```js
inputArr.value.forEach((key) => {
  const reg = new RegExp(key, 'i')
  replaceText = replaceText.replace(
    text.match(reg)?.[0],
    `<em style="color: #ff483c">${text.match(reg)?.[0]}</em>`
  )
})
```



##### 首屏时间计算







#### **奢侈品管理后台**


奢侈品管理后台是一个综合性的管理平台，涵盖了线索管理、外呼统计、上门管理、奢侈品鉴定、成色模板配置以及回收单查询等多个功能模块。该平台旨在为客服、运营团队提供一个高效、安全的工作环境，以支持奢侈品回收业务的顺利进行。

技术栈： React + Umi4 + antd

职责：
1、基于WebSocket实现了线索状态变化和新线索的即时通知，并设计了心跳检测机制，确保了系统的稳定性。同时，使用SpeechSynthesisUtterance实现了语音播报功能。
2、扩展了proTable的valueEnum类型，支持自定义组件的展示，增强了表格的灵活性和可定制性
3、接入公司的 RBAC 权限管理平台，封装 Access 组件，方便进行权限判断，支持页面权限与按钮权限，确保系统的安全性
4、SSO 认证平台接入，支持企业微信扫码登录；同时为了方便开发人员登录其他人员账号，开发了直接使用 sso-name 进行登录，提高了问题排查与修复的效率 。
5、通过配置Nginx，将原本的单页应用（SPA）转变为多页应用（MPA） ，并通过 iframe 的方式加载点控云提供的 html 文件，通过postMessage 方式进行通信， 实现了与第三方服务的集成。
6、基于@ant-design/plots封装了折线图组件，提高了图表的可复用性和开发效率。
7、使用@umi/max内置的Model作为状态管理工具，存储当前的通话信息，简化了状态管理流程
8、使用腾讯地图API，实现了对上门回收师位置的实时监控和路径规划，提升了对小哥的管控能力。



##### 难点

- 第一次写 react



##### websocket

1. **全双工通信**：客户端和服务器可以同时发送和接收信息，这与传统的HTTP请求（一种半双工通信方式）形成对比，在HTTP中，请求只能由客户端发起，服务器响应后连接通常会关闭。
2. **持久连接**：一旦WebSocket连接建立，它会保持开放状态，直到客户端或服务器决定关闭连接。这减少了频繁建立连接的开销。
3. **低延迟**：WebSocket设计用于减少通信过程中的延迟，因为建立连接之后，消息可以直接在客户端和服务器之间传递，而不需要每次都进行握手。
4. **数据帧**：WebSocket数据通过帧传输，这些帧可以代表文本或二进制数据。
5. **兼容性**：WebSocket设计为与现有的Web基础设施兼容。它在HTTP的基础上初始化连接，通过发送一个特殊的"Upgrade"请求来将HTTP连接升级为WebSocket连接。



- SSE 使用 HTTP 协议，现有的服务器软件都支持。WebSocket 是一个独立协议。
- SSE 属于轻量级，使用简单；WebSocket 协议相对复杂。
- SSE 默认支持断线重连，WebSocket 需要自己实现。
- SSE 一般只用来传送文本，二进制数据需要编码后传送，WebSocket 默认支持传送二进制数据。
- SSE 支持自定义发送的消息类型。



http、websocket、SSE 都有什么区别呢？

- **连接持久性**：HTTP连接通常是短暂的，而WebSocket和SSE都是设计为建立持久连接的。
- **双向通信**：WebSocket支持全双工通信，而SSE只支持服务器到客户端的单向通信。
- **实时性**：WebSocket和SSE都能提供实时数据传输，但WebSocket提供了更高的灵活性和更低的延迟。
- **复杂性和资源消耗**：WebSocket相对于SSE来说，在服务器端通常更复杂，可能需要更多的资源来维护持久连接和状态。
- **浏览器支持**：大多数



```js
var ws;
var heartbeatInterval = 10000; // 心跳间隔时间，例如10秒
var heartbeatTimeout = 2000; // 心跳响应超时时间，例如2秒
var reconnectInterval = 5000; // 重连间隔时间，例如5秒
var heartbeatTimer = null;
var heartbeatTimeoutTimer = null;

function connect() {
  ws = new WebSocket('wss://example.com/socketserver');

  ws.onopen = function(event) {
    console.log('Connection opened');
    startHeartbeat();
  };

  ws.onmessage = function(event) {
    console.log('Received message: ' + event.data);
    // 如果收到任何消息，说明连接是活跃的，重置心跳
    resetHeartbeat();
  };

  ws.onerror = function(event) {
    console.error('WebSocket error observed:', event);
  };

  ws.onclose = function(event) {
    console.log('Connection closed');
    stopHeartbeat();
    // 尝试重新连接
    setTimeout(connect, reconnectInterval);
  };
}

function startHeartbeat() {
  heartbeatTimer = setInterval(function() {
    console.log('Sending heartbeat');
    ws.send('HEARTBEAT');

    // 如果在设定的超时时间内没有收到消息，认为连接已断开
    heartbeatTimeoutTimer = setTimeout(function() {
      console.log('Heartbeat timeout, closing connection');
      ws.close(); // 主动关闭连接
    }, heartbeatTimeout);
  }, heartbeatInterval);
}

function resetHeartbeat() {
  // 清除超时定时器，并重新开始心跳
  clearTimeout(heartbeatTimeoutTimer);
  heartbeatTimeoutTimer = null;
}

function stopHeartbeat() {
  clearInterval(heartbeatTimer);
  clearTimeout(heartbeatTimeoutTimer);
  heartbeatTimer = null;
  heartbeatTimeoutTimer = null;
}

// 初始化连接
connect();

```





##### SSO

> https://juejin.cn/post/7195588906809032764

1. **第一次访问系统A**：

   - **用户操作**：用户访问系统A（`www.app1.com`），由于尚未登录，系统A将用户重定向到认证中心（`www.sso.com`）。
   - **认证中心操作**：
     - 用户在认证中心输入用户名和密码进行登录。
     - 登录成功后，认证中心在其域名下（`www.sso.com`）种下`cookieSSO`，用于记录用户的登录状态。
     - 认证中心生成一个`ticket`，并将用户重定向回系统A（`www.app1.com?ticket=xxx`）。
   - **系统A操作**：
     - 系统A收到带有`ticket`的请求，后端`serverA`使用`ticket`向认证中心`serverSSO`验证用户身份。
     - 验证通过后，系统A在其域名下（`www.app1.com`）种下`cookieA`，用于维护用户在系统A的会话。

2. **第二次访问系统A**：

   - **用户操作**：用户再次访问系统A。
   - **系统A操作**：
     - 浏览器会自动携带`cookieA`。
     - 系统A的后端验证`cookieA`，如果验证通过，用户无需再次登录即可直接访问系统A。

3. **第三次访问系统B**：

   - **用户操作**：用户访问系统B（`www.app2.com`）。
   - **系统B操作**：由于用户未在系统B登录，系统B将用户重定向到认证中心（`www.sso.com`）。
   - **认证中心操作**：
     - 浏览器会携带之前在认证中心种下的`cookieSSO`。
     - 认证中心检测到`cookieSSO`有效，确认用户已登录，无需再次输入用户名和密码。
     - 认证中心生成一个新的`ticket`，并将用户重定向回系统B（`www.app2.com?ticket=xxx`）。
   - **系统B操作**：
     - 系统B收到带有`ticket`的请求，后端`serverB`使用`ticket`向认证中心`serverSSO`验证用户身份。
     - 验证通过后，系统B在其域名下（`www.app2.com`）种下`cookieB`，用于维护用户在系统B的会话。

**注意事项**：

- **Cookie的作用域**：
  - `cookieSSO`：只在认证中心的域名（`www.sso.com`）下有效，用于标识用户在认证中心的登录状态。
  - `cookieA`和`cookieB`：分别在系统A和系统B的域名下有效，用于维护用户在各自系统中的会话状态。

- **Ticket的使用**：
  - `ticket`是一次性令牌，通常只能使用一次，具有短暂的有效期。
  - 系统A和系统B在收到`ticket`后，需立即向认证中心验证，并在本地建立会话。

您的理解准确地描述了CAS单点登录的核心流程。



##### RBAC

基于角色的访问控制： 通过角色关联用户，角色关联权限的方式间接赋予用户权限

RBAC通过定义角色的权限，并对用户授予某个角色从而来控制用户的权限，实现了用户和权限的逻辑分离

- 🧑‍💻 **User（用户）** - 每个用户都有唯一的UID识别，并被授予不同的角色

- 🤹 **Role（角色）** - 不同角色具有不同的权限

- 🛠 **Permission（权限）** - 访问权限

- 📤 **用户-角色映射** - 用户和角色之间的映射关系

- 📝 **角色-权限映射** - 角色和权限之间的映射



分类： 

- RBAC0-基础
- RBAC1-角色继承，比如部门负责人、小组长
- RBAC2-角色权限限制，唯一性、互斥性，比如：部门只有一个老大，
- RBAC3 整合了前面的几种，比如 公司组织架构



基于资源的权限访问控制模型（Resource-Based-Access-Control） 就流行了起来，在传统模型基础上，它让用户也可以直接关联权限，这样就更加灵活了。



##### 自定义valueType类型

###### 自定义渲染

使用renderFormItem函数返回自定义组件，在其第三个参数中获取到form实例，使用`form.setFieldsValue({ evaluatePriceInSearch: [] });` 设置初始值，不然search的transform方法在搜索的时候不生效，table还需要监听`onReset` ， 在重置时候取消筛选条件

```js
import React, { useState } from 'react';
import ProTable from '@ant-design/pro-table';
import { InputNumber, Form } from 'antd';

const InputRange = ({ value, onChange }) => (
  <Form.Item label="估价范围">
    <InputNumber
      value={value[0]}
      onChange={val => onChange([val, value[1]])}
      style={{ marginRight: 8 }}
    />
    到
    <InputNumber
      value={value[1]}
      onChange={val => onChange([value[0], val])}
      style={{ marginLeft: 8 }}
    />
  </Form.Item>
);

const DemoTable = () => {
  const [form] = Form.useForm();
  const [evaluatePriceRange, setEvaluatePriceRange] = useState([]);

  const columns = [
    {
      title: '估价金额',
      hideInTable: true,
      dataIndex: 'evaluatePriceInSearch',
      order: 30,
      search: {
        transform: () => ({
          minEvaluatePrice: evaluatePriceRange[0] ?? '',
          maxEvaluatePrice: evaluatePriceRange[1] ?? '',
        }),
      },
      renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
        if (type === 'form') {
          // 只有在表单中才处理
          return (
            <InputRange
              value={evaluatePriceRange}
              onChange={value => {
                setEvaluatePriceRange(value);
                // 更新表单字段值，以保证与 ProTable 查询参数同步
                form.setFieldsValue({ evaluatePriceInSearch: value });
              }}
            />
          );
        }
        return defaultRender(_);
      },
    },
    // 其他列配置...
  ];

  return (
    <ProTable
      columns={columns}
      request={async (params) => {
        // 模拟请求数据
        console.log(params);
        return Promise.resolve({
          data: [],
          success: true,
        });
      }}
      rowKey="id"
      form={form}
      search={{
        filterType: 'light',
      }}
    />
  );
};

export default DemoTable;
```



###### 扩展

```js
// App.tsx
import React from 'react';
import { ProProvider, ProTable } from '@ant-design/pro-components';
import CustomComponent from './CustomComponent';

const valueTypeMap = {
  custom: {
    render: (text, props) => {
      return <CustomComponent value={text} {...props} />;
    },
    renderFormItem: (text, props, form) => {
      return <CustomComponent {...props} />;
    },
  },
};

const columns = [
  {
    title: '自定义字段',
    dataIndex: 'customField',
    valueType: 'custom',
  },
  // 其他列配置...
];

const App: React.FC = () => {
  return (
    <ProProvider value={{ valueTypeMap }}>
      <ProTable columns={columns} />
    </ProProvider>
  );
};

export default App;

```





##### 腾讯地图

```js
// 1、先进行标点，标出用户的地址  
 const marker = new TMap.MultiMarker({
      id: 'marker-layer-' + randomStr, // 为每个标记图层指定唯一的ID
      map: map,
      styles: {},
      geometries: [
        {
          id: 'marker-' + randomStr, // 为每个标记指定唯一的ID
          styleId: 'marker',
          position: new TMap.LatLng(lat, lng),
        },
      ],
    })
// 2、进行路径规划和路径绘制
  const _myPath = new TMap.MultiPolyline({
        id: 'polyline-layer' + randomStr, //图层唯一标识
        map, //绘制到目标地图
        //折线样式定义
        styles: { },
        //折线数据定义
        geometries: [
          {
            id: 'pl_1', //折线唯一标识，删除时使用
            styleId: 'style_blue', //绑定样式名
            paths: pl,
          },
        ],
      })
// 3、更新地图的中心点位上门小哥当前的位置信息
   function changeMapCenter(lat: number, lng: number) {
    const newCenter = new TMap.LatLng(lat, lng);
    map.setCenter(newCenter);
  }
// 4、标出小哥当前的位置
new TMap.MultiMarker
_addMarker({
      lat: props.doormanLocation.lat,
      lng: props.doormanLocation.lng,
      content: `
        <div>
          <p>上门时间： ${moment(new Date().getTime()).format('YYYY-MM-DD HH:mm:ss')}</p>
          <p>上门地址： ${props.doormanLocation.address}</p>
        </div>
      `,
      src: 'https://pic4.zhuanstatic.com/zhuanzh/77ea3d91-8ef7-49b0-a827-48bc2b3092ea.png',
    })
```



##### 折线图封装

后台中的图标样式基本上都一样，所以进行了封装，直接将接口中的数据丢进去就行。

```js
import { Line } from '@ant-design/plots'
import React from 'react'

interface LineProps {
  data: any
}

const LineComp: React.FC<LineProps> = (props) => {
  let data = props.data

  // 找出最大值和最小值
  const maxVal = Math.max(...data.map((item: any) => item.value))
  const minVal = Math.min(...data.map((item: any) => item.value))

  const computedPadding = () => {
    return [18, props.data.length > 7 ? 50 : 24]
  }

  const config = {
    data,
    // padding: [18, 12, 18, 26], // 上 右 下 左 的内边距
    // padding: [18, 18], // 上 右 下 左 的内边距
    padding: computedPadding(), // 上 右 下 左 的内边距
    xField: 'date',
    yField: 'value',
    xAxis: {
      tickLine: null, // 不显示轴上的刻度线
      line: null, // 不显示轴线
      // 配置 X 轴标签
      label: {
        // 可以通过 formatter 自定义标签的显示格式
        formatter: (text: any, item: any, index: any) => {
          // 只显示第一个和最后一个标签
          if (index === 0 || index === data.length - 1) {
            return text
          }
          return ''
        },
      },
    },
    yAxis: {
      visible: false, // 隐藏 Y 轴
      grid: {
        visible: false,
      },
    },
    area: {
      visible: true, // 显示区域填充
      style: {
        fill: 'l(90) 0:#5B8FF9 1:#ffffff', // 从上到下的渐变
        fillOpacity: 0.1,
      },
    },
    point: {
      visible: true,
      shape: 'circle',
      style: (item: any) => {
        const isMaxOrMin = item.value === maxVal || item.value === minVal
        return {
          r: (isMaxOrMin && item.value !== 0) ? 2 : 0, // 只为最大值和最小值设置半径
          fill: isMaxOrMin ? 'white' : 'transparent',
          stroke: isMaxOrMin ? '#5B8FF9' : 'transparent',
          lineWidth: isMaxOrMin ? 2 : 0,
        }
      },
    },
    label: {
      visible: true,
      offset: -15, // 标签与点的垂直偏移量
      adjustColor: false, // 确保不会自动调整文本颜色
      style: {
        fill: '#666', // 字体颜色
        fontSize: 10,
        fontWeight: 'bold',
        textAlign: 'center',
        textBaseline: 'middle',
        // 背景样式
        background: {
          padding: [2, 4], // 文字周围的内边距，可适当调整
          fill: '#fff', // 背景填充颜色
          stroke: '#666', // 边框颜色
          radius: 2, // 边框圆角
        },
      },
      // 使用 formatter 来显示数据点的值
      formatter: (text: any, item: any) => {
        // item 参数代表数据点，其结构与 data 数组中的对象一致
        const isMaxOrMin = item._origin.value === maxVal || item._origin.value === minVal
        return isMaxOrMin ? `${item._origin.value === 0 ? '' : item._origin.value}` : ''
      },
    },
    tooltip: {
      visible: true, // 显示提示信息
    },
    line: {
      smooth: true, // 曲线平滑
    },
    smooth: true,
  }

  // @ts-ignore
  return <Line {...config} />
}

export default LineComp
```







##### 数据流



##### React Hooks





#### **zzCoder**


zzCoder 是一款旨在提高开发效率和体验的 VSCode 插件。它提供了对基础库（如移动端组件库 zzui、React 组件库 zant ui）的支持，统一团队的常用功能代码片段和页面模板，并具备翻译功能。此外，zzCoder 还集成了 AI 能力，包括代码生成、优化、重构、生成函数名称和添加测试等功能。AI 相关功能由基础支撑组使用 ollama 本地部署的 codegeex4-all-9b 模型提供服务支持。


1、使用 VSCode 提供的 API registerCompletionItemProvider 实现按下 <z- 触发组件提示，并配合 command 属性，在选中时自动进行组件的导入和使用。
2、通过配置 package.json 的 snippets 属性，支持在不同的文件类型中加载不同的代码片段，提高了代码的复用性和开发效率。
3、配置右键菜单执行命令，动态生成多个代码片段，简化了代码的创建过程，进一步提高了开发效率。
4、封装了 jsBridge 以实现 webview 和 vscode 之间的通信，允许代码生成后直接插入到 vscode，提高了开发体验
5、通过 WebviewViewProvider.resolveWebviewView API 在侧边栏打开 webview，方便快捷地访问和使用。
6、基于插件化实现翻译功能，增强了翻译能力的灵活性和可扩展性。

 

##### 难点

- 



##### CPU 和 GPU 有什么区别呢？ 为什么大模型需要依赖 GPU

CPU（中央处理器）和 GPU（图形处理器）是计算机中的两种关键组件，但它们在设计目标、结构和应用领域上存在显著差异。

**CPU 的特点：**

1. **通用性强**：CPU 被设计为能够处理各种不同类型的任务，适用于执行复杂的逻辑运算和决策。
2. **核心数量少，频率高**：传统的 CPU 拥有少量的高性能核心，运行频率较高，适合顺序处理任务。
3. **擅长串行计算**：CPU 在处理需要依次执行的任务时表现出色，但在大量并行计算方面效率较低。

**GPU 的特点：**

1. **并行计算能力强**：GPU 拥有大量的计算核心，可以同时处理成千上万的线程，适合大量并行运算。
2. **优化数据吞吐量**：GPU 设计旨在提高数据处理的吞吐量，特别是在处理图形和矩阵计算时表现优异。
3. **适合简单、重复的计算任务**：GPU 在执行大量相同或类似的计算时效率极高，例如矩阵乘法和向量运算。

**为什么大模型需要依赖 GPU：**

大模型，尤其是在深度学习和人工智能领域的模型，通常涉及大量的矩阵和向量运算。这些运算可以被分解为大量的简单、独立的计算任务，适合并行处理。

1. **加速训练过程**：GPU 的并行计算能力可以大幅提高模型训练的速度，将原本可能需要数周的训练时间缩短至几天甚至几小时。
2. **处理大规模数据**：大模型需要处理海量的数据集，GPU 的高带宽内存和快速数据传输能力使其能够高效地处理这些数据。
3. **支持复杂的计算操作**：GPU 能够高效地执行深度学习所需的大量矩阵和向量运算，这对于训练深层神经网络至关重要。
4. **软件生态支持**：许多深度学习框架（如 TensorFlow、PyTorch）都针对 GPU 进行了优化，提供了便捷的接口和工具，进一步提升了 GPU 的优势。



##### 内联推荐

```js
const provider: vscode.InlineCompletionItemProvider = {
    async provideInlineCompletionItems(document, position, context, token) {
        // 提供内联补全项的逻辑
    },
    handleDidShowCompletionItem(completionItem) {
        console.log('handleDidShowCompletionItem');
    },
    handleDidPartiallyAcceptCompletionItem(completionItem, info) {
        console.log('handleDidPartiallyAcceptCompletionItem');
    },
};

```



##### JSbridge

> 队列缓存消息



vscode 端

```js
// 开启监听
public startListen() {
  this.webview.onDidReceiveMessage((message: MessageType) => {
    console.log('收到来自 webview 的消息', message);

    // 找到需要调用的函数
    const fn = this.messageHandler[message.method]

    // 函数存在就调用
    if (fn && typeof fn === 'function') {
      fn(message)
    } else {
      showError(`该端未实现 ${message.method} 方法！`);
    }

  });
}

  /**
   * @description: 向 webview 发送消息
   * @param {string} method webview页面里面的方法名称，即需要调用 webview 页面里的哪个方法
   * @param {any} data 调用 webview 页面方法时传入的参数
   * @return {*}
   */
  public sendMsgToWebview(method: string, data?: any) {
    if (this.webview) {
      const msg: MessageType = {
        from: 'vscode',
        msgId: getMsgId(),
        method,
        data
      }
      this.webview.postMessage(msg);
    } else {
      console.log('sendMsgToWebview -- webview 不存在');
    }
  }
```



webview 端

```js
 /**
   * @description: 添加事件监听
   * @param {function} callback 事件监听处理函数
   * @return {*}
   */
  addListener(callback: (data: any) => void): void {
    const listener: EventListener = (event: any): void => {
      if (event.origin !== window.location.origin)
        return
      // 这里需要绑定 this ， 否则在 handleVscodeMsg 中无法使用 this.callbacks 获取到 callbacks
      callback.call(this, event)
    }

    window.addEventListener('message', listener)
    this.listeners.push({ callback, listener })
  }
  
/**
   * @description: 处理来自 vscode 插件的消息
   * @param {Event} event
   * @return {*}
   */
  handleVscodeMsg(event: Event) {
    console.log('来自 vscode 插件的消息-->event', event)
    // 监听 vscode 发来的消息， data 是约定好的数据结构
    const message = (event as any).data as MessageType

    // 只处理 vscode 插件发过来的 message 消息，防止不在vscode插件的 webview 中，window 上还有 acquireVsCodeApi 方法，这种情况一般不会出现
    if (message.from === 'vscode') {
      // 根据 msgId 获取到对应的回调函数，如果存在就执行
      // msgId 和对应的回调函数会在 callVscode 方法进行保存
      // this.callbacks[message.msgId]: webview 页面 主动调用 vscode 插件的方法
      // this.callbacks[message.method]: vscode插件主动调用 webview 页面上的方法
      const cb = this.callbacks[message.msgId] || this.callbacks[message.method]

      if (typeof cb === 'function') {
        try {
          cb(message.data)
        }
        catch (error) {
          console.log(`handleVscodeMsg: ${message.method} 调用失败`)
        }
        finally {
          delete this.callbacks[message.msgId]
        }
      }
      else {
        console.log(`handleVscodeMsg: ${message.msgId} 对应的回调函数不存在`)
        console.log('callbacks 列表', this.callbacks)
      }
    }
  }


  /**
   * @description: 向 vscode 插件发送消息
   * @param {string} method  需要调用 vscode 插件的方法名
   * @param {any} data 如果不是函数，就是传递给 vscode 插件方法的参数，否则就是回调函数
   * @param {Callback} cb 回调函数
   * @return {*}
   */
  callVscode(method: string, data?: any, cb?: Callback | CallbackWithReturnValue) {
    // 再次判断一下是否 vscode 插件的webview环境
    if (!this.vscode) {
      console.log(`当前不在 vscode 的 webview 中, 不进行 ${method} 事件的发送`)
      return
    }

    let _data = data
    let _cb = cb

    // data: 可能是个函数， 如果 data 是个函数，就不会有参数
    if (typeof data === 'function') {
      _cb = data
      _data = ''
    }

    // 获取 msgId
    const msgId = this.genMsgId()

    // 发送给 vscode 插件的消息
    const sendData: MessageType = {
      from: 'chat-gpt-web',
      msgId,
      method,
      data: _data,
    }

    // 保存一下 回调函数
    if (_cb) {
      this.callbacks[msgId] = _cb
    }

    console.log('已经保存的回调函数有: ', this.callbacks)
    console.log('webview发送给vscode的参数', sendData)

    if (this.vscode?.postMessage) {
      this.vscode?.postMessage(sendData)
    }
    else {
      console.log('vscode.postMessage is not a function')
    }
  }

```



vscode调用 webview 的方法

webview 会先注册方法

```js
// 在 vscode 插件中会调用该方法
function askGptInvscode(res: any) {
  console.log('askGptInvscode', res)
  if (needLogin.value) {
    $callVscode('showInfo', '请先登录！')
    return
  }
  // 更新 apikey
  updateSettings({ apiKey: res.apiKey })
  vscodeMsgType.value = res.type
  prompt.value = res.msg ?? ''
  handleSubmit()
}

$addVscodeCb('askGpt', askGptInvscode)
```





#### **账号信息爬取服务**


账号信息爬取服务是一个在用户授权下，通过用户提供的营地ID对王者营地进行数据抓取的服务。该服务主要提取用户账号下的资产信息，包括英雄数量、皮肤数量，并将这些数据与账号进行关联。此服务不仅解决了商品搜索不准确的问题，还提升了账号的真实性，并为验号报告提供了数据基础。服务成功上线后，为公司带来了显著的业务价值。


技术栈 ：Nodejs + Eggjs


1、分析王者营地APP，使用whistle进行抓包分析，获取个人信息接口及资产信息接口，并分析其数据结构。
2、设计设备信息资源池与token池，以及token过期预警机制，在请求时进行随机组合，生成请求信息，确保请求的多样性和安全性。
3、使用HTTP代理进行网络请求，隐藏真实IP地址，并设计请求失败的自动重试机制，提高请求的成功率和系统的稳定性。
4、封装域名检测中间件，只允许来自公司域名的访问，减少非法请求的数量，增强系统的安全性。
5、接入公司内部的普罗米修斯监控系统和企微告警平台，确保问题能够及时跟进和处理。
6、二次封装koa-ratelimit中间件，实现接口限流，每秒最多10次，防止代理请求过载。
7、使用 pm2 进行服务的部署和日志管理，确保服务的高可用性和日志的有效记录。





##### 难点





##### 流程



##### 域名检测

```js
// app/middleware/check_domain.js
module.exports = options => {
    return async function checkDomain(ctx, next) {
        const allowedDomains = options.domains;  // 从配置中读取允许的域名列表
        const requestDomain = ctx.host;  // 获取请求的域名

        if (allowedDomains.includes(requestDomain)) {
            await next();  // 如果请求的域名在允许的列表中，继续执行
        } else {
            ctx.status = 403;  // 不允许的域名，设置 HTTP 状态码为 403
            ctx.body = 'Access denied';  // 可以自定义拒绝访问的响应内容
        }
    };
};


// config/config.default.js
exports.middleware = ['checkDomain'];
exports.checkDomain = {
    domains: ['allowed-domain.com', 'another-domain.com'],  // 这里填写允许的域名列表
};
```



##### 限流

```js
// ratelimit.js
const rateLimit = require('koa-ratelimit');
const Redis = require('ioredis');

module.exports = (options, app) => {
  const db = new Redis(options.redis);
  return rateLimit({
    driver: 'redis',
    db: db,
    duration: 60000, // 限流的时间窗口，这里设置为 60 秒
    errorMessage: 'Sometimes You Just Have to Rate Limit.',
    id: (ctx) => ctx.ip,
    headers: {
      remaining: 'Rate-Limit-Remaining',
      reset: 'Rate-Limit-Reset',
      total: 'Rate-Limit-Total'
    },
    max: 100, // 60 秒内最多请求 100 次
  });
};


// app/router.js
const rateLimit = require('../middleware/ratelimit');
module.exports = app => {
  const { router, controller } = app;
  router.get('/api', rateLimit(app.config.ratelimit), controller.home.index);
};

```

##### 告警

```

```



##### 日志管理



## 其他问题



## 勇哥面试建议

> 对业务的思路上面

项目怎么弄出来的？ 怎么解决业务的痛点？如何实现？ 遇到了什么问题？怎么解决？沉淀了什么？ 反思了什么？如何验证了业务效果？



怎么做业务? 有哪些方案？ 



回答问题：

- 回答面试官的问题
- 优化、改进
- 自带出来其他的我问题



编程：

- 先思考、为什么在出这个提，先想好，想考察什么，再写
- 先思考好了，在写

- 规范
- 严谨
- 边界考虑
- 输入返回
- 思维方式
- 严谨、工整、合理、健壮、在优化
- 插入、边界的处理、输入和返回



hr 问原因：

职级：

生活压力：

1、签字费 没有签证费 

2、薪资

3、常规方案： 30%， 2-1， 我还是很想去字节这边， 40%

4、发展空间有限。想去更大的平台，同事推荐





回答面试官的问题，自带出来其他的我问题

优化、改进

面试官问的是什么？尤其是答案不一样什么？

比如： 数据不一致怎么看？

每个问题回答几个点，层层递进、包括思考

