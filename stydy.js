// foo: for (let i = 0; i < 4; i++) {
//   for (let a = 0; a < 4; a++) {
//     if ((i * a) >= 2) {
//       console.log('stop',i,a)
//       break foo
//     }
//     console.log(i,a)
//   }

// }

// foo: for (let i = 0; i < 4; i++) {
//   foo2: for (let a = 0; a < 4; a++) {
//     if (i === a) {
//       continue foo
//     }
//     console.log(i, a)
//   }

// }

// function a({ id, ...all }) {
//   console.log(...arguments)
//   console.log(id)
//   console.log(all)
// }
// a({id:4,name:'zhangsan'})

const a = 'hello'
const b = 10
// console.log((a || b === 10))
// console.log(!(a || b === 10))
// console.log(!!(a || b === 10))
foo1: switch(true) {
  case (a || b === 10):
    console.log('true')
    break foo1;
  default: 
    console.log('defult')
}