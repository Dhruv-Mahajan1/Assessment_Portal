from import_export import resources
from .models import studentResponse
from .models import peerResponse

class studentResponseResource(resources.ModelResource):
    class Meta:
        model = studentResponse


class peerResponseResource(resources.ModelResource):
    class Meta:
        model = peerResponse