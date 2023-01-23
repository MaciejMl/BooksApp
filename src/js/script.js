{
  ('use strict');

  const select = {
    templateOf: {
      bookList: '#template-book',
    },

    books: {
      list: '.books-list',
      all: '.book__image',
      filters: '.filters',
    },
  };

  const classNames = {
    books: {
      favorite: 'favorite',
      hidden: 'hidden',
    },
  };

  const settings = {
    progressBar: {
      background1: 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)',
      background2: 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)',
      background3: 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)',
      background4: 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)',
    },
  };

  const templates = {
    bookList: Handlebars.compile(
      document.querySelector(select.templateOf.bookList).innerHTML
    ),
  };

  class BooksList {
    constructor() {
      const thisBookList = this;

      thisBookList.initData();
      thisBookList.renderBookList();
      thisBookList.initFilters();
      thisBookList.initActions();
    }

    initData() {
      const thisBookList = this;
      thisBookList.data = dataSource;
    }

    renderBookList() {
      const thisBookList = this;
      for (let book of thisBookList.data.books) {
        book.ratingBgc = thisBookList.determineRatingBgc(book.rating);
        book.ratingWidth = book.rating * 10;
        const generateHTML = templates.bookList(book);
        const generatedDOM = utils.createDOMFromHTML(generateHTML);
        const wrapper = document.querySelector(select.books.list);
        wrapper.appendChild(generatedDOM);
      }
    }

    initActions() {
      const thisBookList = this;
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
            event.target.offsetParent.classList.add(classNames.books.favorite);
          } else {
            event.target.offsetParent.classList.remove(
              classNames.books.favorite
            );
            const indOfData = favoriteBooks.indexOf(dataId);
            favoriteBooks.splice(indOfData, 1);
            console.log(favoriteBooks);
          }
        }
      });

      thisBookList.domFilter.addEventListener('click', function (event) {
        if (
          event.target.tagName == 'INPUT' &&
          event.target.attributes.type.nodeValue == 'checkbox' &&
          event.target.attributes.name.nodeValue == 'filter'
        ) {
          console.log(event.target.attributes.value.nodeValue);
        }
        if (event.target.checked) {
          thisBookList.filters.push(event.target.attributes.value.nodeValue);
        } else {
          const findFilter = thisBookList.filters.indexOf(
            event.target.attributes.value.nodeValue
          );
          thisBookList.filters.splice(findFilter, 1);
        }
        console.log(thisBookList.filters);
        thisBookList.filterBooks();
      });
    }

    initFilters() {
      const thisBookList = this;
      thisBookList.filters = [];
      thisBookList.domFilter = document.querySelector(select.books.filters);
    }

    filterBooks() {
      const thisBookList = this;
      for (let book of thisBookList.data.books) {
        let shouldBeHidden = false;
        for (const filter of thisBookList.filters) {
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
    }

    determineRatingBgc(rating) {
      if (rating < 6) {
        return settings.progressBar.background1;
      }
      if (rating > 6 && rating <= 8) {
        return settings.progressBar.background2;
      }
      if (rating > 8 && rating <= 9) {
        return settings.progressBar.background3;
      }
      if (rating > 9) {
        return settings.progressBar.background4;
      }
    }
  }

  const app = new BooksList();
}
