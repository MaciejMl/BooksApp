{
  ('use strict');

  const select = {
    templateOf: {
      bookList: '#template-book',
    },

    books: {
      list: '.books-list',
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

    init: function () {
      const thisApp = this;
      console.log('*** App starting ***');
      console.log('thisApp:', thisApp);
      //console.log('classNames:', classNames);
      //console.log('settings:', settings);
      console.log('templates:', templates);

      thisApp.initData();
      thisApp.initBookList();
    },
  };

  app.init();
}
