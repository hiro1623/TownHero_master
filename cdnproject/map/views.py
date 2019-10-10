from django.shortcuts import render

# Create your views here.

from datetime import datetime
from django.http.response import HttpResponse
from django.contrib.auth.decorators import login_required
from django.shortcuts import render

@login_required
def hello_TownHero(request):
    return render(request, 'application.html')
