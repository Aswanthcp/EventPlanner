# Generated by Django 4.2 on 2023-05-23 19:03

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0010_itemuserrend'),
    ]

    operations = [
        migrations.AddField(
            model_name='itemuserrend',
            name='event',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='app.eventcoordinator'),
        ),
        migrations.AlterField(
            model_name='itemuserrend',
            name='item',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='app.item'),
        ),
    ]