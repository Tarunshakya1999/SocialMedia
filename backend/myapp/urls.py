from django.urls import path ,include
from rest_framework.routers import DefaultRouter
from myapp.views import *
router = DefaultRouter()

router.register(r'users', UserProfileViewSet, basename='userprofile')
router.register(r'facebook', FacebookPostViewSet, basename='facebook')
router.register(r'twitter', TwitterPostViewSet, basename='twitter')
router.register(r'comments', CommentViewSet, basename='comment')
router.register(r'reactions', ReactionViewSet, basename='reactions')
router.register(r'my-profile', MyProfileViewSet, basename='my-profile')



urlpatterns = [
    path('',include(router.urls)),
     
]
