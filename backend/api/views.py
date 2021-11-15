from http.client import responses
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Prestamos
from .serializers import PrestamosSerilizer
# Create your views here.

@api_view(['GET'])
def index(request):
    return Response({'mensaje': 'Api rest de prestamos'})

@api_view(['GET', 'POST'])
def prestamos(request):
    if request.method == 'GET':
        lista_prestamos = Prestamos.objects.all()
        serPres = PrestamosSerilizer(lista_prestamos, many=True)
        return Response(serPres.data)
    elif request.method == 'POST':
        serPres = PrestamosSerilizer(data=request.data)
        if serPres.is_valid():
            serPres.save()
            return Response(serPres.data)
        else:
            return Response(serPres.errors)

@api_view(['GET','PUT','DELETE'])
def prestamoDetalle(request, prestamo_id):
    objPrestamo = Prestamos.objects.get(id=prestamo_id)

    if request.method == 'GET':
        serPres = PrestamosSerilizer(objPrestamo)
        return Response(serPres.data)
    elif request.method == 'PUT':
        serPres = PrestamosSerilizer(objPrestamo, data=request.data)
        if serPres.is_valid():
            serPres.save()
            return Response(serPres.data)
        else:
            return Response(serPres.errors)
    elif request.method == 'DELETE':
        objPrestamo.delete()
        return Response(status=204)
