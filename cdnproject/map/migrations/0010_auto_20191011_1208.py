# Generated by Django 2.1.3 on 2019-10-11 12:08

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('map', '0009_auto_20191011_0052'),
    ]

    operations = [
        migrations.AddField(
            model_name='postdata',
            name='user',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='ユーザー'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='postdata',
            name='purpose',
            field=models.CharField(max_length=16),
        ),
    ]