# Django Bootstrap Typeahead

## Convert Django model choice fields into typeahead fields.

Typeahead inputs built on top of [Django](https://www.djangoproject.com/) and [Bootstrap](http://getbootstrap.com/).

![Example](http://thegoods.aj7may.com/content/images/2014/Feb/Screen_Shot_2014_02_05_at_5_27_56_PM.png)

### Install:
`> pip install django-bootstrap-typeahead`

### Usage:

* Add `django_bootstrap_typeahead` to the installed apps of your Django Project
* create a form and use `TypeaheadField` instead of `ModelChoiceField`
  or `MultipleTypeaheadField` instead of `ModelMultipleChoiceField`
* Be sure to include the form's required media in the template. _ie._ `{{ form.media }}`
* Also be sure to include [Twitter Bootstrap](http://getbootstrap.com/)

### Example:

_forms.py_

    from django import forms
    from django_bootstrap_typeahead.fields import *
    from .models import Thing


    def build_thing(value):
        thing, created = Thing.objects.get_or_create(name=value)
        return thing


    class TestForm(forms.Form):
        typeahead = TypeaheadField(
            queryset=Thing.objects.all(),
            builder=build_thing
        )
        multi_typeahead = MultipleTypeaheadField(
            queryset=Thing.objects.all(),
            builder=build_thing
        )
