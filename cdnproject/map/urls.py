from django.conf.urls import url
from django.urls import path
from . import views
app_name = "mapApp"
urlpatterns = [
    path('', views.map_TownHero, name='map_TownHero'),
    path('geo/', views.geo, name='geo'),
]
