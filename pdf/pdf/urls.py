"""
URL configuration for pdf project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView
from django.conf import settings
from django.conf.urls.static import static
from home.views import UserView,PDFView,delete_pdf,chat_with_gpt,create_notes,PDFNoteView,delete_note

urlpatterns = [
    path('admin/', admin.site.urls),
    path('padf/',include('rest_framework.urls')),
    path('pdf/token/',TokenObtainPairView.as_view(),name='access'),
    path('pdf/refresh_token/',TokenRefreshView.as_view(),name='refresh'),
    path('pdf/user/',UserView.as_view(),name='users'),
    path('pdf/pdfs/',PDFView.as_view(),name='pdfs'),
    path('pdf/<int:pdf_id>/notes/',create_notes,name='pdf_notes'),
    path('pdf/<int:pdf_id>/note/',PDFNoteView.as_view(),name='notes_access'),
    path('pdf/<int:pdf_id>/delete/',delete_pdf,name='delete_pdf'),
    path('pdf/chatgpt/', chat_with_gpt, name='chat_withgpt'),
    path('pdf/<int:note_id>/pdfnote/',delete_note,name='note_delete')



]
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
