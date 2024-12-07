from rest_framework import serializers
from .models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=AppUser
        fields=['id','name','email','password']
    def create(self, validated_data):
        user=AppUser.objects.create_user(**validated_data)
        return user
class PDFSerializer(serializers.ModelSerializer):
    class Meta:
        model=PDF
        fields=['id','pdf_name','pdf','added']
        read_only_fields=['user','added']

    

class PDFNoteSerializer(serializers.ModelSerializer):
    class Meta:
        model=PDFNotes
        fields=['id','pdf','notes','timing']
        read_only_fields=['pdf','timing']