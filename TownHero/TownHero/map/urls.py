from django.conf.urls import url
from . import views
app_name = "TownHero"
urlpatterns = [
    url(r'^$', views.hello_TownHero, name='hello_TownHero'),
]
