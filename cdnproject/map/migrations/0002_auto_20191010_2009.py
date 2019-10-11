# Generated by Django 2.1.3 on 2019-10-10 20:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('map', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='PostData',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('purpose', models.CharField(max_length=32)),
                ('message', models.TextField()),
                ('pic', models.ImageField(upload_to='')),
                ('latitude', models.DecimalField(decimal_places=6, default=0, max_digits=9, verbose_name='緯度')),
                ('longitude', models.DecimalField(decimal_places=6, default=0, max_digits=9, verbose_name='経度')),
                ('posted_at', models.DateTimeField(auto_now_add=True)),
                ('last_modify', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.DeleteModel(
            name='Article',
        ),
    ]