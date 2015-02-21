from django.shortcuts import render
from django.shortcuts import render, HttpResponse
from django.views.generic import View
from dataDrishya.models import *

# Create your views here.

class Index(View):
    def get(self, request):
        return render(request, 'dataDrishya/index.html', {})

