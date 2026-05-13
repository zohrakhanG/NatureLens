from django.db import models
from django.conf import settings
from django.contrib.postgres.fields import ArrayField


class DiscoverPlants(models.Model):

    plant_name = models.CharField(
        max_length=100,
        db_column="name",
        unique=True
    )

    plant_name_ur = models.CharField(
        max_length=100,
        db_column="name_ur",
        blank=True,
        null=True
    )

    photo_url = models.TextField(
        db_column="photo"
    )

    family = models.CharField(
        max_length=100,
        db_column="family",
        blank=True,
        null=True
    )

    family_ur = models.CharField(
        max_length=200,
        db_column="family_ur",
        blank=True,
        null=True
    )

    origin = models.CharField(
        max_length=100,
        db_column="origin",
        blank=True,
        null=True
    )

    origin_ur = models.CharField(
        max_length=150,
        db_column="origin_ur",
        blank=True,
        null=True
    )

    light = models.CharField(
        max_length=50,
        db_column="light",
        blank=True,
        null=True
    )

    light_ur = models.CharField(
        max_length=150,
        db_column="light_ur",
        blank=True,
        null=True
    )

    height = models.CharField(
        max_length=50,
        db_column="height",
        blank=True,
        null=True
    )

    height_ur = models.CharField(
        max_length=100,
        db_column="height_ur",
        blank=True,
        null=True
    )

    watering = models.CharField(
        max_length=50,
        db_column="watering",
        blank=True,
        null=True
    )

    watering_ur = models.CharField(
        max_length=100,
        db_column="watering_ur",
        blank=True,
        null=True
    )

    toxicity = models.CharField(
        max_length=50,
        db_column="toxicity",
        blank=True,
        null=True
    )

    toxicity_ur = models.CharField(
        max_length=200,
        db_column="toxicity_ur",
        blank=True,
        null=True
    )

    uses = models.TextField(
        db_column="uses",
        blank=True,
        null=True
    )

    uses_ur = models.TextField(
        db_column="uses_ur",
        blank=True,
        null=True
    )

    interesting_facts = models.TextField(
        db_column="interesting_facts",
        blank=True,
        null=True
    )

    interesting_facts_ur = models.TextField(
        db_column="interesting_facts_ur",
        blank=True,
        null=True
    )

    class Meta:
        db_table = "discover_plants"

    def __str__(self):
        return self.plant_name


class HerbalVault(models.Model):

    id = models.AutoField(primary_key=True)

    name = models.CharField(max_length=100)

    name_ur = models.CharField(
        max_length=100,
        blank=True,
        null=True
    )

    family = models.CharField(
        max_length=100,
        blank=True,
        null=True
    )

    family_ur = models.CharField(
        max_length=100,
        blank=True,
        null=True
    )

    origin = models.CharField(
        max_length=100,
        blank=True,
        null=True
    )

    origin_ur = models.CharField(
        max_length=100,
        blank=True,
        null=True
    )

    scientific_name = models.CharField(
        max_length=150,
        blank=True,
        null=True
    )

    scientific_name_ur = models.CharField(
        max_length=150,
        blank=True,
        null=True
    )

    height = models.CharField(
        max_length=50,
        blank=True,
        null=True
    )

    height_ur = models.CharField(
        max_length=50,
        blank=True,
        null=True
    )

    light = models.CharField(
        max_length=50,
        blank=True,
        null=True
    )

    light_ur = models.CharField(
        max_length=50,
        blank=True,
        null=True
    )

    watering = models.CharField(
        max_length=50,
        blank=True,
        null=True
    )

    watering_ur = models.CharField(
        max_length=50,
        blank=True,
        null=True
    )

    toxicity = models.CharField(
        max_length=50,
        blank=True,
        null=True
    )

    toxicity_ur = models.CharField(
        max_length=50,
        blank=True,
        null=True
    )

    type = models.CharField(
        max_length=50,
        blank=True,
        null=True
    )

    type_ur = models.CharField(
        max_length=50,
        blank=True,
        null=True
    )

    usda_zone = models.CharField(
        max_length=50,
        blank=True,
        null=True
    )

    usda_zone_ur = models.CharField(
        max_length=50,
        blank=True,
        null=True
    )

    about = models.TextField(
        blank=True,
        null=True
    )

    about_ur = models.TextField(
        blank=True,
        null=True
    )

    key_benefits = models.JSONField(
        default=list,
        blank=True
    )

    key_benefits_ur = models.JSONField(
        default=list,
        blank=True
    )

    usage_data = models.JSONField(
        default=list,
        blank=True
    )

    usage_data_ur = models.JSONField(
        default=list,
        blank=True
    )

    image_url = models.URLField(
        max_length=300,
        blank=True,
        null=True
    )

    class Meta:
        db_table = "herbal_vault"

    def __str__(self):
        return self.name

    


class PlantJournal(models.Model):

    user = models.ForeignKey(
    settings.AUTH_USER_MODEL,
    on_delete=models.CASCADE,
    related_name="plant_journals"
    )

    plant_name = models.CharField(max_length=100)
    notes = models.JSONField(default=list, blank=True)
    images = models.JSONField(default=list, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "plant_journal"

    def __str__(self):
        return f"{self.plant_name} - {self.user.username}"
    




class FunFact(models.Model):

    text = models.TextField()

    text_ur = models.TextField(
        blank=True,
        null=True
    )

    class Meta:
        db_table = "fun_fact"




class Post(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="posts"
    )
    title = models.CharField(max_length=255)
    content = models.TextField(blank=True, null=True)
    images = ArrayField(
        models.CharField(max_length=255),
        size=4,
        default=list,
        blank=True
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "posts"

    def __str__(self):
        return self.title




class Like(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    post = models.ForeignKey('Post', on_delete=models.CASCADE)

    class Meta:
        db_table = "likes"
        unique_together = ('user', 'post')



class Comment(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    post = models.ForeignKey('Post', on_delete=models.CASCADE)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "comments"


class Reminder(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    task_name = models.CharField(max_length=255)

    plants = models.JSONField()

    frequency = models.CharField(max_length=20)

    custom_days = models.JSONField(default=list, blank=True)

    day_of_week = models.JSONField(default=list, blank=True)

    hour = models.IntegerField()

    minute = models.IntegerField()

    is_completed = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "reminders"
        managed = False


class Tutorial(models.Model):

    title = models.CharField(
        max_length=255
    )

    video_url = models.URLField()

    is_active = models.BooleanField(
        default=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    class Meta:
        db_table = "tutorials"

    def __str__(self):
        return self.title
    
