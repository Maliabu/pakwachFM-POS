// const server = "127.0.0.1:8000"
const server = "pakwachfm.com/server"

export const API_URL = "https://"+server+"/en/register/user/";
export const API_EMAIL_VERIFY = "https://"+server+"/en/get/user/verification/";
export const API_RESEND_VERIFICATION_EMAIL = "https://"+server+"/en/resend/verification/email/";
export const API_URL_USER_PROFILE_PHOTO = "https://"+server+"/en/auth/user/upload/profile/photo/";
export const API_URL_USER_ID_PROFILE_PHOTO = "https://"+server+"/en/auth/user/id/upload/profile/photo/";
export const API_URL_USER_GET_PROFILE_PHOTO = "https://"+server+"/static/photo.png";
export const API_URL_LOGIN = "https://"+server+"/en/auth/user/login/";
export const API_URL_GET_TOKEN = "https://"+server+"/en/auth/token/";
export const API_URL_GET_AUTH_USER = "https://"+server+"/en/auth/user/";
export const API_URL_GET_ADMIN_USER = "https://"+server+"/en/admin/user/";
export const API_URL_GET_NON_ADMIN_USER = "https://"+server+"/en/nonadmin/user/";
export const API_URL_REGISTER_API_USER = "https://"+server+"/en/register/api/user/";
export const API_URL_GET_AUTH_USER_BY_EMAIL = "https://"+server+"/en/auth/user/email/";
export const API_URL_GET_ALL_USERS = "https://"+server+"/en/auth/users/all/";
export const API_URL_USER_UPDATE_PASSWORD = "https://"+server+"/en/auth/user/update/password/";
export const API_URL_PASSWORD_RESET = "https://"+server+"/en/password/reset/";
export const API_URL_GET_USER_VERIFICATION = "https://"+server+"/en/get/verification/";
export const API_URL_RESET_PASSWORD = "https://"+server+"/reset/password/";
export const PROFILE_PHOTO = "https://"+server+"/media/profile/default_picture.jpg";
export const API_URL_ADD_PRODUCT = "https://"+server+"/en/add/product/";
export const API_URL_DELETE_PRODUCT = "https://"+server+"/en/delete/product/";
export const API_URL_PRINT_RECEIPT = "https://"+server+"/en/print/receipt/";
export const API_URL_GET_ALL_RECEIPTS = "https://"+server+"/en/get/all/receipts/";
export const API_URL_ADD_PRODUCT_CATEGORY = "https://"+server+"/en/add/product/category/";
export const API_URL_ADD_DEPARTMENT = "https://"+server+"/en/add/department/";
export const API_URL_GET_PRODUCT_CATEGORY = "https://"+server+"/en/get/product/category/";
export const API_URL_GET_DEPARTMENTS = "https://"+server+"/en/get/departments/";
export const API_URL_GET_INFLOW_PRODUCT_CATEGORY = "https://"+server+"/en/get/inflow/product/category/";
export const API_URL_GET_OUTFLOW_PRODUCT_CATEGORY = "https://"+server+"/en/get/outflow/product/category/";
export const API_URL_GET_CART_PRODUCTS = "https://"+server+"/en/get/cart/products/";
export const API_URL_GET_TOTAL_SALES = "https://"+server+"/en/get/total/sales/";
export const TOKEN = localStorage.getItem('token');
export const LOGIN_STATUS = localStorage.getItem('login-status');
export const TAB = 17;