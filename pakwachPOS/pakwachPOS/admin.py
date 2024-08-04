from django.contrib import admin
from .models import Module, SideMenu, DashboardMenu, NavigationMenu, UserType, UserProfile, Currency, TimeZone, SupportedCountry, SupportedLanguage
# Register your models here.
admin.site.register(SupportedLanguage)
admin.site.register(SupportedCountry)
admin.site.register(Currency)
admin.site.register(TimeZone)
admin.site.register(UserProfile)
admin.site.register(UserType)
admin.site.register(Module)
admin.site.register(SideMenu)
admin.site.register(DashboardMenu)
admin.site.register(NavigationMenu)
