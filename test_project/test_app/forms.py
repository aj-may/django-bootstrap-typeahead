from django import forms
from django_bootstrap_typeahead.fields import *
from .models import Thing


def build_thing(value):
    thing, created = Thing.objects.get_or_create(name=value)
    return thing


class TestForm(forms.Form):
    typeahead = TypeaheadField(
        queryset=Thing.objects.all(),
        builder=build_thing,
        required=False
    )
    multi_typeahead = MultipleTypeaheadField(
        queryset=Thing.objects.all(),
        builder=build_thing,
        required=False
    )
