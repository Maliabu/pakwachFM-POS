
import base64
import random
from .config import webconfig
from .models import AccountType, ProductCategory, Product, Receipt, Module, Department
from .helper.helper import Helper
from django.contrib.auth.models import User
import datetime


class AccountTypes:
    def __init__(self):
        self.help = Helper()

    def createAccountTypes(self, request, lang):
        type_name = request.data["type_name"]
        code_name = request.data["code_name"]
        description = request.data["description"]
        sort_value = request.data["sort_value"]
        is_default = request.data["is_default"]
        is_disabled = False
        account_type = AccountType.objects.create(
            type_name=type_name,
            code_name=code_name,
            description=description,
            sort_value=sort_value,
            is_default=is_default,
            is_disabled=is_disabled
        )
        account_type.save()
        accounttypeid = account_type.id
        if accounttypeid:
            return {
                "message": "Account Types added",
                "success": True
            }
        else:
            return {
                "message": "Account Types not added here",
                "success": False
            }


class ProductCategories:

    def __init__(self) -> None:
        pass

    def AddProductCategory(self, request, lang):
        name = request.data["name"]
        module = request.data["module"]
        product_category = ProductCategory.objects.create(
            name=name,
            module=Module(pk=int(module)),
        )
        product_category.save()
        product_category_id = product_category.id
        belonging = f'{module}{product_category_id}'
        product_category_specific = ProductCategory.objects.filter(pk=product_category_id)
        product_category_specific.update(
            belonging=belonging
        )
        productcategory = self.getProductCategoryById(
            lang, product_category_id
        )
        return productcategory

    def getProductCategoryById(request, lang, pid):
        product_category = ProductCategory.objects.filter(pk=pid)
        for category in product_category:
            return {
                "id": category.pk,
                "name": category.name,
                "belonging": category.belonging,
                "module": category.module.module_name,
                "created": category.created
            }

    def getAllProductCategories(request, lang):
        categories = []
        product_category = ProductCategory.objects.all()
        if len(product_category) != 0:
            for category in product_category:
                categories.append({
                    "id": category.pk,
                    "name": category.name,
                    "belonging": category.belonging,
                    "module": category.module.module_name,
                    "created": category.created
                })
            return categories
        else:
            return []

    def getInflowProductCategories(request, lang):
        categories = []
        product_category = ProductCategory.objects.all()
        if len(product_category) != 0:
            for category in product_category:
                if category.module.pk == 1:
                    categories.append({
                        "id": category.pk,
                        "name": category.name,
                        "belonging": category.belonging,
                        "module": category.module.module_name,
                        "created": category.created
                    })
            return categories
        else:
            return []

    def getOutflowProductCategories(request, lang):
        categories = []
        product_category = ProductCategory.objects.all()
        if len(product_category) != 0:
            for category in product_category:
                if category.module.pk == 0:
                    categories.append({
                        "id": category.pk,
                        "name": category.name,
                        "belonging": category.belonging,
                        "module": category.module.module_name,
                        "created": category.created
                    })
            return categories
        else:
            return []


class Products:
    def __init__(self) -> None:
        pass

    def addProduct(self, request, lang, cid, productt):
        userid = request.user.id
        name = productt["name"]
        unit_amount = productt["unit_amount"]
        quantity = productt["quantity"]
        status = "available"
        product = Product.objects.create(
            name=name,
            unit_amount=unit_amount,
            quantity=quantity,
            category=ProductCategory(pk=int(cid)),
            status=status,
            user=User(pk=int(userid))
        )
        product.save()
        productid = product.id
        belonging = f'{cid}{productid}'
        pproduct = Product.objects.filter(pk=int(productid))
        pproduct.update(
            belonging=belonging
        )
        products = self.getProductById(lang, productid)
        return products

    def getProductById(request, lang, pid):
        products = Product.objects.filter(pk=pid)
        for product in products:
            return {
                "id": product.pk,
                "user": product.user.pk,
                "name": product.name,
                "unit_amount": product.unit_amount,
                "quantity": product.quantity,
                "belonging": product.belonging,
                "category": product.category.name,
                "created": product.created
            }

    def deleteProductById(request, lang, pid):
        print(pid)
        products = Product.objects.filter(pk=pid)
        product = products.delete()
        return product

    def getAllCartProducts(request, lang):
        cart = []
        products = Product.objects.all()
        if len(products) != 0:
            for product in products:
                if product.status == "available":
                    # statuses are "available" or "checked"
                    cart.append({
                        "id": product.pk,
                        "name": product.name,
                        "user": product.user.pk,
                        "unit_amount": product.unit_amount,
                        "quantity": product.quantity,
                        "belonging": product.belonging,
                        "category": product.category.name,
                        "created": product.created
                    })
            return cart
        else:
            return []

    def getTotalSales(request, lang):
        cart = []
        products = Product.objects.all()
        if len(products) != 0:
            for product in products:
                if product.status == "checked":
                    total_amount = product.unit_amount * product.quantity
                    cart.append({
                        "id": product.pk,
                        "name": product.name,
                        "user": product.user.pk,
                        "unit_amount": product.unit_amount,
                        "quantity": product.quantity,
                        "total_amount": total_amount,
                        "belonging": product.belonging,
                        "category": product.category.name,
                        "created": product.created,
                        "year": product.created.strftime("%Y"),
                        "month": product.created.strftime("%b"),
                        "day": product.created.strftime("%d")
                    })
            return cart
        else:
            return []


