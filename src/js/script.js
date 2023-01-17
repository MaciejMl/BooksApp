{
  ('use strict');

  const select = {
    templateOf: {
      bookList: '#template-book',
    },

    books: {
      list: '.books-list',
      all: '.book__image',
    },
  };

  const templates = {
    bookList: Handlebars.compile(
      document.querySelector(select.templateOf.bookList).innerHTML
    ),
  };

  const app = {
    initBookList() {
      const thisApp = this;
      for (let book of thisApp.data.books) {
        const generateHTML = templates.bookList(book);
        generatedDOM = utils.createDOMFromHTML(generateHTML);
        const wrapper = document.querySelector(select.books.list);
        wrapper.appendChild(generatedDOM);
      }
    },

    initData: function () {
      const thisApp = this;
      thisApp.data = dataSource;
    },

    initActions() {
      const thisApp = this;
      let favoriteBooks = [];

      const favorites = document.querySelectorAll(select.books.all);
      for (const favorite of favorites) {
        const dataId = favorite.getAttribute('data-id');

        favorite.addEventListener('dblclick', function (event) {
          event.preventDefault();
          //(!favorite.classList.contains('favorite'))
          //(dataId !== favoriteBooks[favoriteBooks.indexOf(dataId)])
          if (dataId !== favoriteBooks[favoriteBooks.indexOf(dataId)]) {
            console.log(dataId);
            favoriteBooks.push(dataId);
            console.log(favoriteBooks);
            favorite.classList.add('favorite');
          } else {
            favorite.classList.remove('favorite');
            indOfData = favoriteBooks.indexOf(dataId);
            favoriteBooks.splice(indOfData, 1);
            console.log(favoriteBooks);
          }
        });
      }
    },

    init: function () {
      const thisApp = this;
      console.log('*** App starting ***');
      console.log('thisApp:', thisApp);
      //console.log('classNames:', classNames);
      //console.log('settings:', settings);
      console.log('templates:', templates);

      thisApp.initData();
      thisApp.initBookList();
      thisApp.initActions();
    },
  };

  app.init();
}
