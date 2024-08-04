from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
# make sure you have a migrations folder with __init__.py file before making migrations

class SupportedLanguage(models.Model):
    lang_name = models.CharField(max_length=255)
    lang_iso_code = models.CharField(max_length=255)
    is_default = models.BooleanField(default=False)
    is_disabled = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "%s" % self.lang_name

#######################################


class SupportedCountry(models.Model):
    coutry_name = models.CharField(max_length=255)
    coutry_flag = models.CharField(max_length=255)
    country_code = models.CharField(max_length=255)
    is_default = models.BooleanField(default=False)
    is_disabled = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "%s" % self.coutry_name


class TimeZone(models.Model):
    country = models.ForeignKey(
        SupportedCountry, on_delete=models.CASCADE, null=True, blank=True
    )
    dispaly_name = models.CharField(max_length=255)
    code_name = models.CharField(max_length=255)
    is_default = models.BooleanField(default=False)
    is_disabled = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)
    has_been_modified = models.BooleanField(default=False)
    last_modified = models.DateTimeField()

    def __str__(self):
        return "%s" % self.dispaly_name


class UserType(models.Model):
    type_name = models.CharField(max_length=255)
    code_name = models.CharField(max_length=255)
    is_default = models.BooleanField(default=False)
    is_disabled = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "%s" % self.type_name


class Department(models.Model):
    name = models.CharField(max_length=255)
    dept_type = models.CharField(max_length=255)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "%s" % self.name


# User Profile
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    country = models.CharField(max_length=200, default="uganda", null=True)
    language = models.ForeignKey(
        SupportedLanguage, on_delete=models.CASCADE, null=True, blank=True
    )
    tmz = models.ForeignKey(TimeZone, on_delete=models.CASCADE, null=True, blank=True)
    role = models.CharField(max_length=255, null=True, blank=True)
    gender = models.CharField(max_length=255, null=True, blank=True)
    phoneno = models.CharField(max_length=255, null=True, blank=True)
    address = models.CharField(max_length=30, null=True, blank=True)
    verification_code = models.CharField(max_length=30, null=True, blank=True)
    birth_date = models.DateField(null=True, blank=True)
    profile_picture = models.ImageField(
        upload_to="profile", default="default_picture.jpg"
    )
    department = models.ForeignKey(Department, on_delete=models.CASCADE, null=True, blank=True)
    is_verified = models.BooleanField(default=False)
    is_deleted = models.BooleanField(default=True)
    is_disabled = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "%s" % self.user


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.userprofile.save()


class Currency(models.Model):
    country = models.ForeignKey(
        SupportedCountry, on_delete=models.CASCADE, null=True, blank=True
    )
    currency_locale = models.CharField(max_length=255)
    currency_code = models.CharField(max_length=255)
    currency_symbol = models.CharField(max_length=255)
    exchange_rate = models.FloatField(max_length=500)
    is_indented = models.BooleanField(default=False)
    is_infront = models.BooleanField(default=True)
    decimal_points = models.IntegerField(default=2)
    is_default = models.BooleanField(default=False)
    is_disabled = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "%s" % self.currency_locale


# Main Application Modules


class Module(models.Model):
    module_name = models.CharField(max_length=255)
    code_name = models.CharField(max_length=255)
    route_name = models.CharField(max_length=255)
    is_a_sub_module = models.BooleanField(default=False)
    has_children = models.BooleanField(default=False)
    main_module_id = models.IntegerField(null=True, blank=True)
    sort_value = models.IntegerField()
    depth = models.IntegerField()
    is_disabled = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "%s" % self.module_name


class ProductCategory(models.Model):
    module = models.ForeignKey(Module, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    belonging = models.CharField(max_length=255)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "%s" % self.name


class Receipt(models.Model):
    status = models.CharField(default="checked", max_length=200)
    # pdf = models.FileField(upload_to="file", verbose_name="pdf-doc")
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "%s" % self.product


class Product(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    category = models.ForeignKey(
        ProductCategory, on_delete=models.CASCADE, null=True, blank=True
    )
    receipt = models.ForeignKey(Receipt, on_delete=models.CASCADE, null=True, blank=True)
    belonging = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    unit_amount = models.FloatField(max_length=500)
    quantity = models.IntegerField(default=0)
    status = models.CharField(default="available", max_length=200)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "%s" % self.name


# Side Menu Modules


class SideMenu(models.Model):
    module = models.ForeignKey(Module, on_delete=models.DO_NOTHING)
    sort_value = models.IntegerField()
    is_disabled = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "%s" % self.module


# Dashboard menu model


class DashboardMenu(models.Model):
    module = models.ForeignKey(Module, on_delete=models.DO_NOTHING)
    sort_value = models.IntegerField()
    is_disabled = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "%s" % self.module.module_name


class NavigationMenu(models.Model):
    module = models.ForeignKey(Module, on_delete=models.DO_NOTHING)
    sort_value = models.IntegerField()
    is_disabled = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "%s" % self.module.module_name


class AccountType(models.Model):
    type_name = models.CharField(max_length=200)
    code_name = models.CharField(max_length=200)
    description = models.CharField(max_length=200, null=True, blank=True)
    sort_value = models.IntegerField(default=0)
    is_default = models.BooleanField(default=False)
    is_disabled = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "%s" % self.type_name
