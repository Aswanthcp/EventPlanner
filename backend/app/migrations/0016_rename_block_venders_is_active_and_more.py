# Generated by Django 4.2 on 2023-05-26 07:45

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0015_coordinator_is_active'),
    ]

    operations = [
        migrations.RenameField(
            model_name='venders',
            old_name='block',
            new_name='is_active',
        ),
        migrations.RemoveField(
            model_name='coordinator',
            name='block',
        ),
    ]