from . import models
import json
import uuid
from datetime import datetime
from django.http.response import HttpResponse
from django.contrib.auth.decorators import login_required
from django.shortcuts import render,redirect
from .forms import PostingForm
from .models import PostData
from .models import Locate
from django.http import Http404

#Token 
def set_submit_token(request):
    submit_token = str(uuid.uuid4())
    request.session['submit_token'] = submit_token
    return submit_token

def exists_submit_token(request):
    token_in_request = request.POST.get('submit_token')
    token_in_session = request.session.pop('submit_token', '')
    print("TokenRequest :: "+str(token_in_request))
    print("TokenSession :: "+str(token_in_session))
    if not token_in_request:
        return False
    if not token_in_session:
        return False

    return token_in_request == token_in_session


@login_required
def map_TownHero(request):
    submit_token = set_submit_token(request)
    print("Token1 :: "+str(submit_token))
    form = PostingForm(request.POST,request.FILES)
    context = {
        "forms":form,
        "submit_token":submit_token,
    }
    return render(request, 'application.html',context)

def post(request):
    if not exists_submit_token(request):
        return render(request, 'application.html')
    elif request.method == 'POST':
        form = PostingForm(request.POST,request.FILES)
        if form.is_valid():
            post = PostData()
            post.purpose = form.cleaned_data['purpose']
            post.message = form.cleaned_data['message']
            post.pic = form.cleaned_data['pic']
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
        "submit_token":submit_token,
    }
    return render(request, 'application.html', context)

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
