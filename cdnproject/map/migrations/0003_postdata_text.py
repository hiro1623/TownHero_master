# Generated by Django 2.1.3 on 2019-10-10 22:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('map', '0002_auto_20191010_2009'),
    ]

    operations = [
        migrations.AddField(
            model_name='postdata',
            name='text',
            field=models.CharField(default=433, max_length=32),
            preserve_default=False,
        ),
    ]