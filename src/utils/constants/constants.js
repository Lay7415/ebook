import APPLICATIONS from '../../assets/icons/applications.svg'
import APPLICATION from '../../assets/icons/application.svg'
import SELLERS from '../../assets/icons/sellers.svg'
import SELLER from '../../assets/icons/seller.svg'
import USERS from '../../assets/icons/users.svg'
import USER from '../../assets/icons/user.svg'
import BOOKS from '../../assets/icons/books.svg'
import BOOK from '../../assets/icons/book.svg'
import ORANGESEARCH from '../../assets/icons/orangeSearchIcon.svg'
import SEARCH from '../../assets/icons/searchIcon.svg'
import ARRDOWN from '../../assets/icons/arrowdown.svg'

export const EBOOK_BREADCRUMBS = 'EBOOK_BREADCRUMBS'
export const EBOOKPERSONTOKEN = 'EbookUserToken'
export const EBOOKUSEROLE = 'EBOOK_USER_ROLE'

export const ROLES = {
   ADMIN: 'ADMIN',
   VENDOR: 'VENDOR',
   CLIENT: 'CLIENT',
}

export const SEARCH_VALUE_TYPE = {
   BOOK: 'BOOK',
   PUBLISHING_HOUSE: 'PUBLISHER',
   GENRE: 'GENRE',
   AUTHOR: 'AUTHOR',
}

export const LANGUAGES = {
   RUSSIAN: 'RUSSIAN',
   ENGLISH: 'ENGLISH',
   KYRGYZ: 'KYRGYZ',
}

export const TYPEOFBOOK = {
   ELECTRONICBOOK: 'ELECTRONIC_BOOK',
   PAPERBOOK: 'PAPER_BOOK',
   AUDIOBOOK: 'AUDIO_BOOK',
}

export const ROUTES = {
   HOME: '/admin',
   APPLICATIONS: '/admin/applications',
   SELLERS: '/admin/sellers',
   SEllERBYID: '/admin/sellers/:sellerId',
   USERS: '/admin/users',
   USERBYID: '/admin/users/:userId',
   ADD_BOOKS: '/admin/books/addBook',
   ADD_BOOKS_BY_ID: '/admin/books/addBook/:bookId',
   ADDBOOKS: '/admin/books/addBook',
   ADMIN_BOOK_PAGE_BY_ID: '/admin/bookpage/:bookById',
   ADMIN_BOOK_PAGE: '/admin/bookpage',
   ADMIN_BOOK_CRAT: '/admin/books',
   APPLICATION_BOOK: '/admin/application/book',
   APPLICATION_BOOK_BY_ID: '/admin/application/book/:bookById',
   VENDOR: '/vendor',
   VENDOR_AREA: '/vendor/vendorarea',
   VENDOR_BOOK_PAGE: '/vendor/bookpage',
   VENDOR_BOOK_PAGE_BY_ID: '/vendor/bookpage/:bookById',
   PROFILE_UPDATE: '/vendor/account-update',
   EDIT_BOOK: '/vendor/edit/book',
   EDIT_BOOK_BY_ID: '/vendor/edit/book/:bookById',
   ADD_BOOK: '/vendor/bookadd',
   PROFILE: '/vendor/profile',
   CLIENT: '/client',
   CLIENT_MAIN_PAGE: '/client/mainpage',
   SORT: '/client/sort',
   SORT_GENRE: '/client/sort/genre',
   SORT_GENRE_BY_GENRE_NAME: '/client/sort/genre/:genreId',
   SORT_AUTHOR: '/client/sort/author',
   SORT_AUTHOR_BY_AUTHORNAME: '/client/sort/author/:authorName',
   SORT_PUBLISHING_HOUSE: '/client/sort/publishing-house',
   SORT_PUBLISHING_HOUSE_BY_PUBLISHING_HOUSE_NAME:
      '/client/sort/publishing-house/:publicationName',
   CLIENT_BOOK_PAGE: '/client/bookpage',
   CLIENT_BOOK_PAGE_BY_ID: '/client/bookpage/:bookById',
   CART: '/client/cart',
   PROMO_CODE: '/client/promocode',
   USER_PROFILE: '/client/userprofile',
   PROFILE_HISTORY: '/client/profilehistory',
   BECOME_VENDOR: '/client/becomevendor',
   LOGIN: '/login',
   NO_ACCESS: '/noaccess',
   SIDE_DRAWER_DATA: [
      {
         route_Activeicon: APPLICATION,
         route_icon: APPLICATIONS,
         route_name: 'Заявки',
         route_path: '/admin/applications',
         activeKey: 'application',
      },
      {
         route_Activeicon: SELLER,
         route_icon: SELLERS,
         route_name: 'Продавцы',
         route_path: '/admin/sellers',
         activeKey: 'sellers',
      },
      {
         route_Activeicon: USER,
         route_icon: USERS,
         route_name: 'Пользователи',
         route_path: '/admin/users',
         activeKey: 'users',
      },
      {
         route_Activeicon: BOOK,
         route_icon: BOOKS,
         route_name: 'Книги',
         route_path: '/admin/books',
         activeKey: 'books',
      },
   ],
}
export const NAVICON = {
   APPLICATIONS,
   APPLICATION,
   SELLERS,
   SELLER,
   USERS,
   USER,
   BOOKS,
   BOOK,
   ARRDOWN,
}

export const SIDE = {
   App: 'application',
   Sell: 'sellers',
   User: 'users',
   Books: 'books',
}

export const Search = {
   orangeSearchIcon: ORANGESEARCH,
   searchIcon: SEARCH,
}

const IS_LOGIN = 'isLogin'
const IS_VENDOR = 'isVendor'
const IS_USER = 'isUser'
const NAME = 'name'
const EMAIL = 'email'
const PASSWORD = 'password'
const CONFIRMPASSWORD = 'confirmpassword'
const PHONE = 'phone'
const SURNAME = 'surname'
const PICTURE = 'PICTURE'
const IS_AUDIOBOOK = 'ISAUDIOBOOK'
const IS_PAPPERBOOK = 'ISPAPPERBOOK'
const IS_ELECTROBOOK = 'ISELECTROBOOK'

export {
   IS_LOGIN,
   IS_USER,
   IS_VENDOR,
   NAME,
   EMAIL,
   PASSWORD,
   CONFIRMPASSWORD,
   PHONE,
   SURNAME,
   PICTURE,
   IS_AUDIOBOOK,
   IS_PAPPERBOOK,
   IS_ELECTROBOOK,
}
