# Generated by Django 4.2 on 2023-06-10 10:52

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0027_eventuserbook_date_bookedto'),
    ]

    operations = [
        migrations.AddField(
            model_name='itemuserrent',
            name='date_bookedto',
            field=models.DateField(default=django.utils.timezone.now),
        ),
    ]