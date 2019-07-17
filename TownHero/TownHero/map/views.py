# Create your views here.

from datetime import datetime  # 追加する
from django.http.response import HttpResponse
from django.shortcuts import render

def hello_TownHero(request):
    return render(request, 'html/map.html')