from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class PostData(models.Model):
    POST_CHOICE = (
        ('0','テストだよ'),
        ('1','テスト２号だよ')
    )
    purpose = models.CharField(
        max_length=10,
        choices=POST_CHOICE
    )
    #purpose = models.CharField(max_length=32)
    message = models.TextField()
    #pic = models.ImageField(upload_to='photo')
    pic = models.ImageField(
        upload_to='polls',
        verbose_name='添付ファイル',
    )
    posted_at = models.DateTimeField(auto_now_add=True)
    last_modify = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(User,verbose_name='ユーザー',on_delete=models.CASCADE)

    def __str__(self):
        return self.message

class Locate(models.Model):
    lat = models.DecimalField(u'緯度', max_digits=9, decimal_places=6, default=0)
    lng = models.DecimalField(u'経度', max_digits=9, decimal_places=6, default=0)
    def __str__(self):
        return self.lat