from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from .models import DiscoverPlants
from .models import HerbalVault
from rest_framework.decorators import permission_classes
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import AllowAny
from datetime import date
import random


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def current_user(request):
    """
    Returns the current authenticated user's username and email
    """
    user = request.user
    data = {
        "id": user.id,
        "username": user.username, 
        "email": user.email,
    }
    return Response(data)




@api_view(['POST'])
@permission_classes([AllowAny])  # <-- This makes signup open
def signup(request):
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')

    if not username or not email or not password:
        return Response({"error": "All fields are required"}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=username).exists():
        return Response({"error": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=username, email=email, password=password)
    
    # Create token for the user
    from rest_framework.authtoken.models import Token
    token = Token.objects.create(user=user)

    return Response({
        "message": "User created successfully",
        "username": user.username,
        "email": user.email,
        "token": token.key
    }, status=status.HTTP_201_CREATED)





@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response({"error": "Username and password are required"}, status=400)

    user = authenticate(username=username, password=password)
    if user is None:
        return Response({"error": "Invalid credentials"}, status=401)

    token, _ = Token.objects.get_or_create(user=user)

    return Response({
        "message": "Login successful",
        "username": user.username,
        "email": user.email,
        "token": token.key
    }, status=200)







@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_discover_plants(request):
    plants = DiscoverPlants.objects.all()

    data = [
        {
            "id": plant.id,
            "name": plant.plant_name,
            "image_url": plant.photo_url
        }
        for plant in plants
    ]

    return Response(data)
    


@api_view(['GET'])
@permission_classes([IsAuthenticated])  # <-- only authenticated users can access
def get_single_plant(request, plant_id):
    try:
        plant = DiscoverPlants.objects.get(id=plant_id)
        data = {
            "id": plant.id,
            "name": plant.plant_name,
            "photo_url": plant.photo_url,
            "family": plant.family,
            "origin": plant.origin,
            "height": plant.height,
            "light": plant.light,
            "watering": plant.watering,
            "toxicity": plant.toxicity,
            "uses": plant.uses,
            "interesting_facts": plant.interesting_facts,
        }
        return Response(data)
    except DiscoverPlants.DoesNotExist:
        return Response({"error": "Plant not found"}, status=status.HTTP_404_NOT_FOUND)





# -------------------------------
# List all herbs
# -------------------------------
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def herbal_vault_list(request):
    herbs = HerbalVault.objects.all()
    data = []
    for herb in herbs:
        data.append({
            "id": herb.id,
            "name": herb.name,
            "image_url": herb.image_url,
        })
    return Response(data)


# Get single herb details
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def herbal_vault_detail(request, herb_id):
    try:
        herb = HerbalVault.objects.get(id=herb_id)
        data = {
            "id": herb.id,
            "name": herb.name,
            "image_url": herb.image_url,
            "family": herb.family,
            "origin": herb.origin,
            "scientific_name": herb.scientific_name,
            "height": herb.height,
            "light": herb.light,
            "watering": herb.watering,
            "toxicity": herb.toxicity,
            "type": herb.type,
            "usda_zone": herb.usda_zone,
            "about": herb.about,
            "key_benefits": herb.key_benefits,
            "usage_data": herb.usage_data,
        }
        return Response(data)
    except HerbalVault.DoesNotExist:
        return Response({"error": "Herb not found"}, status=404)
    




@api_view(['GET'])
@permission_classes([IsAuthenticated])
def daily_featured_herb(request):
    """
    Return one herb dynamically as "Herb of the Day".
    Automatically changes daily without storing a flag.
    """
    herbs = list(HerbalVault.objects.all())
    if not herbs:
        return Response({"error": "No herbs available"}, status=404)

    # Seed random generator with today's date
    today_str = date.today().strftime("%Y-%m-%d")
    random.seed(today_str)  # same herb for everyone today
    featured_herb = random.choice(herbs)

    data = {
        "id": featured_herb.id,
        "name": featured_herb.name,
        "image_url": featured_herb.image_url,
        "about": featured_herb.about,
        "scientific_name": featured_herb.scientific_name,
        "family": featured_herb.family,
        "origin": featured_herb.origin,
        "height": featured_herb.height,
        "type": featured_herb.type,
        "light": featured_herb.light,
        "watering": featured_herb.watering,
        "toxicity": featured_herb.toxicity,
        "usda_zone": featured_herb.usda_zone,
        "key_benefits": featured_herb.key_benefits,
        "usage_data": featured_herb.usage_data,
    }
    return Response(data)