
import json
from datetime import datetime
from django.http.response import HttpResponse
from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from . import models


@login_required
def map_TownHero(request):
    #練習用
    if request.method == 'POST':
        models.PostData.objects.create(
            purpose=request.POST["purpose"],
            message=request.POST["message"],
            pic=request.POST["pic"],
            user=request.user
        )
    context = {"posts":models.PostData.objects.all()}
    #ここまで
    return render(request, 'application.html',context)

def delete(request):
    if request.method == 'POST' and request.body:
        json_dict = json.loads(request.body)
        id = json_dict['id']
        post = models.PostData.objects.get(id=id)
    post.delete()
    return render(request, 'application.html')


def geo(request):
    if request.method == 'POST' and request.body:
        json_dict = json.loads(request.body)
        lat = json_dict['lat']
        lng = json_dict['lng']
        models.Locate.objects.create(lat=lat,lng=lng)

    return render(request, 'application.html')
