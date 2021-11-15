from django.db import models
from django.db.models.base import Model

# Create your models here.

class Prestamos(models.Model):
    biblioteca = models.CharField(max_length=100)
    libro = models.CharField(max_length=100)
    lector = models.CharField(max_length=60)
    fecha_prestamo = models.DateField(auto_now=False)
    fecha_devolucion = models.DateField(auto_now=False)

    def __str__(self):
        return self.libro