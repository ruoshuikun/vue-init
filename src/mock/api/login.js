import Mock from '../utils/mock'

//注册

//登录
Mock.mock('/devApi/getSms/', 'post', (options) => {
  return {
    resCode: 0,
    data: null,
    message: '验证码已发送，验证码：26tqej',
  }
})

//获取验证码
Mock.mock('/devApi/login/', 'post', (options) => {
  return {
    resCode: 0,
    data: {
      username: 'ao@jz.com',
      token: 'b358a8a296f8277ceb921cfd67e3cc91',
    },
    username: 'ao@jz.com',
    token: 'b358a8a296f8277ceb921cfd67e3cc91',
    message: '登录成功！！',
  }
})

//获取用户角色
Mock.mock('/devApi/userRole/', 'post', (options) => {
  return { resCode: 0, data: ['admin'], message: 'OK' }
})

// 范例
// Mock.mock('/devApi/getSms/', 'post', options => {
//   let { params } = options; // options对象包含请求的 url，类型和携带的参数
//   if (params.username && params.password) {
//     return {
//       resCode: 0,
//       data: null,
//       message:
//         '\u9a8c\u8bc1\u7801\u5df2\u53d1\u9001\uff0c\u9a8c\u8bc1\u7801\uff1a mockin'
//     };
//   } else {
//     return {
//       data: '',
//       code: 300,
//       message: '账号或密码未输入'
//     };
//   }
// });
