from django.urls import path
from .views import signup, login, get_discover_plants,get_single_plant, current_user, herbal_vault_list,herbal_vault_detail,daily_featured_herb

urlpatterns = [
    path('signup/', signup),
    path('login/', login),
    path('discover/', get_discover_plants),
    path('discover/<int:plant_id>/', get_single_plant),
    path('herbalVault/', herbal_vault_list),
    path('herbalVault/<int:herb_id>/', herbal_vault_detail),
    path('daily-featured-herb/', daily_featured_herb, name='featured_herb'),


    path('user/', current_user, name='current_user'),
]
