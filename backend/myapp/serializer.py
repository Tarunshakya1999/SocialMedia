from rest_framework import serializers
from myapp.models import *
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = "__all__"
        extra_kwargs = {
            "user": {"required": False},
        }



class FaceBookSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    likes = serializers.SerializerMethodField()
    dislikes = serializers.SerializerMethodField()

    class Meta:
        model = FaceBookModel
        fields = '__all__'

    def get_likes(self, obj):
        return obj.like_count()

    def get_dislikes(self, obj):
        return obj.dislike_count()


class TwitterSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    likes = serializers.SerializerMethodField()
    dislikes = serializers.SerializerMethodField()

    class Meta:
        model = TwitterModel
        fields = '__all__'

    def get_likes(self, obj):
        return obj.like_count()

    def get_dislikes(self, obj):
        return obj.dislike_count()


class CommentSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')  

    class Meta:
        model = CommentModel
        fields = "__all__"



class ReactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReactionModel
        fields = '__all__'


class UserRegisterSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password2']
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError("Passwords do not match")

        if User.objects.filter(username=data['username']).exists():
            raise serializers.ValidationError("Username already exists")

        if User.objects.filter(email=data['email']).exists():
            raise serializers.ValidationError("Email already exists")

        return data

    def create(self, validated_data):
        validated_data.pop('password2')
        return User.objects.create_user(**validated_data)