class Receipts:

    def __init__(self) -> None:
        pass

    def createReceipt(self, request, lang):
        created = datetime.datetime.now()
        receipt = Receipt.objects.create(
            status="ready",
            created=created
        )
        receipt.save()
        receiptid = receipt.pk
        receiptt = self.getReceiptById(lang, receiptid)
        return receiptt

    def addReceipt(self, request, lang, receiptid):
        # get cart available products of this user
        userid = request.user.id
        cart = Products.getAllCartProducts(request, lang)
        for product in cart:
            # update status of products for user from available to checkout
            status = "checked"
            product = Product.objects.filter(user_id=int(userid), status="available")
            print(product)
            product.update(
                receipt=Receipt(pk=int(receiptid)),
                status=status
            )
        return product

    def UploadReceiptFile(self, request, lang, userid, fieldname, filename):
        # decode blob
        api_user = User.objects.get(pk=userid)
        name_id = api_user.first_name+str(random.random())
        output = fieldname+name_id+'.pdf'
        destination = open('media/file/'+output, 'wb+')
        for chunk in filename.chunks():
            if not chunk:
                print("empty")
            else:
                destination.write(chunk)
                destination.close()
        # output2 = base64.b64decode(filename, validate=True)
        # f = open('file.pdf', "wb+")
        # f.write(output2)
        # f.close()
        # print(output2)
        Receipt.objects.filter(user=User(pk=int(userid))).update(
            pdf=output
        )

    def getReceiptById(request, lang, rid):
        receipt = Receipt.objects.filter(pk=rid)
        for receiptt in receipt:
            return {
                "id": receiptt.pk,
                "status": receiptt.status,
                "created": receiptt.created
            }

    def getAllReceipts(request, lang):
        receipts = []
        receipt = Receipt.objects.all()
        if len(receipt) != 0:
            for receiptt in receipt:
                productts = []
                receipttid = receiptt.pk
                products = Product.objects.filter(receipt_id=int(receipttid))
                for product in products:
                    productts.append({
                        "id": product.pk,
                        "name": product.name,
                        "user": f"{product.user.first_name} {product.user.last_name}",
                        "role": product.user.userprofile.role,
                        "unit_amount": product.unit_amount,
                        "department": product.user.userprofile.department.name,
                        "quantity": product.quantity,
                        "belonging": product.belonging,
                        "category": product.category.name,
                        "created": product.created,
                    })
                receipts.append({
                    "id": receiptt.pk,
                    "cart": productts,
                    "user": productts[0]["user"],
                    "role": productts[0]["role"],
                    "department": productts[0]["department"],
                    "created": receiptt.created.strftime("%d %b %Y")
                })
            return receipts
        else:
            return []


class Departments:

    def __init__(self) -> None:
        pass

    def AddDepartment(self, request, lang):
        name = request.data["name"]
        deptType = ""
        if name != "Management":
            deptType = "Basic"
        else:
            deptType = "Admin"
        department = Department.objects.create(
            name=name,
            dept_type=deptType,
        )
        department.save()
        dept_id = department.id
        departments = self.getDepartmentById(
            lang, dept_id
        )
        return departments

    def getDepartmentById(request, lang, did):
        departments = Department.objects.filter(pk=did)
        for department in departments:
            return {
                "id": department.pk,
                "name": department.name,
                "created": department.created
            }

    def getAllDepartments(request, lang):
        departments = []
        department = Department.objects.all()
        if len(department) != 0:
            for dept in department:
                departments.append({
                    "id": dept.pk,
                    "name": dept.name,
                    "created": dept.created
                })
            return departments
        else:
            return []