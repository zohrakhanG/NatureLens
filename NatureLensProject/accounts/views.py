from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from .models import DiscoverPlants
from .models import HerbalVault
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import AllowAny
from datetime import date
import random
from .models import PlantJournal
from django.utils import timezone
from .models import Reminder
from .models import FunFact
from .models import Post, Like, Comment
from rest_framework.parsers import MultiPartParser, FormParser
from django.http import JsonResponse
from .models import Tutorial

# -----------------------------
# ML IMPORTS
# -----------------------------
import torch
from torchvision import models, transforms
from PIL import Image
import json

# === NEW: UNIVERSAL MODEL ===
import tensorflow as tf
import numpy as np

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

# === NEW: LOAD UNIVERSAL TF MODEL ===
universal_model = tf.keras.models.load_model("models_ml/final_universal_plant_model.keras")

with open("models_ml/class_indices.json", encoding="utf-8") as f:
    class_indices = json.load(f)

idx_to_label = {v: k for k, v in class_indices.items()}

# -----------------------------
# LOAD JSON FILES
# -----------------------------
with open("models_ml/plantnet_species_names.json", encoding="utf-8") as f:
    plantnet_json = json.load(f)

with open("models_ml/plantnet_species.json", encoding="utf-8") as f:
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

# === NEW: UNIVERSAL MODEL IMAGE PREPROCESS FUNCTION ===
def preprocess_tf_image(image_file):
    img = Image.open(image_file).convert("RGB")
    img = img.resize((224,224))
    img_array = np.array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = tf.keras.applications.efficientnet.preprocess_input(img_array)
    return img_array

def clean_name(name):
    return name.replace("_", " ")

def get_wikidata_info(sci_name, source="PlantNet"):
    if source == "Pakistan":
        return pak_wikidata_info.get(sci_name, {})
    return wikidata_info.get(sci_name, {})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def current_user(request):
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

