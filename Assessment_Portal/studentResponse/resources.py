from import_export import resources
from .models import studentResponse

class studentResponseResource(resources.ModelResource):
    class Meta:
        model = studentResponse