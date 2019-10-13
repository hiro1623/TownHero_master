from django.shortcuts import render
# Create your views here.
from django.contrib.auth import login
from django.http import HttpResponseRedirect
from django.contrib.auth.forms import UserCreationForm
from django.urls import reverse_lazy
from django.views import generic

class SignUpView(generic.CreateView):
  form_class = UserCreationForm
  success_url = reverse_lazy('mapApp:map_TownHero')
  template_name = 'accounts/signup.html'
  def form_valid(self,form):
    user = form.save() # formの情報を保存
    login(self.request, user) # 認証
    self.object = user 
    return HttpResponseRedirect(self.get_success_url()) # リダイレクト
