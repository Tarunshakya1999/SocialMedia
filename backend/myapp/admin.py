from django.contrib import admin
from myapp.models import *

# Register your models here.
admin.site.register(UserProfile)
admin.site.register(FaceBookModel)
admin.site.register(TwitterModel)
admin.site.register(CommentModel)
admin.site.register(ReactionModel)
