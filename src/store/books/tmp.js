// [GET_BOOKS](context) { //context.commit(ADD_BOOKS, book);
// FireBaseService.getBooks().once('value')
//   .then((data) => {
//     const books = [];
//     data.forEach((elem) => {
//       books.push({
//         id: elem.key,
//         el: elem.toJSON()
//       })
//     });
//     context.commit(ADD_BOOK, books);
//     //_____________________________________
//     //const obj = data.val();
//     // for (let key in obj) {
//     //   books.push({
//     //     id: key,
//     //   })
//     // }
//     //console.log(books);
//     // context.commit(ADD_BOOK, books);
//     //_____________________________________
//   })
//   .catch((error) => {
//     console.log(error)
//   })
// },
// [CREATE_BOOK](context, bookData) {
//
//   let hash = (+new Date).toString(36);
//   let fileName = hash +'_'+ bookData.file.name;
//   let metadata = {contentType: bookData.file.type};
//
//   let uploadTask = uploadRef.child(fileName).put(bookData.file, metadata);  // Storage
//
//   return new Promise((resolve, reject) => {
//     uploadTask.then((snapshot) => {
//       uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
//
//         booksRef.push({
//           name: bookData.name,
//           price: bookData.price,
//           image: {
//             name: fileName,
//             url: downloadURL
//           }
//         });
//
//         resolve(true);
//       });
//     });
//   }, error => {
//     reject(error);
//   });
// },







// createBooks(bookData) {
//
//   let hash = (+new Date).toString(36);
//   let fileName = hash +'_'+ bookData.file.name;
//   let metadata = {contentType: bookData.file.type};
//
//   let uploadTask = uploadRef.child(fileName).put(bookData.file, metadata);  // Storage
//
//   return new Promise((resolve, reject) => {
//     uploadTask.then((snapshot) => {
//       uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
//         resolve(true);
//
//         // booksRef.push({
//         //   name: bookData.name,
//         //   price: bookData.price,
//         //   image: {
//         //     name: fileName,
//         //     url: downloadURL
//         //   }
//         // })
//
//       });
//     });
//   }, error => {
//     reject(error);
//   });
// },




//============= tmp =================================>

// user.updateProfile({displayName: 'Sergyus Mes'});

// pictures.putString(image, `data_url`).then(function(snapshot) {
//   console.log('Uploaded a data_url string!');
//   var url = snapshot.downloadURL;
//  add it to firestore
// });






// async [DELETE_BOOK](context, data) {
//
//   if(data.key) {
//     FireBaseService.deleteBook(await data.key)
//   };
//
//   if(data.filename) {
//     FireBaseService.deleteFileStorage(await data.filename)
//   }
//
//   // return Promise.all([
//   //   FireBaseService.deleteBook(await data.key),
//   //   FireBaseService.deleteFileStorage(await data.filename)
//   // ]);
// }
