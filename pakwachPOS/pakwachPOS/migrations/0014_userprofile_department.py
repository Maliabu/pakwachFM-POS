# Generated by Django 3.2.16 on 2024-07-25 14:15

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('pakwachPOS', '0013_department'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='department',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='pakwachPOS.department'),
            preserve_default=False,
        ),
    ]
