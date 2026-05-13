from django.urls import path
from .views import signup, login,tutorials_list,create_reminder,reminder_detail, get_discover_plants,get_single_plant, current_user, herbal_vault_list,herbal_vault_detail,daily_featured_herb,add_plant_journal,get_user_journals,delete_account,update_user, predict,daily_fun_fact, predict_universal, get_posts,create_post, like_post,add_comment

urlpatterns = [
    path('signup/', signup),
    path('login/', login),
    path('discover/', get_discover_plants),
    path('discover/<int:plant_id>/', get_single_plant),
    path('herbalVault/', herbal_vault_list),
    path('herbalVault/<int:herb_id>/', herbal_vault_detail),
    path('daily-featured-herb/', daily_featured_herb, name='featured_herb'),
    path('user/', current_user,),
    path("journal/add/", add_plant_journal),
    path("journal/", get_user_journals),
    path("delete-account/", delete_account),
    path('user/update/', update_user),
    path('predict/', predict),
    path('daily-fun-fact/', daily_fun_fact),
    path('predict-universal/', predict_universal),
    path('posts/', get_posts),
    path('posts/create/', create_post),
    path('like/', like_post),
    path('comment/', add_comment),
    path("reminders/", create_reminder),
    path("reminders/<int:pk>", reminder_detail),
    path("tutorials/",tutorials_list),
]
