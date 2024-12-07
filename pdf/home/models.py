from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser

# Create your models here.
class AppUserManager(BaseUserManager):
    def create_user(self,email,password=None,**extra_fields):
        if not email:
            raise ValueError('Email is required')
        if not password:
            raise ValueError('Password is required')
        extra_fields.setdefault('is_active',True)
        user=self.model(email=email,**extra_fields)
        user.set_password(password)
        user.save()
        return user
    def create_superuser(self,email,password=None,**extra_fields):
        extra_fields.setdefault('is_staff',True)
        extra_fields.setdefault('is_superuser',True)
        
        return self.create_user(email,password,**extra_fields)
class AppUser(AbstractBaseUser):
    name=models.CharField(max_length=50)
    email=models.EmailField(unique=True)
    password=models.CharField(max_length=20)
    is_staff=models.BooleanField(default=False)
    is_active=models.BooleanField(default=False)
    is_superuser=models.BooleanField(default=False)

    USERNAME_FIELD='email'
    REQUIRED_FIELDS=['name','password']

    objects = AppUserManager()

    def __str__(self):
        return self.name

    def has_module_perms(self, app_label):
        return True

    def has_perm(self, perm, obj=None):
        return True

class PDF(models.Model):
    user=models.ForeignKey(AppUser,on_delete=models.CASCADE,related_name='related_user')
    pdf_name=models.CharField(max_length=50)
    pdf=models.FileField(upload_to='pdfs/')
    added=models.DateField(auto_now_add=True)

    def __str__(self):
        return self.pdf_name

class PDFNotes(models.Model):
    pdf=models.ForeignKey(PDF,on_delete=models.CASCADE,related_name='pdf_notes')
    notes=models.TextField()
    timing=models.DateTimeField(auto_now_add=True)

