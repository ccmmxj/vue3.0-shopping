// import Mock from 'mockjs'
//
// Mock.mock('/api/menuList', {
//   success: true,
//   message: '',
//   title: '',
//   result: {
//     'menuList':
//       [{
//         name: '@ctitle(3,5)',
//         'parentId|1-10': 10,
//         active: true,
//         url: '',
//         'childs':
//           [{
//             name: '上传卡片',
//             'parentId|1-10': 10,
//             url: '/shopme/manage/main/card'
//           },
//           {
//             name: '生成二维码',
//             'parentId|1-10': 10,
//             url: '/shopme/manage/main/qrcode'
//           },
//           {
//             name: '我的卡片',
//             'parentId|1-10': 10,
//             url: '/shopme/manage/main/myCard'
//           }]
//       },
//       {
//         name: '@ctitle(3,5)',
//         'parentId|1-10': 10,
//         active: false,
//         url: '',
//         'childs':
//           [{
//             name: '@ctitle(3,5)',
//             'parentId|1-10': 10,
//             url: '@url'
//           },
//           {
//             name: '@ctitle(3,5)',
//             'parentId|1-10': 10,
//             url: '@url'
//           }]
//       },
//       {
//         name: '@ctitle(3,5)',
//         'parentId|1-10': 10,
//         active: false,
//         url: '',
//         'childs':
//           [{
//             name: '@ctitle(3,5)',
//             'parentId|1-10': 10,
//             url: '@url'
//           },
//           {
//             name: '@ctitle(3,5)',
//             'parentId|1-10': 10,
//             url: '@url'
//           }]
//       }]
//   }
// })
//
// Mock.mock('/api/login', {
//   success: true,
//   message: '',
//   title: '',
//   result: {
//     'user':
//       {
//         name: '@ctitle(2,5)',
//         'age|1-100': 100
//       }
//   }
// })
//
// Mock.mock('/upload/img', {
//   success: true,
//   message: '',
//   title: '',
//   result: 'http://edu.ccmmxj.club:8081/upload/img/3.jpg'
// })
//
// Mock.mock('/upload/audio', {
//   success: true,
//   message: '',
//   title: '',
//   result: 'http://edu.ccmmxj.club:8081/upload/audio/3.mp3'
// })
//
// Mock.mock('/manage/addCode', {
//   success: true,
//   message: '添加成功',
//   title: '卡片',
//   result: {
//     type: 'chinese',
//     content: 'test',
//     imgUrl: 'testUrl'
//   }
// })
//
// Mock.mock('/web/getList', {
//   success: true,
//   message: '获取成功',
//   title: '卡片',
//   result: [{
//     id: 0,
//     type: 'chinese',
//     content: 'test',
//     imgUrl: 'testUrl'
//   },
//   {
//     id: 1,
//     type: 'chinese',
//     content: 'test',
//     imgUrl: 'testUrl'
//   },
//   {
//     id: 2,
//     type: 'chinese',
//     content: 'test',
//     imgUrl: 'testUrl'
//   }]
// })
//
// Mock.mock('/web/getListchinese', {
//   success: true,
//   message: '获取成功',
//   title: '卡片',
//   result: [{
//     id: 0,
//     type: 'chinese',
//     content: '1-1',
//     imgUrl: 'http://edu.ccmmxj.club:8081/img/3.jpg'
//   },
//   {
//     id: 1,
//     type: 'chinese',
//     content: 'test2',
//     imgUrl: 'http://edu.ccmmxj.club:8081/img/3.jpg'
//   },
//   {
//     id: 2,
//     type: 'chinese',
//     content: 'test',
//     imgUrl: 'http://edu.ccmmxj.club:8081/img/3.jpg'
//   }]
// })
//
// Mock.mock('/web/getListenglish', {
//   success: true,
//   message: '获取成功',
//   title: '卡片',
//   result: [{
//     id: 0,
//     type: 'english',
//     content: 'englisht',
//     imgUrl: 'http://edu.ccmmxj.club:8081/img/3.jpg'
//   },
//   {
//     id: 1,
//     type: 'english',
//     content: 'english',
//     imgUrl: 'http://edu.ccmmxj.club:8081/img/3.jpg'
//   },
//   {
//     id: 2,
//     type: 'english',
//     content: 'english',
//     imgUrl: 'http://edu.ccmmxj.club:8081/img/3.jpg'
//   }]
// })
//
// Mock.mock('/web/getCode', {
//   success: true,
//   message: '获取成功',
//   title: '卡片',
//   result: {
//     id: 1,
//     type: 'english',
//     content: 'englisht',
//     imgUrl: 'http://edu.ccmmxj.club:8081/upload/img/3.jpg',
//     audioUrl: 'http://edu.ccmmxj.club:8081/upload/audio/3.mp3'
//   }
// })
