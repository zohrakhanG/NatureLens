from django.db import models
import uuid
from django.contrib.auth.hashers import make_password, check_password


class DiscoverPlants(models.Model):
    plant_name = models.CharField(max_length=100, db_column="name", unique=True)
    photo_url = models.TextField(db_column="photo")
    family = models.CharField(max_length=100, db_column="family", blank=True, null=True)
    origin = models.CharField(max_length=100, db_column="origin", blank=True, null=True)
    light = models.CharField(max_length=50, db_column="light", blank=True, null=True)
    height = models.CharField(max_length=50, db_column="height", blank=True, null=True)
    watering = models.CharField(max_length=50, db_column="watering", blank=True, null=True)
    toxicity = models.CharField(max_length=50, db_column="toxicity", blank=True, null=True)
    uses = models.TextField(db_column="uses", blank=True, null=True) 
    interesting_facts = models.TextField(db_column="interesting_facts", blank=True, null=True)

    class Meta:
        db_table = "discover_plants"

    def __str__(self):
        return self.plant_name


class User(models.Model):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=50, unique=True)
    password = models.CharField(max_length=255)  # hashed password
    token = models.CharField(max_length=255, unique=True, default=uuid.uuid4)
    created_at = models.DateTimeField(auto_now_add=True)

    def set_password(self, raw_password):
        """Hashes the password and saves it"""
        self.password = make_password(raw_password)
        self.save()

    def check_password(self, raw_password):
        """Verify raw password against hashed password"""
        return check_password(raw_password, self.password)

    class Meta:
        db_table = "users"

    def __str__(self):
        return self.username
    





class HerbalVault(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    family = models.CharField(max_length=100, blank=True, null=True)
    origin = models.CharField(max_length=100, blank=True, null=True)
    scientific_name = models.CharField(max_length=150, blank=True, null=True)
    height = models.CharField(max_length=50, blank=True, null=True)
    light = models.CharField(max_length=50, blank=True, null=True)
    watering = models.CharField(max_length=50, blank=True, null=True)
    toxicity = models.CharField(max_length=50, blank=True, null=True)
    type = models.CharField(max_length=50, blank=True, null=True)
    usda_zone = models.CharField(max_length=50, blank=True, null=True)
    about = models.TextField(blank=True, null=True)  # New description field
    key_benefits = models.JSONField(default=list, blank=True)
    usage_data = models.JSONField(default=list, blank=True)
    image_url = models.URLField(max_length=300, blank=True, null=True)
    
    class Meta:
            db_table = "herbal_vault"

    def __str__(self):
        return self.name