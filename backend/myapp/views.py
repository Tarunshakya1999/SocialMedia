from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from myapp.serializer import *
from myapp.models import *


# User Registration View
class RegisterationView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': "User Registered Successfully"}, status=status.HTTP_201_CREATED)
        else:
            return Response({'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class UserProfileViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return UserProfile.objects.filter(user=self.request.user)  # 👈 Only own profile

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

  
from rest_framework import viewsets, permissions
from .models import UserProfile


class MyProfileViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return UserProfile.objects.filter(user=self.request.user)

    def perform_update(self, serializer):
        serializer.save(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)



# Facebook Post ViewSet
class FacebookPostViewSet(viewsets.ModelViewSet):
    serializer_class = FaceBookSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Only show Facebook posts of logged-in user
        return FaceBookModel.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


# Twitter Post ViewSet
class TwitterPostViewSet(viewsets.ModelViewSet):
    serializer_class = TwitterSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return TwitterModel.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


# Comment ViewSet (Optional: Allow All Comments or Filtered)

class ReactionViewSet(viewsets.ModelViewSet):
    queryset = ReactionModel.objects.all()
    serializer_class = ReactionSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        user = request.user
        fb_post = request.data.get('fb_post')
        tw_post = request.data.get('tw_post')
        reaction_type = request.data.get('reaction')

        if fb_post:
            existing = ReactionModel.objects.filter(user=user, fb_post_id=fb_post)
            if existing.exists():
                existing.update(reaction=reaction_type)
                return Response({'message': 'Reaction updated'}, status=status.HTTP_200_OK)
            ReactionModel.objects.create(user=user, fb_post_id=fb_post, reaction=reaction_type)
        elif tw_post:
            existing = ReactionModel.objects.filter(user=user, tw_post_id=tw_post)
            if existing.exists():
                existing.update(reaction=reaction_type)
                return Response({'message': 'Reaction updated'}, status=status.HTTP_200_OK)
            ReactionModel.objects.create(user=user, tw_post_id=tw_post, reaction=reaction_type)

        return Response({'message': 'Reaction added'}, status=status.HTTP_201_CREATED)


class CommentViewSet(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        fb_id = self.request.query_params.get("fb")
        tw_id = self.request.query_params.get("tw")

        if fb_id:
            return CommentModel.objects.filter(fb_id=fb_id)
        elif tw_id:
            return CommentModel.objects.filter(tw_id=tw_id)
        return CommentModel.objects.none()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)



