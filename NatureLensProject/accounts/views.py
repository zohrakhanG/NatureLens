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
from .models import PlantJournal
from django.utils import timezone
# -----------------------------
# ML IMPORTS
# -----------------------------
import torch
from torchvision import models, transforms
from PIL import Image
import json

# -----------------------------
# DEVICE
# -----------------------------
device = "cuda" if torch.cuda.is_available() else "cpu"

# -----------------------------
# LOAD ML MODELS
# -----------------------------
# Pakistan Model
pak_checkpoint = torch.load("models_ml/pakistan_model.pth", map_location=device)
pak_classes = pak_checkpoint["class_names"]

pak_model = models.efficientnet_b0(weights=None)
pak_model.classifier[1] = torch.nn.Linear(
    pak_model.classifier[1].in_features,
    len(pak_classes)
)
pak_model.load_state_dict(pak_checkpoint["model_state_dict"])
pak_model.to(device)
pak_model.eval()

# PlantNet Model
plantnet_checkpoint = torch.load("models_ml/plantnet_model.pth", map_location=device)

plantnet_model = models.efficientnet_b0(weights=None)
plantnet_model.classifier[1] = torch.nn.Linear(
    plantnet_model.classifier[1].in_features,
    len(plantnet_checkpoint["class_names"])
)
plantnet_model.load_state_dict(plantnet_checkpoint["model_state_dict"])
plantnet_model.to(device)
plantnet_model.eval()

# -----------------------------
# LOAD JSON FILES
# -----------------------------
with open("models_ml/plantnet_species.json", encoding="utf-8") as f:
    plantnet_json = json.load(f)

with open("models_ml/plant_info.json", encoding="utf-8") as f:
    wikidata_info = json.load(f)

with open("models_ml/pakistan_plant_info.json", encoding="utf-8") as f:
    pak_wikidata_info = json.load(f)

sorted_keys = sorted(plantnet_json.keys())
plantnet_classes = [plantnet_json[k] for k in sorted_keys]

# -----------------------------
# IMAGE TRANSFORM
# -----------------------------
transform = transforms.Compose([
    transforms.Resize(256),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
    transforms.Normalize([0.485,0.456,0.406], [0.229,0.224,0.225])
])

def clean_name(name):
    return name.replace("_", " ")

def get_wikidata_info(sci_name, source="PlantNet"):
    if source == "Pakistan":
        return pak_wikidata_info.get(sci_name, {})
    return wikidata_info.get(sci_name, {})





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
@permission_classes([AllowAny])
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




@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_account(request):
    user = request.user
    user.delete()
    return Response({"message": "Account deleted successfully"})





@api_view(['PUT'])  # PUT is fine
@permission_classes([IsAuthenticated])
def update_user(request):
    user = request.user

    username = request.data.get("username")
    email = request.data.get("email")
    password = request.data.get("password")

    if username:
        user.username = username
    if email:
        user.email = email
    if password:
        user.set_password(password)
    user.save()

    return Response({
        "message": "User updated successfully",
        "username": user.username,
        "email": user.email
    })






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







@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_plant_journal(request):

    plant_name = request.data.get("plant_name")
    notes = request.data.get("notes", [])
    images = request.data.get("images", [])

    if not plant_name or not plant_name.strip():
        return Response(
            {"error": "Plant name is required"},
            status=400
        )

    if not isinstance(notes, list):
        notes = []

    if not isinstance(images, list):
        images = []

    # ❌ REMOVE default image logic completely
    # No images will simply stay empty list []

    journal = PlantJournal.objects.create(
        user=request.user,
        plant_name=plant_name.strip(),
        notes=notes,
        images=images
    )

    return Response(
        {
            "message": "Journal created successfully",
            "id": journal.id
        },
        status=201
    )






@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_journals(request):

    journals = PlantJournal.objects.filter(
        user=request.user
    ).order_by("-created_at")

    data = []

    for journal in journals:
        data.append({
            "id": journal.id,
            "plant_name": journal.plant_name,
            "notes": journal.notes,
            "images": journal.images,
            "created_at": journal.created_at,
        })

    return Response(data)








# -----------------------------
# NEW: ML PREDICTION API
# -----------------------------
@api_view(['POST'])
@permission_classes([AllowAny])
def predict(request):
    if 'file' not in request.FILES:
        return Response({"error":"No image provided"}, status=400)

    image_file = request.FILES['file']
    image = Image.open(image_file).convert("RGB")
    image = transform(image).unsqueeze(0).to(device)

    # Pakistan model
    with torch.no_grad():
        pak_output = pak_model(image)
        pak_probs = torch.softmax(pak_output, dim=1)
        pak_conf, pak_idx = torch.max(pak_probs, dim=1)

    pak_conf = pak_conf.item()
    pak_idx = pak_idx.item()

    if pak_conf >= 0.7:
        sci_name = pak_classes[pak_idx]
        info = get_wikidata_info(sci_name, "Pakistan")
        return Response({
            "source":"Pakistan Model",
            "prediction": clean_name(sci_name),
            "confidence": pak_conf,
            "info": info
        })

    # fallback PlantNet
    with torch.no_grad():
        plantnet_output = plantnet_model(image)
        plantnet_probs = torch.softmax(plantnet_output, dim=1)
        top5_prob, top5_idx = torch.topk(plantnet_probs, 5)

    results = []
    for i in range(5):
        idx = top5_idx[0][i].item()
        conf = top5_prob[0][i].item()
        sci_name = plantnet_classes[idx]
        results.append({
            "plant": clean_name(sci_name),
            "confidence": conf,
            "info": get_wikidata_info(sci_name)
        })

    return Response({
        "source":"PlantNet Model",
        "top5_predictions": results
    })
