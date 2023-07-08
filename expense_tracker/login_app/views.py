from django.shortcuts import render
# login_app/views.py
from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm
from django.urls import reverse_lazy
from django.views import generic
from django.http import HttpResponse
import datetime 
import csv

class SignUpView(generic.CreateView):
    form_class = UserCreationForm
    success_url = reverse_lazy("login")
    template_name = "registration/signup.html"
    
def login(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']

        # Simulate authentication by checking if the entered credentials are valid
        if username == 'your-username' and password == 'your-password':
            # Set user as logged in (store session or use authentication mechanism)
            request.session['logged_in'] = True

            # Redirect to the expense tracker page or perform necessary actions
            return redirect('/expense-tracker/')
        else:
            # Redirect back to the login page with an error message
            return redirect('/login/?error=Invalid credentials')

    return render(request, 'login.html')

def logout(request):
    # Add your logic here for handling the base page request
    # For example, you can redirect to the login page or render a different template
    return redirect('login')