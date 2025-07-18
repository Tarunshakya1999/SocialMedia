# Generated by Django 5.2.3 on 2025-07-13 17:58

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0005_alter_userprofile_age_and_more'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AlterField(
            model_name='commentmodel',
            name='fb',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='myapp.facebookmodel'),
        ),
        migrations.AlterField(
            model_name='commentmodel',
            name='tw',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='myapp.twittermodel'),
        ),
        migrations.AlterField(
            model_name='facebookmodel',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='facebook_posts', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='twittermodel',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='twitter_posts', to=settings.AUTH_USER_MODEL),
        ),
        migrations.CreateModel(
            name='ReactionModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('reaction', models.CharField(choices=[('like', 'Like'), ('dislike', 'Dislike')], max_length=10)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('fb_post', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='fb_reactions', to='myapp.facebookmodel')),
                ('tw_post', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='tw_reactions', to='myapp.twittermodel')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'unique_together': {('user', 'fb_post'), ('user', 'tw_post')},
            },
        ),
    ]
