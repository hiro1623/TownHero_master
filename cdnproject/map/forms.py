from django import forms
from .models import PostData
from django.contrib.auth.models import User

POST_CHOICE = (
    ('0','テストだよ'),
    ('1','テスト２号だよ')
)
class PostingForm(forms.Form):

        message = forms.CharField(
            label='メッセージ',
            max_length=200,
            required=True,
            widget=forms.Textarea(
                attrs={'rows':5,'placeholder':'What is on your mind?'}
            )
        )
        purpose = forms.ChoiceField(
            label='投稿の種類',
            widget=forms.Select,
            choices = POST_CHOICE,
            required=True,
        )
        pic = forms.ImageField(
            label='写真',
        )