@api_view(['PUT'])
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

    lang = request.GET.get("lang", "en")

    plants = DiscoverPlants.objects.all()

    data = []

    for plant in plants:

        name = (
            plant.plant_name_ur
            if lang == "ur"
            else plant.plant_name
        )

        data.append({
            "id": plant.id,
            "name": name,
            "image_url": plant.photo_url,
        })

    return Response(data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_single_plant(request, plant_id):

    lang = request.GET.get("lang", "en")

    try:

        plant = DiscoverPlants.objects.get(id=plant_id)

        if lang == "ur":

            data = {
                "id": plant.id,
                "name": plant.plant_name_ur,
                "photo_url": plant.photo_url,
                "family": plant.family_ur,
                "origin": plant.origin_ur,
                "height": plant.height_ur,
                "light": plant.light_ur,
                "watering": plant.watering_ur,
                "toxicity": plant.toxicity_ur,
                "uses": plant.uses_ur,
                "interesting_facts": plant.interesting_facts_ur,
            }

        else:

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

        return Response(
            {"error": "Plant not found"},
            status=status.HTTP_404_NOT_FOUND
        )
    


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def daily_featured_herb(request):

    lang = request.GET.get("lang", "en")

    herbs = list(HerbalVault.objects.all())

    if not herbs:
        return Response(
            {"error": "No herbs available"},
            status=404
        )

    today_str = date.today().strftime("%Y-%m-%d")

    random.seed(today_str)

    featured_herb = random.choice(herbs)

    if lang == "ur":

        data = {
            "id": featured_herb.id,
            "name": featured_herb.name_ur,
            "image_url": featured_herb.image_url,
            "about": featured_herb.about_ur,
            "scientific_name": featured_herb.scientific_name_ur,
            "family": featured_herb.family_ur,
            "origin": featured_herb.origin_ur,
            "height": featured_herb.height_ur,
            "type": featured_herb.type_ur,
            "light": featured_herb.light_ur,
            "watering": featured_herb.watering_ur,
            "toxicity": featured_herb.toxicity_ur,
            "usda_zone": featured_herb.usda_zone_ur,
            "key_benefits": featured_herb.key_benefits_ur,
            "usage_data": featured_herb.usage_data_ur,
        }

    else:

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



@api_view(['GET'])
@permission_classes([AllowAny])
def daily_fun_fact(request):

    lang = request.GET.get("lang", "en")

    facts = list(FunFact.objects.all())

    if not facts:
        return Response(
            {"error": "No fun facts available"},
            status=404
        )

    # SAME LOGIC as your herb feature
    today_str = date.today().strftime("%Y-%m-%d")

    random.seed(today_str)

    selected_fact = random.choice(facts)

    return Response({
        "id": selected_fact.id,

        "text": (
            selected_fact.text_ur
            if lang == "ur"
            else selected_fact.text
        )
    })


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

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def herbal_vault_list(request):

    lang = request.GET.get("lang", "en")

    herbs = HerbalVault.objects.all()

    data = []

    for herb in herbs:

        data.append({
            "id": herb.id,
            "name": herb.name_ur if lang == "ur" else herb.name,
            "image_url": herb.image_url,
        })

    return Response(data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def herbal_vault_detail(request, herb_id):

    lang = request.GET.get("lang", "en")

    try:

        herb = HerbalVault.objects.get(id=herb_id)

        if lang == "ur":

            data = {
                "id": herb.id,
                "name": herb.name_ur,
                "image_url": herb.image_url,
                "family": herb.family_ur,
                "origin": herb.origin_ur,
                "scientific_name": herb.scientific_name_ur,
                "height": herb.height_ur,
                "light": herb.light_ur,
                "watering": herb.watering_ur,
                "toxicity": herb.toxicity_ur,
                "type": herb.type_ur,
                "usda_zone": herb.usda_zone_ur,
                "about": herb.about_ur,
                "key_benefits": herb.key_benefits_ur,
                "usage_data": herb.usage_data_ur,
            }

        else:

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

        return Response(
            {"error": "Herb not found"},
            status=404
        )
    

# -----------------------------
# EXISTING PREDICT API
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

    top_predictions = []
    for i in range(5):
        idx = top5_idx[0][i].item()
        conf = top5_prob[0][i].item()
        sci_name = plantnet_classes[idx]
        top_predictions.append({
            "plant": clean_name(sci_name),
            "confidence": conf
        })

    # Add info only for the top prediction
    top_plant_name = top_predictions[0]["plant"].replace(" ", "_")  
    top_info = wikidata_info.get(top_plant_name, {})

    return Response({
        "source": "PlantNet Model",
        "top5_predictions": top_predictions,
        "info": top_info
    })

# -----------------------------
# === NEW: UNIVERSAL MODEL PREDICTION API ===
# -----------------------------
@api_view(['POST'])
@permission_classes([AllowAny])
def predict_universal(request):
    if 'file' not in request.FILES:
        return Response({"error": "No image provided"}, status=400)

    image_file = request.FILES['file']

    img_array = preprocess_tf_image(image_file)

    preds = universal_model.predict(img_array)[0]

    top5_idx = preds.argsort()[-5:][::-1]

    results = []

    for i in top5_idx:
        label = idx_to_label[i]
        confidence = float(preds[i])

        results.append({
            "plant": label.replace("_"," "),
            "confidence": confidence
        })

    return Response({
        "source": "Universal Plant Model",
        "top5_predictions": results
    })

from django.conf import settings

@api_view(['GET'])
def get_posts(request):
    posts = Post.objects.all().order_by('-created_at')
    data = []
    for post in posts:
        likes_count = Like.objects.filter(post=post).count()
        comments = Comment.objects.filter(post=post).order_by('-created_at')

        data.append({
            "id": post.id,
            "title": post.title,
            "content": post.content,
            "images": [
                request.build_absolute_uri(settings.MEDIA_URL + img)
                for img in (post.images or [])
            ],  
            "created_at": post.created_at,
            "likes": likes_count,
            "has_liked": Like.objects.filter(post=post, user=request.user).exists(),
            "comments_count": comments.count(),
            "comments": [
                {
                    "id": c.id,
                    "text": c.text,
                    "created_at": c.created_at,
                    "user": c.user.username
                } for c in comments
            ]
        })
    return Response(data)

from rest_framework.parsers import MultiPartParser, FormParser
from django.core.files.storage import default_storage

@api_view(['POST'])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser])  
def create_post(request):
    images = []
    for i in range(1, 5):
        file = request.FILES.get(f'image_{i}')
        if file:
            # save file to storage
            path = default_storage.save(f"posts/{file.name}", file)
            images.append(path)

    post = Post.objects.create(
        user=request.user,
        title=request.data.get('title'),
        content=request.data.get('content'),
        images=images  
    )
    return Response({"message": "Post created"})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def like_post(request):
    post_id = request.data.get("post_id")
    post = Post.objects.get(id=post_id)

    like, created = Like.objects.get_or_create(
        post=post,
        user=request.user  
    )

    if not created:
        like.delete()

    return Response({"likes": Like.objects.filter(post=post).count()})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_comment(request):

    post = Post.objects.get(id=request.data['post_id'])

    Comment.objects.create(
        user=request.user,
        post=post,
        text=request.data['text']
    )

    comments = Comment.objects.filter(post=post).order_by('-created_at')
    comments_data = [
        {
            "id": c.id,
            "text": c.text,
            "created_at": c.created_at,
            "user": c.user.username
        }
        for c in comments
    ]

    return Response({
        "message": "Comment added",
        "comments": comments_data,
        "count": comments.count()
    })


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def create_reminder(request):

    user = request.user

    # GET
    if request.method == "GET":

        reminders = Reminder.objects.filter(user=user)

        data = []

        for r in reminders:
            data.append({
                "id": r.id,
                "task_name": r.task_name,
                "plants": r.plants,
                "frequency": r.frequency,
                "custom_days": r.custom_days,
                "day_of_week": r.day_of_week,
                "hour": r.hour,
                "minute": r.minute,
            })

        return Response(data)

    # POST
    elif request.method == "POST":

        data = request.data

        reminder = Reminder.objects.create(
            user=user,
            task_name=data["task_name"],
            plants=data["plants"],
            frequency=data["frequency"],
            custom_days=data.get("custom_days", []),
            day_of_week=data.get("day_of_week", []),
            hour=data["hour"],
            minute=data["minute"],
        )

        return Response({
            "message": "Reminder saved",
            "id": reminder.id
        })
    reminders = Reminder.objects.filter(user=request.user)

    data = []
    for r in reminders:
        data.append({
            "id": r.id,
            "task_name": r.task_name,
            "plants": r.plants,
            "frequency": r.frequency,
            "custom_days": r.custom_days,
            "day_of_week": r.day_of_week,
            "hour": r.hour,
            "minute": r.minute,
        })

    return Response(data)


