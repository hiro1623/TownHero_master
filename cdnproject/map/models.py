from django.db import models

# Create your models here.
class PostData(models.Model):
    purpose = models.CharField(max_length=32)
    message = models.TextField()
    pic = models.ImageField(upload_to='photo')
    posted_at = models.DateTimeField(auto_now_add=True)
    last_modify = models.DateTimeField(auto_now=True)
    def __str__(self):
        return self.message

class Locate(models.Model):
    lat = models.DecimalField(u'緯度', max_digits=9, decimal_places=6, default=0)
    lng = models.DecimalField(u'経度', max_digits=9, decimal_places=6, default=0)
    def __str__(self):
        return self.lat