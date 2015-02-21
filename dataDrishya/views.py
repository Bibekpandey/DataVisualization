from django.shortcuts import render
from django.shortcuts import render, HttpResponse
from django.views.generic import View
from dataDrishya.models import *
import json

# Create your views here.

class Index(View):
    def get(self, request):
        s = {}
        return render(request, 'dataDrishya/index.html', {'jsondata':s})

