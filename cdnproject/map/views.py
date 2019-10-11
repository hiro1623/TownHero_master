from django.shortcuts import render,redirect

# Create your views here.
import json
from datetime import datetime
from django.http.response import HttpResponse
from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from .models import PostData
from .models import Locate
from .forms import PostingForm
from django.contrib.auth.models import User



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
        #models.PostData.objects.create(
        #    purpose=request.POST["purpose"],
        #    message=request.POST["message"],
        #    pic=request.POST["pic"],
        #    user=request.user
        #)
        return redirect('mapApp:map_TownHero')
    #context = {"posts":models.PostData.objects.all()}
    #ここまで
    
    context = {
        'form': form,
    }
    return render(request, 'application.html',context)

def geo(request):
    if request.method == 'POST' and request.body:
        json_dict = json.loads(request.body)
        lat = json_dict['lat']
        lng = json_dict['lng']
        Locate.objects.create(lat=lat,lng=lng)

    return render(request, 'application.html')
