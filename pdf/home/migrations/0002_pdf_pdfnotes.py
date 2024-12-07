# Generated by Django 5.1.4 on 2024-12-07 06:12

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='PDF',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('pdf_name', models.CharField(max_length=50)),
                ('pdf', models.FileField(upload_to='pdfs/')),
                ('added', models.DateField(auto_now_add=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='related_user', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='PDFNotes',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('notes', models.TextField()),
                ('timing', models.DateTimeField(auto_now_add=True)),
                ('pdf', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='pdf_notes', to='home.pdf')),
            ],
        ),
    ]