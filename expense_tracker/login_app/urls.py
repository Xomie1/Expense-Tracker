from django.urls import path

from .views import SignUpView
from login_app import views
# from login_app.views import export_csv


urlpatterns = [
    path("signup/", SignUpView.as_view(), name="signup"),
    path('', views.logout, name='base_page'),
    # path('export-csv/', export_csv, name='export-csv'),
]