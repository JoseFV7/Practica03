from rest_framework import serializers
from .models import Prestamos

class PrestamosSerilizer(serializers.ModelSerializer):
    class Meta:
        model = Prestamos
        fields = '__all__'