@api_view(["PUT", "DELETE"])
@permission_classes([IsAuthenticated])
def reminder_detail(request, pk):

    try:
        reminder = Reminder.objects.get(
            id=pk,
            user=request.user
        )

    except Reminder.DoesNotExist:
        return Response(
            {"error": "Reminder not found"},
            status=status.HTTP_404_NOT_FOUND
        )

    # UPDATE REMINDER
    if request.method == "PUT":

        data = request.data

        reminder.task_name = data.get(
            "task_name",
            reminder.task_name
        )

        reminder.plants = data.get(
            "plants",
            reminder.plants
        )

        reminder.frequency = data.get(
            "frequency",
            reminder.frequency
        )

        reminder.custom_days = data.get(
            "custom_days",
            reminder.custom_days
        )

        reminder.day_of_week = data.get(
            "day_of_week",
            reminder.day_of_week
        )

        reminder.hour = data.get(
            "hour",
            reminder.hour
        )

        reminder.minute = data.get(
            "minute",
            reminder.minute
        )

        reminder.save()

        return Response({
            "message": "Reminder updated",
            "id": reminder.id
        })

    # DELETE REMINDER
    elif request.method == "DELETE":

        reminder.delete()

        return Response({
            "message": "Reminder deleted"
        })
    



@api_view(['GET'])
@permission_classes([AllowAny])
def tutorials_list(request):

    tutorials = Tutorial.objects.filter(
        is_active=True
    ).values(
        "id",
        "title",
        "video_url"
    )

    return Response(list(tutorials))

