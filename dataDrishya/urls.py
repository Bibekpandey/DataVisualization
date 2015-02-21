from django.conf.urls import patterns, include, url
from dataDrishya.views import * 

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'DataVisuaization.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^$', Index.as_view(), name='index'),
)
