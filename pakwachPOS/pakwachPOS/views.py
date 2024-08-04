from django.shortcuts import HttpResponse
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from .user.users import Users
from .services import AccountTypes, Products, ProductCategories, Receipts, Departments
import json.decoder

_user = Users()
_accountType = AccountTypes()
_product = Products()
_categories = ProductCategories()
_receipt = Receipts()
_dept = Departments()

DEFAULT_LANG = "en"


class index(APIView):
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]
    http_method_names = ['get']

    def get(self, request, format=None):
        return HttpResponse("<h2>Invalid Entry point </h2>")


class GetUserView(APIView):
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]
    http_method_names = ['get']

    def get(self, request, lang, format=None):
        content = {
            'user': str(request.user),  # `django.contrib.auth.User` instance.
            'auth': str(request.auth),  # None
        }
        return Response(content)


class CreateUserAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'email': user.email
        })


class AddAccountTypes(ObtainAuthToken):
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]
    http_method_names = ['post']

    def post(self, request, lang, *args, **kwargs):
        lang = DEFAULT_LANG if lang is None else lang
        type_name = request.data["type_name"]
        code_name = request.data["code_name"]
        description = request.data["description"]
        sort_value = request.data["sort_value"]
        is_default = request.data["is_default"]
        ##########################
        if not type_name:
            return Response({
                'message': "This field is required",
                "type": "type_name",
                'success': False
            })
        elif not code_name:
            return Response({
                'message': "This field is required",
                "type": "code_name",
                'success': False
            })
        elif not description:
            return Response({
                'message': "This field is required",
                "type": "description",
                'success': False
            })
        elif not sort_value:
            return Response({
                'message': "This field is required",
                "type": "sort_value",
                'success': False
            })
        elif not is_default:
            return Response({
                'message': "This field is required",
                "type": "is_default",
                'success': False
            })
        else:
            account_type = _accountType.createAccountTypes(request, lang)
            if account_type["success"] is True:
                return Response({
                    "message": "Account Types added successfully",
                    "success": True
                })
            else:
                return Response({
                    "message": "Account Types not added",
                    "success": False
                })


class IsVerified(APIView):
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]
    http_method_names = ['get']

    def get(self, request, lang):
        is_verified = request.user.userprofile.is_verified
        if is_verified is True:
            return Response({
                "message": "User is verified",
                "success": True
            })
        else:
            return Response({
                "message": "User is not verified",
                "success": False
            })


class AddProduct(APIView):
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]
    http_method_names = ['post']

    def post(self, request, lang):
        products = request.data
        if len(products) <= 0:
            return Response({
                "message": "No products in this databse",
                "success": False
            })
        else:
            for product in products:
                if not product["name"]:
                    return Response({
                        "message": "Product should have a name",
                        "success": False,
                        "type": "product name"
                    })
                elif not product["unit_amount"]:
                    return Response({
                        "message": "Product should have a unit value",
                        "success": False,
                        "type": "unit amount"
                    })
                elif not product["quantity"]:
                    return Response({
                        "message": "quantity is required",
                        "success": False,
                        "type": "product quantity"
                    })
                elif not product["cid"]:
                    return Response({
                        "message": "category is required",
                        "success": False,
                        "type": "product category"
                    })
                else:
                    _product.addProduct(request, lang, product["cid"], product)
            return Response(products)


class AddProductCategory(APIView):
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]
    http_method_names = ['post']

    def post(self, request, lang):
        name = request.data["name"]
        module = request.data["module"]
        if not name:
            return Response({
                "message": "Product should have a name",
                "success": False,
                "type": "product name"
            })
        elif not module:
            return Response({
                "message": "Categories should have a module",
                "success": False,
                "type": "module"
            })
        else:
            category = _categories.AddProductCategory(request, lang)
            return Response(category)


class GetAllProductCategories(APIView):
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]
    http_method_names = ['get']

    def get(self, request, lang):
        categories = _categories.getAllProductCategories(lang)
        return Response(categories)


class GetInflowProductCategories(APIView):
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]
    http_method_names = ['get']

    def get(self, request, lang):
        categories = _categories.getInflowProductCategories(lang)
        return Response(categories)


# has no categories so add an outflow category
class GetOutflowProductCategories(APIView):
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]
    http_method_names = ['get']

    def get(self, request, lang):
        categories = _categories.getOutflowProductCategories(lang)
        return Response(categories)


class GetAllCartProducts(APIView):
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]
    http_method_names = ['get']

    def get(self, request, lang):
        products = _product.getAllCartProducts(lang)
        return Response(products)


class DeleteProduct(APIView):
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]
    http_method_names = ['post']

    def post(self, request, lang):
        print(request.data)
        productid = request.data
        products = _product.deleteProductById(lang, productid)
        return Response(products)


class GetTotalSales(APIView):
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]
    http_method_names = ['get']

    def get(self, request, lang):
        products = _product.getTotalSales(lang)
        return Response(products)


class AddReceipt(APIView):
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]
    http_method_names = ['get']

    def get(self, request, lang):
        receipt = _receipt.createReceipt(request, lang)
        receiptid = receipt["id"]
        _receipt.addReceipt(request, lang, receiptid)
        return Response({
            "message": "products updated",
            "success": True,
            "type": "receipt"
        })


class GetAllReceipts(APIView):
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]
    http_method_names = ['get']

    def get(self, request, lang):
        receipts = _receipt.getAllReceipts(lang)
        return Response(receipts)


class AddDepartment(APIView):
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]
    http_method_names = ['post']

    def post(self, request, lang):
        name = request.data["name"]
        if not name:
            return Response({
                "message": "Product should have a name",
                "success": False,
                "type": "product name"
            })
        else:
            department = _dept.AddDepartment(request, lang)
            return Response(department)


class GetAllDepartments(APIView):
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]
    http_method_names = ['get']

    def get(self, request, lang):
        departments = _dept.getAllDepartments(lang)
        return Response(departments)