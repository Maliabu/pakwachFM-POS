"""pakwachPOS URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
import importlib
from django.conf.urls.static import static
from django.conf import settings
from . import views
from .user import userViews as user_view
from .uploading import uploadView

# user_view = importlib.import_module(f'{"user.usersViews"}')
# only use f-string with variables

urlpatterns = [
    path('admin/', admin.site.urls),
    path('<lang>/register/user/', user_view.CreateAuthUser.as_view(), name="register-user"),
    path('<lang>/register/api/user/',
         user_view.CreateApiUser.as_view(), name="register-api-user"),
    path('<lang>/get/user/verification/',
         user_view.IsUserVerified.as_view(), name="get-user-verification"),
    path('<lang>/get/verification/',
         views.IsVerified.as_view(), name="get-verification"),
    path('<lang>/resend/verification/email/',
         user_view.ResendVerificationEmail.as_view(), name="resend-verification-email"),
    path('<lang>/auth/user/login/',
         user_view.LoginUserAuthToken.as_view(), name="login-user"),
    path('<lang>/auth/token/',
         views.CreateUserAuthToken.as_view(), name="create-user-token"),
    path('<lang>/auth/user/',
         user_view.GetAuthUser.as_view(), name="get-auth-user"),
    path('<lang>/admin/user/',
         user_view.GetAdminUser.as_view(), name="get-admin-user"),
    path('<lang>/nonadmin/user/',
         user_view.GetNonAdminUser.as_view(), name="get-non-admin-user"),
    path('<lang>/auth/user/email/',
         user_view.GetAuthUserByEmail.as_view(), name="get-auth-user-by-email"),
    path('<lang>/auth/user/<int:userid>/',
         user_view.GetAuthUserById.as_view(), name="get-auth-user-by-id"),
    path('<lang>/auth/users/all/',
         user_view.GetAllUsers.as_view(), name="get-all-users"),
    path('<lang>/auth/users/emails/all/',
         user_view.GetAllUsersEmails.as_view(), name="get-all-users-emails"),
    path('<lang>/auth/user/upload/profile/photo/',
         uploadView.UploadPhoto.as_view(), name="upload-photo"),
    path('<lang>/auth/user/id/upload/profile/photo/',
         uploadView.UploadPhotoById.as_view(), name="upload-user-photo"),
    path('<lang>/auth/user/account/type/',
         views.AddAccountTypes.as_view(), name="add-account-types"),
    path('<lang>/auth/user/update/password/',
         user_view.UpdateAuthUserPassword.as_view(), name="update-user-password"),
    path('<lang>/password/reset/',
         user_view.InitPasswordReset.as_view(), name="password-reset"),
    path('<lang>/email/verify/<userid>/', user_view.verifyAccount.as_view(), name="email-verify"),
    path('<lang>/auth/user/delete/', user_view.DeleteUserAccount.as_view(), name="delete-user-account"),
    path('<lang>/add/product/category/', views.AddProductCategory.as_view(), name="add-product-category"),
    path('<lang>/get/product/category/', views.GetAllProductCategories.as_view(), name="get-product-category"),
    path('<lang>/add/department/', views.AddDepartment.as_view(), name="add-department"),
    path('<lang>/get/departments/', views.GetAllDepartments.as_view(), name="get-department"),
    path('<lang>/get/inflow/product/category/', views.GetInflowProductCategories.as_view(), name="get-inflow-product-category"),
    path('<lang>/get/outflow/product/category/', views.GetOutflowProductCategories.as_view(), name="get-outflow-product-category"),
    path('<lang>/add/product/', views.AddProduct.as_view(), name="add-product"),
    path('<lang>/delete/product/', views.DeleteProduct.as_view(), name="delete-product"),
    path('<lang>/get/cart/products/', views.GetAllCartProducts.as_view(), name="get-cart-products"),
    path('<lang>/get/total/sales/', views.GetTotalSales.as_view(), name="get-sales"),
    path('<lang>/print/receipt/', views.AddReceipt.as_view(), name="print-receipt"),
    path('<lang>/get/all/receipts/', views.GetAllReceipts.as_view(), name="get-all-receipts")
]
urlpatterns = urlpatterns + \
    static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
