{
  ('use strict');

  const select = {
    templateOf: {
      bookList: '#template-book',
      bars: '.book__rating__fill',
    },

    books: {
      list: '.books-list',
      all: '.book__image',
      filters: '.filters',
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
        book.ratingBgc = thisApp.determineRatingBgc(book.rating);
        book.ratingWidth = book.rating * 10;
        const generateHTML = templates.bookList(book);
        const generatedDOM = utils.createDOMFromHTML(generateHTML);
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
      const favorites = document.querySelector(select.books.list);
      favorites.addEventListener('dblclick', function (event) {
        event.preventDefault();
        if (event.target.offsetParent.classList.contains('book__image')) {
          const dataId = event.target.offsetParent.getAttribute('data-id');
          if (dataId !== favoriteBooks[favoriteBooks.indexOf(dataId)]) {
            console.log(dataId);
            favoriteBooks.push(dataId);
            console.log(favoriteBooks);
            event.target.offsetParent.classList.add('favorite');
          } else {
            event.target.offsetParent.classList.remove('favorite');
            const indOfData = favoriteBooks.indexOf(dataId);
            favoriteBooks.splice(indOfData, 1);
            console.log(favoriteBooks);
          }
        }
      });

      /*const favorites = document.querySelectorAll(select.books.all);
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
      }*/

      thisApp.domFilter.addEventListener('click', function (event) {
        if (
          event.target.tagName == 'INPUT' &&
          event.target.attributes.type.nodeValue == 'checkbox' &&
          event.target.attributes.name.nodeValue == 'filter'
        ) {
          console.log(event.target.attributes.value.nodeValue);
        }
        if (event.target.checked) {
          thisApp.filters.push(event.target.attributes.value.nodeValue);
        } else {
          const findFilter = thisApp.filters.indexOf(
            event.target.attributes.value.nodeValue
          );
          thisApp.filters.splice(findFilter, 1);
        }
        console.log(thisApp.filters);
        thisApp.filterBooks();
      });
    },

    initFilters() {
      const thisApp = this;
      thisApp.filters = [];
      thisApp.domFilter = document.querySelector(select.books.filters);
    },

    filterBooks() {
      const thisApp = this;
      for (let book of thisApp.data.books) {
        let shouldBeHidden = false;
        for (const filter of thisApp.filters) {
          if (book.details[filter] == true) {
            shouldBeHidden = true;
            break;
          }
        }

        const bookId = document.querySelector(
          `.book__image[data-id="${book.id}"]`
        );

        if (shouldBeHidden) {
          bookId.classList.add('hidden');
        } else {
          bookId.classList.remove('hidden');
        }
      }
    },

    determineRatingBgc(rating) {
      if (rating < 6) {
        return 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
      }
      if (rating > 6 && rating <= 8) {
        return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      }
      if (rating > 8 && rating <= 9) {
        return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      }
      if (rating > 9) {
        return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
      }
    },

    init: function () {
      const thisApp = this;
      console.log('*** App starting ***');
      console.log('thisApp:', thisApp);
      console.log('templates:', templates);

      thisApp.initData();
      thisApp.initBookList();
      thisApp.initFilters();
      thisApp.initActions();
    },
  };

  app.init();
}
