# Generated by Django 4.2 on 2023-05-08 09:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0002_remove_eventcoordinator_packages'),
    ]

    operations = [
        migrations.AlterField(
            model_name='eventcoordinator',
            name='price',
            field=models.DecimalField(decimal_places=2, max_digits=18),
        ),
    ]
