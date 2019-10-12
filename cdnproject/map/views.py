
import json
from . import models
from datetime import datetime
from django.http.response import HttpResponse
from django.contrib.auth.decorators import login_required
from django.shortcuts import render,redirect
from .forms import PostingForm
from .models import PostData
from .models import Locate



@login_required
def map_TownHero(request):
    #練習用
    form = PostingForm(request.POST,request.FILES)

    if request.method == 'POST':
        if form.is_valid():
            #print("test if(3)")
            post = PostData()
            post.purpose = form.cleaned_data['purpose']
            post.message = form.cleaned_data['message']
            post.pic = form.cleaned_data['pic']
            
            #post = form.save(commit=False)
            post.user = request.user

            
            PostData.objects.create(
                purpose=post.purpose,
                user=post.user,
                message = post.message,
                pic = post.pic,
            )

    context = {
        "forms":form,
        "posts":PostData.objects.all(),
        "location":models.Locate.objects.all(),
    }
    #ここまで
    return render(request, 'application.html',context)

def delete(request):
    if request.method == 'POST' and request.body:
        json_dict = json.loads(request.body)
        id = json_dict['id']
        post = PostData.objects.get(id=id)
    post.delete()
    return render(request, 'application.html')


def geo(request):
    if request.method == 'POST' and request.body:
        json_dict = json.loads(request.body)
        lat = json_dict['lat']
        lng = json_dict['lng']
        Locate.objects.create(lat=lat,lng=lng)

    return render(request, 'application.html')
