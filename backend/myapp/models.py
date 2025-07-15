from django.db import models
from django.contrib.auth.models import User

# Choices for reactions
REACTION_CHOICES = (
    ('like', 'Like'),
    ('dislike', 'Dislike'),
)

from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=254)
    phone_number = models.CharField(max_length=15)
    age = models.PositiveIntegerField()
    facebook_user_name = models.CharField(max_length=100)
    twitter_user_name = models.CharField(max_length=100)
    image = models.ImageField(upload_to='poster', blank=True, null=True)

    def __str__(self):
        return self.name

class FaceBookModel(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='facebook_posts')
    post_title = models.CharField(max_length=50)
    post = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.post_title

    def like_count(self):
        return self.fb_reactions.filter(reaction='like').count()

    def dislike_count(self):
        return self.fb_reactions.filter(reaction='dislike').count()


class TwitterModel(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='twitter_posts')
    post_title = models.CharField(max_length=50)
    post = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.post_title

    def like_count(self):
        return self.tw_reactions.filter(reaction='like').count()

    def dislike_count(self):
        return self.tw_reactions.filter(reaction='dislike').count()


class CommentModel(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    fb = models.ForeignKey(FaceBookModel, on_delete=models.CASCADE, null=True, blank=True)
    tw = models.ForeignKey(TwitterModel, on_delete=models.CASCADE, null=True, blank=True)
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Comment by {self.user.username}"


class ReactionModel(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    fb_post = models.ForeignKey(FaceBookModel, on_delete=models.CASCADE, related_name='fb_reactions', null=True, blank=True)
    tw_post = models.ForeignKey(TwitterModel, on_delete=models.CASCADE, related_name='tw_reactions', null=True, blank=True)
    reaction = models.CharField(choices=REACTION_CHOICES, max_length=10)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = (
            ('user', 'fb_post'),
            ('user', 'tw_post'),
        )

    def __str__(self):
        return f"{self.user.username} reacted {self.reaction}"
