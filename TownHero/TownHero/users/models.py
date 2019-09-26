from django.db import models
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.core.mail import send_mail
import uuid as uuid_lib
from django.contrib.auth.base_user import BaseUserManager
# Create your models here.

class UserManager(BaseUserManager):
    def _create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError('The given email must be set')
        email = self.normalize_email(email)
  
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
  
    def create_user(self, email, password=None, **extra_fields):
        #extra_fields.setdefault('is_staff', False)
        #extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)
  
    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
  
        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')
  
        return self._create_user(email, password, **extra_fields)
  
class User(AbstractBaseUser,PermissionsMixin):

    username = models.CharField(
        _('username'),
        max_length=150,
        unique=True,
        help_text=_(
            'Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.'),
        error_messages={
            'unique': _("A user with that username already exists."),
        },
    )
    full_name = models.CharField(_('氏名'), max_length=150, blank=True)
    email = models.EmailField(_('email address'), blank=True)

    is_active = models.BooleanField(
        _('active'),
        default=True,
        help_text=_(
            'Designates whether this user should be treated as active. '
            'Unselect this instead of deleting accounts.'
        ),
    )
    date_joined = models.DateTimeField(_('date joined'), default=timezone.now)

    objects = UserManager()

    EMAIL_FIELD = 'email'
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email', ]

    class Meta:
        verbose_name = _('user')
        verbose_name_plural = _('users')

    def clean(self):
        super().clean()
        self.email = self.__class__.objects.normalize_email(self.email)

    def email_user(self, subject, message, from_email=None, **kwargs):
        """Send an email to this user."""
        send_mail(subject, message, from_email, [self.email], **kwargs)

class Post(models.Model):
    POST_TYPE = (
        ()
    )
    latitude = models.DecimalField(u'緯度',max_digits=9,decimal_places=6,default=0)
    longitude = models.DecimalField(u'経度',max_digits=9,decimal_places=6,default=0)
    
    text = models.CharField(
        verbose_name='投稿',
        blank=True,
        null=True,
        max_length=50,
        default='',
    )
    photograph = models.ImageField(
        upload_to='uploads/%Y/%m/%d/',
        verbose_name='添付ファイル',
    )
    
    user = models.ForeignKey(User,verbose_name='ユーザー',on_delete=models.CASCADE)

