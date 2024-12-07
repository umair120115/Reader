import openai
from django.conf import settings
import json
from django.http import JsonResponse
from django.shortcuts import render
from rest_framework.response import Response
from .serializers import *
from .models import *
from rest_framework import generics
from rest_framework.permissions import IsAdminUser,IsAuthenticated,AllowAny
from rest_framework.parsers import MultiPartParser,FormParser
from rest_framework.decorators import api_view,permission_classes
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404

# Create your views here.

class UserView(generics.ListCreateAPIView):
    queryset=AppUser.objects.all()
    permission_classes=[AllowAny]
    parser_classes=[MultiPartParser,FormParser]
    serializer_class=UserSerializer


class PDFView(generics.ListCreateAPIView):
    queryset=PDF.objects.all()
    permission_classes=[IsAuthenticated]
    serializer_class=PDFSerializer
    parser_classes=[MultiPartParser,FormParser]
    def perform_create(self, serializer):
        
        if serializer.is_valid():
            serializer.save(user=self.request.user)


@csrf_exempt
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_note(request,note_id):
    if request.method=='DELETE':
        note=get_object_or_404(PDFNotes,id=note_id)
        note.delete()
        return JsonResponse({'status':'Note Deleted'})
    else:
        return JsonResponse({'error':'Not found'})







@csrf_exempt
@api_view(['DELETE'])
def delete_pdf(request,pdf_id):
    pdf=get_object_or_404(PDF, id=pdf_id)
    if request.user==pdf.user:
        pdf.delete()
        return Response({'status':'PDF Deleted'})
    else:
        return Response({'error':'Not found'})


class PDFNoteView(generics.ListAPIView):
    # queryset=PDFNotes.objects.all()
    serializer_class=PDFNoteSerializer
    # parser_classes=[MultiPartParser,FormParser]
    permission_classes=[IsAuthenticated]
    def get_queryset(self):
        # Retrieve `pdf_id` from the URL kwargs
        pdf_id = self.kwargs.get('pdf_id')
        pdf = get_object_or_404(PDF, id=pdf_id)
        # Filter notes related to the specific PDF
        return PDFNotes.objects.filter(pdf=pdf)
        



# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def get_notes(request, pdf_id):
#     if request.method == 'GET':
#         pdf = get_object_or_404(PDF, id=pdf_id)
#         notes = PDFNotes.objects.filter(pdf=pdf)
#         serializer = PDFNoteSerializer(notes, many=True)
#         return Response(serializer.data) 
    
@csrf_exempt
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_notes(request,pdf_id):
    if request.method=='POST':

        pdf=get_object_or_404(PDF, id=pdf_id)
        data=json.loads(request.body)
        notes=data.get('notes','')
        PDFNotes.objects.create(pdf=pdf,notes=notes)
        return JsonResponse({'status':'Notes saved successfully'})
    else:
        return JsonResponse({'status':'Something went wrong during notes creation'})

openai.api_key=settings.OPENAI_API_KEY
print(settings.OPENAI_API_KEY)
@csrf_exempt
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def chat_with_gpt(request):
    try:
        data=json.loads(request.body)
        user_message=data.get('message','')

        response=openai.completions.create(
            model="gpt-3.5-turbo",
            prompt=user_message,
            max_tokens=100,
            )

            # Return the response to React
        return JsonResponse({"response": response.choices[0].message["content"]})
    except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    
